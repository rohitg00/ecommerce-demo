import React from 'react';
import type { UserConfig } from './user-config.js';
import { MenuItem, MenuItemSlot } from './menu-item.js';
import { SymphonyPlatformAspect, SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { PiedPlatformAspect, PiedPlatformBrowser } from '@pied/pied-piper.pied-platform'; 

export class UserBrowser {
  constructor(
    private config: UserConfig,
    private menuItemSlot: MenuItemSlot,
  ) {}
  
  /**
   * register a list of menu item.
   */
  registerMenuItem(menuItems: MenuItem[]) {
    this.menuItemSlot.register(menuItems);
    return this;
  }

  /**
   * list all menu item.
   */
  listMenuItems() {
    return this.menuItemSlot.flatValues();
  }

  static dependencies = [ SymphonyPlatformAspect, PiedPlatformAspect ];

  static defaultConfig: UserConfig = {
    sessionTimeout: 60,
    allowGuestCheckout: true,
    requireEmailVerification: false
  };

  static async provider(
    [ symphonyPlatform, piedPlatform ]: [ SymphonyPlatformBrowser, PiedPlatformBrowser ],
    config: UserConfig,
    [menuItemSlot]: [MenuItemSlot]
  ) {
    const user = new UserBrowser(config, menuItemSlot);
    
    // Register user-related menu items
    user.registerMenuItem([
      {
        name: 'Login',
        url: '/login',
        icon: '🔑',
        order: 90
      },
      {
        name: 'Register',
        url: '/register',
        icon: '📝',
        order: 91
      },
      {
        name: 'My Account',
        url: '/account',
        icon: '👤',
        order: 92
      }
    ]);
    
    // Register user routes
    symphonyPlatform.registerRoute([
      {
        path: '/login',
        component: () => (
          <div className="login-container">
            <h1>Login</h1>
            <form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" />
              </div>
              <button type="submit" className="btn-login">Login</button>
            </form>
            <p>Don&apos;t have an account? <a href="/register">Register</a></p>
          </div>
        )
      },
      {
        path: '/register',
        component: () => (
          <div className="register-container">
            <h1>Register</h1>
            <p>Registration form goes here</p>
          </div>
        )
      },
      {
        path: '/account',
        component: () => (
          <div className="account-container">
            <h1>My Account</h1>
            <p>Account management goes here</p>
          </div>
        )
      }
    ]);

    return user;
  }
}

export default UserBrowser; 