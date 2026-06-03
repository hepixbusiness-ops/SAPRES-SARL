# SAPRES SARL Backend API

Enterprise backend for SAPRES SARL Corporate Website, Product Catalog, E-Commerce Platform, Recruitment Portal & Administration System.

## Architecture

Feature-based modular architecture with clear separation of concerns:

```
src/
├── app.js              # Express app configuration
├── server.js           # Server bootstrap
├── config/             # Configuration files
├── middlewares/        # Express middlewares
├── utils/              # Utility functions
├── modules/            # Feature modules (each with model, controller, service, routes, validation)
├── routes/             # Central route registration
└── schemas/            # Shared schemas
```

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Authorization**: Role-Based Access Control (RBAC)
- **File Upload**: Cloudinary
- **Validation**: Joi
- **Password Hashing**: bcryptjs

## Getting Started

### Prerequisites

- Node.js 14+
- MongoDB
- Cloudinary account (for media uploads)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the server
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

All endpoints are versioned under `/api/v1/`

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

### Users
- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update current user profile

### Products
- `GET /api/v1/products` - List all products
- `POST /api/v1/products` - Create product (admin)
- `GET /api/v1/products/:id` - Get product details
- `PUT /api/v1/products/:id` - Update product (admin)
- `DELETE /api/v1/products/:id` - Delete product (admin)

### Categories
- `GET /api/v1/categories` - List all categories
- `POST /api/v1/categories` - Create category (admin)
- `GET /api/v1/categories/:id` - Get category details
- `PUT /api/v1/categories/:id` - Update category (admin)
- `DELETE /api/v1/categories/:id` - Delete category (admin)

### Services
- `GET /api/v1/services` - List all services
- `POST /api/v1/services` - Create service (admin)
- `GET /api/v1/services/:id` - Get service details
- `PUT /api/v1/services/:id` - Update service (admin)
- `DELETE /api/v1/services/:id` - Delete service (admin)

### Projects
- `GET /api/v1/projects` - List all projects
- `POST /api/v1/projects` - Create project (admin)
- `GET /api/v1/projects/:id` - Get project details
- `PUT /api/v1/projects/:id` - Update project (admin)
- `DELETE /api/v1/projects/:id` - Delete project (admin)

### Jobs
- `GET /api/v1/jobs` - List all jobs
- `POST /api/v1/jobs` - Create job (admin)
- `GET /api/v1/jobs/:id` - Get job details
- `PUT /api/v1/jobs/:id` - Update job (admin)
- `DELETE /api/v1/jobs/:id` - Delete job (admin)

### Applications
- `GET /api/v1/applications` - List all applications (admin)
- `POST /api/v1/applications` - Submit job application
- `GET /api/v1/applications/:id` - Get application details
- `PUT /api/v1/applications/:id` - Update application (admin)
- `DELETE /api/v1/applications/:id` - Delete application (admin)

### Blogs
- `GET /api/v1/blogs` - List all blogs
- `POST /api/v1/blogs` - Create blog (admin)
- `GET /api/v1/blogs/:id` - Get blog details
- `PUT /api/v1/blogs/:id` - Update blog (admin)
- `DELETE /api/v1/blogs/:id` - Delete blog (admin)

### Orders
- `GET /api/v1/orders` - List orders
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders/:id` - Get order details
- `PUT /api/v1/orders/:id` - Update order status (admin)

### Payments
- `POST /api/v1/payments` - Process payment
- `GET /api/v1/payments/:id` - Get payment details

### Contacts
- `POST /api/v1/contacts` - Submit contact form
- `GET /api/v1/contacts` - List contacts (admin)

### Quotes
- `POST /api/v1/quotes` - Request quote
- `GET /api/v1/quotes` - List quotes (admin)

## User Roles

- **super_admin** - Full system access
- **hr_admin** - Manage jobs and applications
- **sales_admin** - Manage products, orders, and quotes
- **content_admin** - Manage content (services, projects, blogs)

## Project Structure

### Module Pattern

Each feature module follows a consistent pattern:

```
moduleName/
├── moduleName.model.js        # Mongoose schema
├── moduleName.controller.js   # Request handlers
├── moduleName.service.js      # Business logic
├── moduleName.routes.js       # Route definitions
└── moduleName.validation.js   # Input validation (Joi schemas)
```

### Middleware Stack

- `auth.middleware.js` - JWT authentication
- `role.middleware.js` - Role-based authorization
- `validate.middleware.js` - Request body/query validation
- `upload.middleware.js` - File upload handling (Cloudinary)
- `error.middleware.js` - Centralized error handling
- `notFound.middleware.js` - 404 handler

### Utilities

- `ApiResponse.js` - Standardized API response format
- `ApiError.js` - Custom error class
- `slugify.js` - URL-friendly string conversion
- `generateOrderNumber.js` - Order number generation

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": null
}
```

## Response Format

Successful responses follow this format:

```json
{
  "success": true,
  "data": {},
  "message": "Optional message"
}
```

## Development

```bash
# Install dependencies
npm install

# Start in development mode (with hot reload)
npm run dev

# Start in production mode
npm start

# Run linter
npm run lint

# Run tests
npm test
```

## Security

- Passwords are hashed using bcryptjs
- JWT tokens with configurable expiration
- Role-Based Access Control (RBAC) for authorization
- Environment variables for sensitive data
- Input validation with Joi
- CORS enabled (configure as needed)

## Future Enhancements

- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Caching layer (Redis)
- [ ] API rate limiting
- [ ] Webhook support
- [ ] GraphQL API
- [ ] Real-time notifications (WebSockets)
- [ ] Audit logging
- [ ] Multi-language support

## Support

For issues and questions, please contact the development team or open an issue in the repository.

## License

All rights reserved © 2024 SAPRES SARL
