import React, { useState, useEffect } from 'react';
import type { UserConfig } from './user-config.js';
import { MenuItem, MenuItemSlot } from './menu-item.js';
import { SymphonyPlatformAspect, SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { PiedPlatformAspect, PiedPlatformBrowser } from '@pied/pied-piper.pied-platform'; 

// People page component (replacing the Pied Piper reference)
const PeoplePage = () => {
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '30px',
      color: '#333',
      borderBottom: '2px solid #eee',
      paddingBottom: '10px',
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '30px',
      marginTop: '30px',
    },
    teamMember: {
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    memberImage: {
      width: '100%',
      height: '250px',
      objectFit: 'cover' as 'cover',
    },
    memberInfo: {
      padding: '20px',
    },
    memberName: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#333',
    },
    memberRole: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '10px',
    },
    memberBio: {
      fontSize: '14px',
      color: '#555',
      lineHeight: '1.5',
    }
  };

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      role: 'CEO & Founder',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'John has over 15 years of experience in e-commerce and retail management.'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'CTO',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Sarah leads our technology team with expertise in scalable e-commerce platforms.'
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Head of Product',
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
      bio: 'Michael ensures our product selection meets the highest quality standards.'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      role: 'Customer Experience Manager',
      image: 'https://randomuser.me/api/portraits/women/33.jpg',
      bio: 'Emily is dedicated to creating exceptional shopping experiences for our customers.'
    }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Our Team</h1>
      <p>Meet the dedicated professionals behind our e-commerce platform.</p>
      
      <div style={styles.teamGrid}>
        {teamMembers.map(member => (
          <div key={member.id} style={styles.teamMember}>
            <img src={member.image} alt={member.name} style={styles.memberImage} />
            <div style={styles.memberInfo}>
              <h3 style={styles.memberName}>{member.name}</h3>
              <p style={styles.memberRole}>{member.role}</p>
              <p style={styles.memberBio}>{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Rest of the user components (LoginPage, RegisterPage, AccountPage) remain the same
// ...

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
        name: 'Account',
        url: '/account',
        icon: '👤',
        order: 92
      },
      {
        name: 'Our Team',
        url: '/people',
        icon: '👥',
        order: 93
      }
    ]);
    
    // Register user routes
    symphonyPlatform.registerRoute([
      {
        path: '/login',
        component: () => <LoginPage />
      },
      {
        path: '/register',
        component: () => <RegisterPage />
      },
      {
        path: '/account',
        component: () => <AccountPage />
      },
      {
        path: '/people',
        component: () => <PeoplePage />
      }
    ]);

    return user;
  }
}

export default UserBrowser; 