import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HarmonyPlatform } from '@bitdev/harmony.harmony-platform';
// import { KubernetesAspect } from '@bitdev/symphony.deployers.kubernetes';
import { NodeJSRuntime } from '@bitdev/harmony.runtimes.nodejs-runtime';
import { BrowserRuntime } from '@bitdev/harmony.runtimes.browser-runtime';
import { SymphonyPlatformAspect, SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { PeopleAspect } from '@pied/people.people';
import { PiedPlatformAspect, PiedPlatformBrowser } from '@pied/pied-piper.pied-platform'; 
import { CartAspect } from '@dras/ecommerce-demo.cart';
import { ProductAspect } from '@dras/ecommerce-demo.product';
import { UserAspect } from '@dras/ecommerce-demo.user';
import { CheckoutAspect } from '@dras/ecommerce-demo.checkout';
/**
  * compose the ecommerce-demo platform.
  */    
export const EcommerceDemo = HarmonyPlatform.from({
  name: 'ecommerce-demo',
  platform: [SymphonyPlatformAspect, {
    name: 'Ecommerce Demo',
    slogan: 'A modern e-commerce platform built with Bit',
    domain: 'ecommerce-demo.teambit.games',
    logo: 'https://w7.pngwing.com/pngs/621/196/png-transparent-e-commerce-logo-logo-e-commerce-electronic-business-ecommerce-angle-text-service.png',
    onGetStarted: () => {
      window.location.href = '/products';
    }
  }],

  runtimes: [
    new BrowserRuntime(), 
    new NodeJSRuntime()
  ],

  aspects: [
    // Core platform aspects
    PeopleAspect,
    PiedPlatformAspect,
    
    // E-commerce specific aspects
    CartAspect,
    ProductAspect,
    UserAspect,
    CheckoutAspect,
    
    // To deploy the platform on a Kubernetes cluster, use the official Kubernetes deployer 
    // for Harmony. @see https://bit.cloud/bitdev/symphony/deployers/kubernetes
  //   [KubernetesAspect, {
  //     /**
  //      * kubernetes auth
  //      */
  //     auth: {
  //       basic: {
  //         /**
  //          * certificate
  //          */
  //         certificate: process.env.KUBE_CERTIFICATE_AUTHORITY_DATA,

  //         /**
  //          * server
  //          */
  //         server: process.env.KUBE_SERVER,

  //         /**
  //          * token
  //          */
  //         token: process.env.KUBE_USER_TOKEN,
  //       },
  //     },
      
  //     /**
  //      * docker config for creating and pushing
  //      * images from the build pipeline.
  //      */
  //     docker: {
  //       /**
  //        * prefix to use for docker images.
  //        */
  //       imagePrefix: 'piedpiperapp',

  //       /**
  //        * docker auth
  //        */
  //       auth: {
  //         username: process.env.DOCKERHUB_USERNAME,
  //         password: process.env.DOCKERHUB_TOKEN,
  //       },
  //     },
  //   }],     
  ],
});

// Header component with improved styling
const Header = ({ menuItems, onGetStarted }) => {
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: '#333',
    },
    logoIcon: {
      fontSize: '24px',
      marginRight: '10px',
    },
    logoText: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    nav: {
      display: 'flex',
    },
    navItem: {
      margin: '0 10px',
      textDecoration: 'none',
      color: '#333',
      fontWeight: 'bold',
      padding: '8px 12px',
      borderRadius: '4px',
      transition: 'background-color 0.2s',
    },
    getStartedBtn: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
    }
  };

  return (
    <header style={styles.header}>
      <a href="/" style={styles.logo}>
        <span style={styles.logoIcon}>🛒</span>
        <span style={styles.logoText}>Ecommerce Demo</span>
      </a>
      <nav style={styles.nav}>
        {menuItems.map((item, index) => (
          <a key={index} href={item.url} style={styles.navItem}>
            {item.name}
          </a>
        ))}
      </nav>
      <button style={styles.getStartedBtn} onClick={onGetStarted}>
        Get Started
      </button>
    </header>
  );
};

// Main App component
const App = () => {
  // Function to handle Get Started button click
  const handleGetStarted = () => {
    // Check if user is logged in
    const userSession = localStorage.getItem('userSession');
    
    if (userSession) {
      // If logged in, take them to products
      window.location.href = '/products';
    } else {
      // If not logged in, take them to registration
      window.location.href = '/register';
    }
  };

  // Menu items for the header
  const menuItems = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: 'Cart', url: '/cart' },
    { name: 'Account', url: '/account' }
  ];

  return (
    <Router>
      <div className="app-container">
        <Header menuItems={menuItems} onGetStarted={handleGetStarted} />
        <main className="main-content">
          {/* Routes will be rendered here by Symphony */}
        </main>
      </div>
    </Router>
  );
};

export default EcommerceDemo;
