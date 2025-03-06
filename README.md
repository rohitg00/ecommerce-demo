# E-commerce Demo Application

A modern, composable e-commerce platform built with [Bit](https://bit.dev) and React, showcasing the power of Harmony architecture.

## Overview

This e-commerce demo demonstrates how to build a modular, component-driven e-commerce application using Bit's Harmony architecture. The application is composed of several independent aspects that work together seamlessly to create a complete e-commerce experience while maintaining separation of concerns.

## Features

### Product Management
- Browse a diverse catalog of products with high-quality images
- View detailed product information and specifications
- Add products to cart directly from the product listing
- Responsive product grid that adapts to different screen sizes

### Shopping Cart
- Add/remove items with real-time updates
- Update quantities with intuitive controls
- Persistent cart that maintains state between sessions using localStorage
- Clear order summary with subtotal, shipping, and total calculations

### User Management
- User registration with form validation
- Secure login functionality
- User profile management
- Session persistence across browser sessions

### Checkout Process
- Streamlined checkout experience
- Shipping information collection
- Multiple payment method options
- Order confirmation and summary

## Composable Architecture

This application showcases the power of Bit's Harmony architecture through:

### Independent Aspects

Each functional area is encapsulated in its own aspect:

- **Cart Aspect**: Manages the shopping cart state, persistence, and UI
- **Product Aspect**: Handles product catalog, listings, and details
- **User Aspect**: Controls authentication, user profiles, and session management
- **Checkout Aspect**: Orchestrates the checkout flow and order processing

### Seamless Integration

The aspects communicate and integrate through:

- **Slot Registry**: Components register themselves to extension points
- **Dependency Injection**: Services are provided to components that need them
- **Event-based Communication**: Components react to changes in other parts of the system

### Benefits Demonstrated

- **Modularity**: Each aspect can be developed, tested, and deployed independently
- **Reusability**: Components can be shared and reused across projects
- **Scalability**: New features can be added without modifying existing code
- **Maintainability**: Clear separation of concerns makes the codebase easier to understand and maintain

## Technical Implementation

### Symphony Platform Integration

The application leverages Symphony Platform for:

- **Routing**: Declarative route registration from each aspect
- **UI Composition**: Components from different aspects compose together seamlessly
- **State Management**: Distributed state management across aspects

### Pied Platform Integration

The Pied Platform provides:

- **Header Links**: Dynamic navigation based on registered menu items
- **UI Components**: Shared UI elements for consistent design
- **Styling**: Consistent styling across all aspects

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

2. To add a new aspect to the application:

```
bit create aspect ecommerce-demo/aspect-name
```

3. Install dependencies:
   ```
   bit install
   ```

4. Start the compiler:
   ```
   bit watch
   ```

5. Start the development server:
   ```
   bit run ecommerce-demo
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Development Workflow

The component-driven development workflow enables:

1. **Independent Development**: Work on aspects in isolation
2. **Immediate Feedback**: See changes in real-time with hot reloading
3. **Composition Testing**: Test how components work together
4. **Versioning**: Version aspects independently



### Building the Application

To build the application for production:

```
bit build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Bit](https://bit.dev) - Component-driven development platform
- [Harmony](https://bit.cloud/bitdev/harmony) - Aspect-oriented composition framework
- [Symphony](https://bit.cloud/bitdev/symphony) - Platform composition framework
- [React](https://reactjs.org) - UI library
