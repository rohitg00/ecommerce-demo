import type { UserConfig } from './user-config.js';
import { User, UserSession, UserSlot } from './user-model.js';
import { SymphonyPlatformAspect, SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';
import crypto from 'crypto';

export class UserNode {
  private sessions: Map<string, UserSession> = new Map();

  constructor(
    private config: UserConfig,
    private userSlot: UserSlot,
  ) {}
  
  /**
   * Register a user
   */
  registerUser(user: User) {
    if (!this.config.enableRegistration) {
      throw new Error('User registration is disabled');
    }
    
    // Check if user with the same email already exists
    const existingUser = this.getUserByEmail(user.email);
    if (existingUser) {
      throw new Error(`User with email ${user.email} already exists`);
    }
    
    this.userSlot.register([user]);
    return this;
  }

  /**
   * List all users
   */
  listUsers() {
    return this.userSlot.flatValues();
  }
  
  /**
   * Get user by ID
   */
  getUserById(id: string) {
    const allUsers = this.listUsers();
    return allUsers.find(user => user.id === id);
  }
  
  /**
   * Get user by email
   */
  getUserByEmail(email: string) {
    const allUsers = this.listUsers();
    return allUsers.find(user => user.email === email);
  }
  
  /**
   * Create a new session for a user
   */
  createSession(userId: string) {
    const user = this.getUserById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    // Update last login time
    user.lastLoginAt = new Date();
    
    // Create session
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + (this.config.sessionTimeoutMinutes || 60));
    
    const session: UserSession = {
      userId,
      token,
      expiresAt
    };
    
    this.sessions.set(token, session);
    return session;
  }
  
  /**
   * Validate a session token
   */
  validateSession(token: string) {
    const session = this.sessions.get(token);
    if (!session) return null;
    
    // Check if session is expired
    if (new Date() > session.expiresAt) {
      this.sessions.delete(token);
      return null;
    }
    
    return this.getUserById(session.userId);
  }
  
  /**
   * Remove a session (logout)
   */
  removeSession(token: string) {
    this.sessions.delete(token);
  }

  static dependencies = [ SymphonyPlatformAspect ];

  static defaultConfig: UserConfig = {
    enableRegistration: true,
    sessionTimeoutMinutes: 60
  };

  static async provider(
    [ symphonyPlatform ]: [ SymphonyPlatformNode ],
    config: UserConfig,
    [userSlot]: [UserSlot]
  ) {
    const userManager = new UserNode(config, userSlot);
    
    // Register sample users for demonstration
    try {
      userManager.registerUser({
        id: 'user-1',
        email: 'john.doe@example.com',
        name: 'John Doe',
        createdAt: new Date(),
        addresses: [
          {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            postalCode: '12345',
            country: 'USA'
          }
        ],
        preferredCurrency: 'USD'
      });
    } catch (error) {
      // User might already exist
    }

    return userManager;
  }
}

export default UserNode; 