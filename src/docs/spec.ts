import type { OpenAPIV3_1 } from "openapi-types";

export const openapiSpec: OpenAPIV3_1.Document = {
  openapi: "3.1.0",
  info: {
    title: "eCommerce API Docs",
    version: "1.0.0",
    description:
      "A simple eCommerce API built with Express and MongoDB. You can use this API to manage users, products, categories, and orders in an eCommerce application.",
  },
  servers: [{ url: "http://localhost:3000", description: "local dev" }],
  tags: [
    { name: "Users" },
    { name: "Products" },
    { name: "Orders" },
    { name: "Categories" },
  ],
  components: {
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          message: { type: "string" },
          issues: {
            type: "array",
            items: {
              type: "object",
              properties: {
                path: { type: "string" },
                message: { type: "string" },
              },
            },
          },
        },
      },

      // Models (responses)
      Category: {
        type: "object",
        properties: {
          _id: { type: "string", example: "690a2a998c1d0a3f54c8e553" },
          name: { type: "string", example: "Category4" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: ["_id", "name"],
      },
      Product: {
        type: "object",
        properties: {
          _id: { type: "string", example: "690a3537ae234b0fc230f823" },
          name: { type: "string", example: "Product6" },
          description: { type: "string", example: "This is Product6!" },
          price: { type: "number", format: "float", example: 14.99 },
          categoryId: {
            oneOf: [
              { $ref: "#/components/schemas/Category" },
              { type: "string" },
            ],
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: ["_id", "name", "price", "categoryId"],
      },
      User: {
        type: "object",
        properties: {
          _id: { type: "string", example: "690d10a6011018a21988877b" },
          name: { type: "string", example: "User33" },
          email: {
            type: "string",
            format: "email",
            example: "user33@mail.com",
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: ["_id", "name", "email"],
      },
      OrderProductLine: {
        type: "object",
        properties: {
          lineItem: { type: "string", example: "690a2b718c1d0a3f54c8e557" },
          quantity: { type: "integer", example: 3, minimum: 1 },
        },
        required: ["lineItem", "quantity"],
      },
      Order: {
        type: "object",
        properties: {
          _id: { type: "string", example: "690d0193cf6cfdbb7032a5ee" },
          userId: {
            oneOf: [{ $ref: "#/components/schemas/User" }, { type: "string" }],
          },
          products: {
            type: "array",
            items: { $ref: "#/components/schemas/OrderProductLine" },
          },
          total: { type: "number", format: "float", example: 199.95 },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: ["_id", "userId", "products", "total"],
      },

      // Input DTOs (requests)
      CategoryInput: {
        type: "object",
        properties: {
          name: { type: "string", example: "Category4" },
        },
        required: ["name"],
      },
      ProductInput: {
        type: "object",
        properties: {
          name: { type: "string", example: "Product6" },
          description: { type: "string", example: "This is Product6!" },
          price: { type: "number", format: "float", example: 14.99 },
          categoryId: { type: "string", example: "690a2a998c1d0a3f54c8e553" },
        },
        required: ["name", "price", "categoryId"],
      },
      UserInput: {
        type: "object",
        properties: {
          name: { type: "string", example: "User33" },
          email: {
            type: "string",
            format: "email",
            example: "user33@mail.com",
          },
          password: { type: "string", example: "AbcD!123" },
        },
        required: ["name", "email", "password"],
      },
      UserInputNoPW: {
        type: "object",
        properties: {
          name: { type: "string", example: "User33" },
          email: {
            type: "string",
            format: "email",
            example: "user33@mail.com",
          },
        },
        required: ["name", "email"],
      },
      OrderInput: {
        type: "object",
        properties: {
          userId: { type: "string", example: "690a10df1d8bd6d55c7a56a3" },
          products: {
            type: "array",
            items: { $ref: "#/components/schemas/OrderProductLine" },
          },
        },
        required: ["userId", "products"],
      },
    },

    // --- ADDED: structured examples for thrown errors in controllers ---
    examples: {
      NoProductsFound: {
        summary: "No products",
        value: { message: "No Products found." },
      },
      ProductExists: {
        summary: "Product name already exists",
        value: { message: "Product with this name already exists!" },
      },
      InvalidProductCategory: {
        summary: "Invalid product category",
        value: { message: "Invalid Product category!" },
      },
      ProductNotFound: {
        summary: "Product not found",
        value: { message: "Product not found." },
      },
      NoProductFound: {
        summary: "No product found",
        value: { message: "No product found!" },
      },

      NoCategoriesFound: {
        summary: "No categories",
        value: { message: "No Categories found." },
      },
      CategoryExists: {
        summary: "Category exists",
        value: { message: "Category with this name already exists!" },
      },
      CategoryNotFound: {
        summary: "Category not found",
        value: { message: "Category not found." },
      },

      NoUsersFound: {
        summary: "No users",
        value: { message: "No Users found." },
      },
      UserNotFound: {
        summary: "User not found",
        value: { message: "User not found." },
      },
      RegistrationFailed: {
        summary: "Registration failed",
        value: { message: "Registration failed." },
      },

      NoOrdersFound: {
        summary: "No orders",
        value: { message: "No Orders found." },
      },
      OrderNotFound: {
        summary: "Order not found",
        value: { message: "Order not found." },
      },
      UserOrProductNotFound: {
        summary: "Referenced user or product not found",
        value: { message: "User or product not found." },
      },
      BadRequest: {
        summary: "Bad request",
        value: { message: "Bad request." },
      },
    },
    // --- ADDED: structured examples for thrown errors in controllers END ---

    parameters: {
      IdParam: {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string" },
      },
      CategoryQuery: {
        name: "categoryId",
        in: "query",
        required: false,
        schema: { type: "string" },
      },
    },
  },

  paths: {
    "/products": {
      get: {
        summary: "Get all products",
        tags: ["Products"],
        parameters: [{ $ref: "#/components/parameters/CategoryQuery" }],
        responses: {
          "200": {
            description: "List of products",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" },
                },
              },
            },
          },
          "404": {
            description: "No products found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  noProducts: { $ref: "#/components/examples/NoProductsFound" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a product",
        tags: ["Products"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Created product",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "400": {
            description: "Invalid category",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  invalidCat: {
                    $ref: "#/components/examples/InvalidProductCategory",
                  },
                },
              },
            },
          },
          "409": {
            description: "Product with this name already exists",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  exists: { $ref: "#/components/examples/ProductExists" },
                },
              },
            },
          },
        },
      },
    },

    "/products/{id}": {
      get: {
        summary: "Get product by id",
        tags: ["Products"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: {
          "200": {
            description: "Product found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "404": {
            description: "Product not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  notFound: { $ref: "#/components/examples/ProductNotFound" },
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update product by id",
        tags: ["Products"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated product",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "400": {
            description: "Invalid category",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  invalidCat: {
                    $ref: "#/components/examples/InvalidProductCategory",
                  },
                },
              },
            },
          },
          "404": {
            description: "Product not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  noProduct: { $ref: "#/components/examples/NoProductFound" },
                  notFound: { $ref: "#/components/examples/ProductNotFound" },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete product by id",
        tags: ["Products"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: {
          "200": {
            description: "Deleted product",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "404": {
            description: "Product not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  notFound: { $ref: "#/components/examples/ProductNotFound" },
                },
              },
            },
          },
        },
      },
    },

    "/categories": {
      get: {
        summary: "Get all categories",
        tags: ["Categories"],
        responses: {
          "200": {
            description: "List of categories",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Category" },
                },
              },
            },
          },
          "404": {
            description: "No categories found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  noCats: { $ref: "#/components/examples/NoCategoriesFound" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a category",
        tags: ["Categories"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CategoryInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Created category",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Category" },
              },
            },
          },
          "409": {
            description: "Category with this name already exists",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  exists: { $ref: "#/components/examples/CategoryExists" },
                },
              },
            },
          },
        },
      },
    },

    "/categories/{id}": {
      get: {
        summary: "Get category by id",
        tags: ["Categories"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: {
          "200": {
            description: "Category found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Category" },
              },
            },
          },
          "404": {
            description: "Category not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  notFound: { $ref: "#/components/examples/CategoryNotFound" },
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update category by id",
        tags: ["Categories"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CategoryInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated category",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Category" },
              },
            },
          },
          "404": {
            description: "Category not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  notFound: { $ref: "#/components/examples/CategoryNotFound" },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete category by id",
        tags: ["Categories"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: {
          "200": {
            description: "Deleted category",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Category" },
              },
            },
          },
          "404": {
            description: "Category not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  notFound: { $ref: "#/components/examples/CategoryNotFound" },
                },
              },
            },
          },
        },
      },
    },

    "/users": {
      get: {
        summary: "Get all users",
        tags: ["Users"],
        responses: {
          "200": {
            description: "List of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
          "404": {
            description: "No users found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  noUsers: { $ref: "#/components/examples/NoUsersFound" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a user",
        tags: ["Users"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Created user",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "400": {
            description: "Registration failed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  regFail: { $ref: "#/components/examples/RegistrationFailed" },
                },
              },
            },
          },
        },
      },
    },

    "/users/{id}": {
      get: {
        summary: "Get user by id",
        tags: ["Users"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: {
          "200": {
            description: "User found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  notFound: { $ref: "#/components/examples/UserNotFound" },
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update user by id",
        tags: ["Users"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserInputNoPW" },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated user",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  notFound: { $ref: "#/components/examples/UserNotFound" },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete user by id",
        tags: ["Users"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: {
          "200": {
            description: "Deleted user",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  notFound: { $ref: "#/components/examples/UserNotFound" },
                },
              },
            },
          },
        },
      },
    },

    "/orders": {
      get: {
        summary: "Get all orders",
        tags: ["Orders"],
        responses: {
          "200": {
            description: "List of orders",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Order" },
                },
              },
            },
          },
          "404": {
            description: "No orders found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  noOrders: { $ref: "#/components/examples/NoOrdersFound" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Place an order",
        tags: ["Orders"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OrderInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Order placed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  badReq: { $ref: "#/components/examples/BadRequest" },
                },
              },
            },
          },
          "404": {
            description: "User or product not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  missingRef: {
                    $ref: "#/components/examples/UserOrProductNotFound",
                  },
                },
              },
            },
          },
        },
      },
    },

    "/orders/{id}": {
      get: {
        summary: "Get order by id",
        tags: ["Orders"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: {
          "200": {
            description: "Order found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" },
              },
            },
          },
          "404": {
            description: "Order not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  notFound: { $ref: "#/components/examples/OrderNotFound" },
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update order by id",
        tags: ["Orders"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OrderInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated order",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" },
              },
            },
          },
          "404": {
            description: "Order not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  notFound: { $ref: "#/components/examples/OrderNotFound" },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete order by id",
        tags: ["Orders"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: {
          "200": {
            description: "Deleted order",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" },
              },
            },
          },
          "404": {
            description: "Order not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  notFound: { $ref: "#/components/examples/OrderNotFound" },
                },
              },
            },
          },
        },
      },
    },
  },
};
