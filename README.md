# E-commerce Demo Application

A modern e-commerce platform built with [Bit](https://bit.dev) and React.

## Overview

This e-commerce demo showcases how to build a modular, component-based e-commerce application using Bit. The application is composed of several independent components that work together to create a complete e-commerce experience.

## Features

- **Product Management**: Browse products, view details, filter by category
- **User Management**: User registration, login, profile management
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout Process**: Shipping, payment, order confirmation
- **Order History**: View past orders and their status

## Components

The application is built using the following components:

- **Cart**: Navigation and shopping cart functionality
- **Products**: Product catalog, listings, and details
- **User**: User authentication, registration, and profile management
- **Checkout**: Cart review, shipping, payment, and order processing

## Architecture

This application is built using Bit's component-driven architecture, which allows for:

- Independent development of components
- Reusability across projects
- Clear separation of concerns
- Easy maintenance and updates

The application uses the following Bit aspects:

- **Symphony Platform**: Core platform functionality
- **Harmony Platform**: Component composition
- **Pied Platform**: UI components and styling

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or pnpm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ecommerce-demo.git
   cd ecommerce-demo
   ```

2. Install dependencies:
   ```
   npm install
   # or
   pnpm install
   ```

3. Start the development server:
   ```
   bit start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Development

### Adding a New Component

To add a new component to the application:

```
bit create aspect ecommerce-demo/component-name
```

### Building the Application

To build the application for production:

```
bit build
```

## Deployment

The application can be deployed using various methods:

1. **Static Hosting**: Build and deploy to services like Netlify, Vercel, or GitHub Pages
2. **Kubernetes**: Use the Kubernetes deployer for Harmony

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Bit](https://bit.dev) - Component-driven development platform
- [React](https://reactjs.org) - UI library
- [Symphony](https://bit.cloud/bitdev/symphony) - Platform composition framework
