# eCommerce API

A RESTful API built with Express.js, TypeScript, and MongoDB for managing an eCommerce platform. This API provides endpoints for managing users, products, categories, and orders with full CRUD operations.

## Features

- 🛍️ **Product Management**: Create, read, update, and delete products
- 📦 **Category Management**: Organize products into categories
- 👥 **User Management**: User registration and profile management
- 🛒 **Order Management**: Place and manage orders with automatic total calculation
- ✅ **Input Validation**: Request validation using Zod schemas
- 📚 **API Documentation**: Interactive Swagger/OpenAPI documentation
- 🔒 **Error Handling**: Centralized error handling with meaningful error messages
- 🌐 **CORS Support**: Cross-origin resource sharing enabled

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod
- **Documentation**: Swagger UI with OpenAPI 3.1
- **CORS**: cors middleware

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project_eCommerce_API
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGODB_URI=<YOUR_MONGODB_CONNECTION_STRING>/<YOUR_DB_NAME>
```

4. Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Documentation

Once the server is running, visit `http://localhost:3000/docs` to access the interactive Swagger documentation.

## API Endpoints

### Users
- `GET /users` - Get all users
- `POST /users` - Register a new user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user by ID
- `DELETE /users/:id` - Delete user by ID

### Categories
- `GET /categories` - Get all categories
- `POST /categories` - Create a new category
- `GET /categories/:id` - Get category by ID
- `PUT /categories/:id` - Update category by ID
- `DELETE /categories/:id` - Delete category by ID

### Products
- `GET /products` - Get all products (supports `?categoryId=` query parameter in URL)
- `POST /products` - Create a new product
- `GET /products/:id` - Get product by ID
- `PUT /products/:id` - Update product by ID
- `DELETE /products/:id` - Delete product by ID

### Orders
- `GET /orders` - Get all orders
- `POST /orders` - Place a new order
- `GET /orders/:id` - Get order by ID
- `PUT /orders/:id` - Update order by ID
- `DELETE /orders/:id` - Delete order by ID

## Request Examples

### Create a User: POST /users
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### Create a Product: POST /products
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1999.99,
  "categoryId": "<EXISTING_CATEGORY_ID>"
}
```

### Place an Order: POST /orders
```json
{
  "userId": "<EXISTING_USER_ID>",
  "products": [
    {
      "lineItem": "<EXISTING_PRODUCT_ID>",
      "quantity": 2
    },
    {
      "lineItem": "<EXISTING_PRODUCT_ID>",
      "quantity": 1
    }
  ]
}
```

## Validation Rules

### User
- **name**: Minimum 2 characters
- **email**: Valid email format
- **password**: Minimum 8 characters, must contain uppercase, lowercase, number, and special character

### Product
- **name**: Required, string
- **description**: Required, string
- **price**: Required, positive number
- **categoryId**: Required, valid MongoDB ObjectId

### Order
- **userId**: Required, valid MongoDB ObjectId
- **products**: Required array with at least one item
  - **lineItem**: Product ID (MongoDB ObjectId)
  - **quantity**: Positive number

## Error Responses

All error responses follow this format:
```json
{
  "message": "Error description"
}
```

Validation errors include additional details:
```json
{
  "message": "Validation failed",
  "issues": [
    {
      "path": "email",
      "message": "Email must be a valid email."
    }
  ]
}
```

## Project Structure

```
src/
├── app.ts                 # Express app configuration
├── controllers/           # Request handlers
│   ├── categoryController.ts
│   ├── orderController.ts
│   ├── productController.ts
│   └── userController.ts
├── db/                    # Database connection
├── docs/                  # OpenAPI specification
├── middlewares/           # Custom middleware
│   ├── errorHandler.ts
│   └── validateBodyZod.ts
├── models/                # Mongoose models
│   ├── Category.ts
│   ├── Order.ts
│   ├── Product.ts
│   └── User.ts
├── routers/               # Route definitions
│   ├── categoryRouter.ts
│   ├── orderRouter.ts
│   ├── productRouter.ts
│   └── userRouter.ts
└── schemas/               # Zod validation schemas
    ├── categorySchema.ts
    ├── orderSchema.ts
    ├── productSchema.ts
    └── userSchema.ts
```

## Development

### Build
```bash
npm run build
```

### Run in Development Mode
```bash
npm run dev
```

## Features in Detail

### Order Total Calculation
When an order is placed or updated, the API automatically:
1. Validates that all products exist
2. Calculates the total based on product prices and quantities
3. Rounds to 2 decimal places

### Populated Responses
Orders return populated data including:
- User information (name)
- Product details (name, price) for each line item

### Query Filtering
Products can be filtered by category:
```
GET /products?categoryId=<EXISTING_CATEGORY_ID>
```
