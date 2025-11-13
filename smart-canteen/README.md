# Smart Canteen

A modern, full-stack web application for managing campus canteen operations with role-based access for customers, kitchen staff, and administrators. Built with React for the frontend and designed to integrate with a backend API for seamless order management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [File Structure](#file-structure)
- [Roles and Permissions](#roles-and-permissions)
- [Contributing](#contributing)
- [License](#license)

## Features

### Customer Features
- **User Authentication**: Secure login/signup with role-based access
- **Menu Browsing**: Interactive menu with categories, search functionality, and recommendations
- **Order Management**: Add items to cart, modify quantities, view order summary
- **Payment Processing**: UPI-based payment simulation with table number input
- **Order Tracking**: Real-time order status tracking with visual timeline
- **Order History**: View past orders and their statuses

### Kitchen Staff Features
- **Order Management**: View incoming orders and update preparation status
- **Status Updates**: Mark orders as "Preparing" or "Ready"
- **Real-time Updates**: Live order status synchronization

### Admin Features
- **User Management**: Create new kitchen staff and admin accounts
- **System Oversight**: Full access to user creation and management

### General Features
- **Responsive Design**: Mobile-friendly interface with modern UI
- **Real-time Notifications**: Order status updates and confirmations
- **Inventory Management**: Basic stock tracking for menu items
- **Search Functionality**: Find dishes quickly across all categories

## Tech Stack

### Frontend
- **React 19.1.1**: Modern React with hooks for state management
- **React Router DOM 7.9.1**: Client-side routing for single-page application
- **Axios 1.13.1**: HTTP client for API communication
- **CSS Modules**: Component-scoped styling
- **Create React App**: Build tooling and development server

### Development Tools
- **ESLint**: Code linting and formatting
- **Jest & React Testing Library**: Unit testing framework
- **Web Vitals**: Performance monitoring

## Architecture

The application follows a component-based architecture with clear separation of concerns:

### State Management
- **Local State**: React hooks (`useState`, `useEffect`) for component-level state
- **Global State**: Props drilling for shared state (orders, inventory, user role)
- **Persistent State**: localStorage for authentication tokens and user roles

### Component Structure
```
App.js (Main Router)
├── Auth.js (Login/Signup)
├── Menu.js (Menu browsing)
├── Order.js (Cart management)
├── Pay.js (Payment processing)
├── OrderPlaced.js (Success confirmation)
├── OrderTracking.js (Order status)
├── AdminCreateUser.js (Admin panel)
└── Kitchen.js (Kitchen staff panel)
```

### API Layer
- Centralized API configuration in `api.js`
- Axios interceptors for authentication headers
- Error handling and response processing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Backend API server running on `http://localhost:9090`

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-canteen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - The application will automatically reload on code changes

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Usage

### For Customers
1. **Sign Up/Login**: Create an account or log in with existing credentials
2. **Browse Menu**: Explore categories or search for specific items
3. **Add to Cart**: Select items and modify quantities
4. **Checkout**: Enter table number and complete payment
5. **Track Order**: Monitor preparation status in real-time

### For Kitchen Staff
1. **Login**: Use kitchen staff credentials
2. **Manage Orders**: View pending orders and update statuses
3. **Process Orders**: Mark orders as preparing or ready

### For Admins
1. **Login**: Use admin credentials
2. **Create Users**: Add new kitchen staff or admin accounts

## API Integration

The application communicates with a backend API server. All API calls are configured in `src/api.js`.

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Order Management
- `POST /api/orders` - Create new order
- `GET /api/orders/:id/status` - Get order status
- `PUT /api/orders/:id/cancel` - Cancel order

### Menu Management
- `GET /api/menu` - Fetch menu items

### Admin Endpoints
- `POST /api/admin/create-user` - Create new user (admin only)

### Request/Response Format

#### Authentication
```json
// Login Request
{
  "email": "user@example.com",
  "password": "password",
  "role": "CUSTOMER"
}

// Login Response
{
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com",
    "role": "CUSTOMER"
  }
}
```

#### Order Creation
```json
// Order Request
{
  "tableNumber": "T5",
  "items": [
    {
      "menuItemId": 1,
      "quantity": 2
    }
  ],
  "customerEmail": "user@example.com"
}

// Order Response
{
  "id": 123,
  "status": "PLACED",
  "total": 100,
  "items": [...],
  "createdAt": "2024-01-01T10:00:00Z"
}
```

## File Structure

```
smart-canteen/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── images/          # Static food images
├── src/
│   ├── api.js           # API configuration and interceptors
│   ├── App.js           # Main application component and routing
│   ├── App.css          # Global styles
│   ├── index.js         # Application entry point
│   ├── components/
│   │   └── SmartCanteen.js  # Legacy component (not actively used)
│   ├── pages/
│   │   ├── Auth.js      # Authentication page
│   │   ├── Auth.css     # Auth page styles
│   │   ├── Menu.js      # Menu browsing page
│   │   ├── Menu.css     # Menu page styles
│   │   ├── Order.js     # Cart/Order management page
│   │   ├── Order.css    # Order page styles
│   │   ├── Pay.js       # Payment processing page
│   │   ├── Pay.css      # Pay page styles
│   │   ├── OrderPlaced.js  # Order confirmation page
│   │   ├── OrderPlaced.css # Order placed styles
│   │   ├── OrderTracking.js # Order tracking page
│   │   ├── OrderTracking.css # Order tracking styles
│   │   ├── AdminCreateUser.js # Admin user creation page
│   │   └── Kitchen.js   # Kitchen staff dashboard
│   └── Styles/          # Additional style files
├── package.json         # Dependencies and scripts
└── README.md           # This documentation
```

## Roles and Permissions

### CUSTOMER
- Browse menu and place orders
- Track order status
- Cancel orders (under certain conditions)

### KITCHEN_STAFF
- View all orders
- Update order preparation status
- Access kitchen management interface

### ADMIN
- All customer permissions
- Create new user accounts (kitchen staff and admins)
- Full system access

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Maintain consistent code style with ESLint
- Write descriptive commit messages
- Test components using React Testing Library
- Ensure responsive design across devices

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This is a frontend-only application. It requires a compatible backend API server to function fully. The backend should implement the API endpoints documented in the [API Integration](#api-integration) section.
