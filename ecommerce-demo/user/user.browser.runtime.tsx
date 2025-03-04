import React, { useState } from 'react';
import type { UserConfig } from './user-config.js';
import { User, Address, UserSlot } from './user-model.js';
import { SymphonyPlatformAspect, SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { PiedPlatformAspect, PiedPlatformBrowser } from '@pied/pied-piper.pied-platform';

// Login form component
const LoginForm = ({ onLogin }: { onLogin: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };
  
  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Log In</button>
      </form>
      <p className="register-link">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

// Registration form component
const RegistrationForm = ({ onRegister }: { onRegister: (user: Partial<User>, password: string) => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const newUser: Partial<User> = {
      name,
      email,
      createdAt: new Date()
    };
    
    onRegister(newUser, password);
  };
  
  return (
    <div className="registration-form-container">
      <h2>Create an Account</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
      <p className="login-link">
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
};

// User profile component
const UserProfile = ({ user, onUpdate }: { user: User, onUpdate: (user: User) => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, name };
    onUpdate(updatedUser);
    setIsEditing(false);
  };
  
  return (
    <div className="user-profile">
      <h2>My Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <div className="info-row">
            <strong>Name:</strong> {user.name}
          </div>
          <div className="info-row">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="info-row">
            <strong>Member Since:</strong> {user.createdAt.toLocaleDateString()}
          </div>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
      
      <div className="address-section">
        <h3>Shipping Addresses</h3>
        {user.addresses && user.addresses.length > 0 ? (
          <div className="address-list">
            {user.addresses.map((address, index) => (
              <div key={index} className="address-card">
                <div>{address.street}</div>
                <div>{address.city}, {address.state} {address.postalCode}</div>
                <div>{address.country}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No addresses saved yet.</p>
        )}
        <button>Add New Address</button>
      </div>
    </div>
  );
};

export class UserBrowser {
  private currentUser: User | null = null;
  private sessionToken: string | null = null;

  constructor(
    private config: UserConfig,
    private userSlot: UserSlot,
  ) {}
  
  /**
   * List all users
   */
  listUsers() {
    return this.userSlot.flatValues();
  }
  
  /**
   * Get user by email
   */
  getUserByEmail(email: string) {
    const allUsers = this.listUsers();
    return allUsers.find(user => user.email === email);
  }
  
  /**
   * Get current logged in user
   */
  getCurrentUser() {
    return this.currentUser;
  }
  
  /**
   * Set current user and token (after successful login)
   */
  setCurrentUser(user: User, token: string) {
    this.currentUser = user;
    this.sessionToken = token;
    // Save to localStorage for persistence
    localStorage.setItem('sessionToken', token);
  }
  
  /**
   * Logout the current user
   */
  logout() {
    this.currentUser = null;
    this.sessionToken = null;
    localStorage.removeItem('sessionToken');
  }

  static dependencies = [ SymphonyPlatformAspect, PiedPlatformAspect ];

  static defaultConfig: UserConfig = {
    enableRegistration: true,
    sessionTimeoutMinutes: 60
  };

  static async provider(
    [ symphonyPlatform, piedPlatform ]: [ SymphonyPlatformBrowser, PiedPlatformBrowser ],
    config: UserConfig,
    [userSlot]: [UserSlot]
  ) {
    const userManager = new UserBrowser(config, userSlot);
    
    // Handle login, just mocked for demo
    const handleLogin = (email: string, password: string) => {
      // In a real app, this would call an API
      const user = userManager.getUserByEmail(email);
      if (user) {
        // Mock token generation
        const token = 'mock-token-' + Date.now();
        userManager.setCurrentUser(user, token);
        window.location.href = '/profile';
      } else {
        alert('Invalid email or password');
      }
    };
    
    // Handle registration, just mocked for demo
    const handleRegister = (userData: Partial<User>, password: string) => {
      // In a real app, this would call an API
      if (!config.enableRegistration) {
        alert('Registration is currently disabled');
        return;
      }
      
      const newUser: User = {
        id: 'user-' + Date.now(),
        email: userData.email!,
        name: userData.name!,
        createdAt: new Date(),
        addresses: []
      };
      
      userSlot.register([newUser]);
      
      // Auto login after registration
      const token = 'mock-token-' + Date.now();
      userManager.setCurrentUser(newUser, token);
      window.location.href = '/profile';
    };
    
    // Register routes
    symphonyPlatform.registerRoute([
      {
        path: '/login',
        component: () => <LoginForm onLogin={handleLogin} />
      },
      {
        path: '/register',
        component: () => config.enableRegistration ? 
          <RegistrationForm onRegister={handleRegister} /> : 
          <div>Registration is currently disabled</div>
      },
      {
        path: '/profile',
        component: () => {
          const currentUser = userManager.getCurrentUser();
          if (!currentUser) {
            // Redirect to login if not logged in
            window.location.href = '/login';
            return <div>Redirecting to login...</div>;
          }
          return <UserProfile 
            user={currentUser} 
            onUpdate={(updatedUser) => {
              // Mock update
              userManager.setCurrentUser(updatedUser, userManager.sessionToken!);
            }} 
          />;
        }
      },
      {
        path: '/logout',
        component: () => {
          userManager.logout();
          window.location.href = '/';
          return <div>Logging out...</div>;
        }
      }
    ]);

    // Register header links
    piedPlatform.registerHeaderLinks([
      {
        label: 'Login',
        href: '/login',
        condition: () => !userManager.getCurrentUser()
      },
      {
        label: 'My Account',
        href: '/profile',
        condition: () => !!userManager.getCurrentUser()
      }
    ]);

    return userManager;
  }
}

export default UserBrowser; 