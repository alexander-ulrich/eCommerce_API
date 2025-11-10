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
          lineItem: {
            oneOf: [
              {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  name: { type: "string" },
                  price: { type: "number" },
                },
              },
              { type: "string" },
            ],
          },
          quantity: { type: "integer", example: 3, minimum: 1 },
          _id: { type: "string" },
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
          name: { type: "string", example: "User3" },
          email: {
            type: "string",
            format: "email",
            example: "user3@mail.com",
          },
          password: { type: "string", example: "AbcD!123" },
        },
        required: ["name", "email", "password"],
      },
      UserInputNoPW: {
        type: "object",
        properties: {
          name: { type: "string", example: "User 3" },
          email: {
            type: "string",
            format: "email",
            example: "user3@mail.com",
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
        example: "69112380f8fc7e52df1668f2",
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
                example: [
                  {
                    _id: "690a2b718c1d0a3f54c8e557",
                    name: "Laptop",
                    description: "High-performance laptop",
                    price: 1999.99,
                    categoryId: {
                      _id: "690a29b59f88ad4e24a82a18",
                      name: "Electronics",
                      createdAt: "2025-11-04T16:28:38.000Z",
                      updatedAt: "2025-11-04T16:31:20.550Z",
                      __v: 0,
                    },
                    createdAt: "2025-11-04T16:36:01.705Z",
                    updatedAt: "2025-11-10T18:15:49.048Z",
                    __v: 0,
                  },
                  {
                    _id: "690a2e8b14bd8de1122d3423",
                    name: "Gaming Mouse",
                    description: "Wireless gaming mouse",
                    price: 59.99,
                    categoryId: {
                      _id: "690a29b59f88ad4e24a82a18",
                      name: "Electronics",
                      createdAt: "2025-11-04T16:28:38.000Z",
                      updatedAt: "2025-11-04T16:31:20.550Z",
                      __v: 0,
                    },
                    createdAt: "2025-11-04T16:49:15.988Z",
                    updatedAt: "2025-11-04T16:49:15.988Z",
                    __v: 0,
                  },
                ],
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
              example: {
                name: "iPhone 16",
                description: "Latest model iPhone with advanced features",
                price: 899.99,
                categoryId: "690a29b59f88ad4e24a82a18",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created product",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
                example: {
                  _id: "690a3537ae234b0fc230f823",
                  name: "iPhone 16",
                  description: "Latest model iPhone with advanced features",
                  price: 899.99,
                  categoryId: {
                    _id: "690a29b59f88ad4e24a82a18",
                    name: "Electronics",
                    createdAt: "2025-11-10T18:01:56.796Z",
                    updatedAt: "2025-11-10T18:01:56.796Z",
                  },
                  createdAt: "2025-11-10T18:01:56.796Z",
                  updatedAt: "2025-11-10T18:01:56.796Z",
                },
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
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "690a2b718c1d0a3f54c8e557",
          },
        ],
        responses: {
          "200": {
            description: "Product found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
                example: {
                  _id: "690a2b718c1d0a3f54c8e557",
                  name: "Laptop",
                  description: "High-performance laptop",
                  price: 1999.99,
                  categoryId: {
                    _id: "690a29b59f88ad4e24a82a18",
                    name: "Electronics",
                    createdAt: "2025-11-10T07:00:00.000Z",
                    updatedAt: "2025-11-10T07:00:00.000Z",
                  },
                  createdAt: "2025-11-10T08:00:00.000Z",
                  updatedAt: "2025-11-10T08:00:00.000Z",
                  __v: 0,
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
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "690a2b718c1d0a3f54c8e557",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductInput" },
              example: {
                name: "Gaming Laptop",
                description: "High-performance gaming laptop with RTX 4090",
                price: 2499.99,
                categoryId: "690a29b59f88ad4e24a82a18",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated product",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
                example: {
                  _id: "690a2b718c1d0a3f54c8e557",
                  name: "Gaming Laptop",
                  description: "High-performance gaming laptop with RTX 4090",
                  price: 2499.99,
                  categoryId: {
                    _id: "690a29b59f88ad4e24a82a18",
                    name: "Electronics",
                    createdAt: "2025-11-10T07:00:00.000Z",
                    updatedAt: "2025-11-10T07:00:00.000Z",
                  },
                  createdAt: "2025-11-10T08:00:00.000Z",
                  updatedAt: "2025-11-10T19:30:00.000Z",
                  __v: 0,
                },
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
                example: {
                  _id: "690a2b718c1d0a3f54c8e557",
                  name: "Laptop",
                  description: "High-performance laptop",
                  price: 1999.99,
                  categoryId: {
                    _id: "690a29b59f88ad4e24a82a18",
                    name: "Electronics",
                    createdAt: "2025-11-10T07:00:00.000Z",
                    updatedAt: "2025-11-10T07:00:00.000Z",
                  },
                  createdAt: "2025-11-10T08:00:00.000Z",
                  updatedAt: "2025-11-10T08:00:00.000Z",
                  __v: 0,
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
                example: [
                  {
                    _id: "690a29b59f88ad4e24a82a18",
                    name: "Electronics",
                    createdAt: "2025-11-10T07:00:00.000Z",
                    updatedAt: "2025-11-10T07:00:00.000Z",
                    __v: 0,
                  },
                  {
                    _id: "690cfac8074754553d5dedf7",
                    name: "Books",
                    createdAt: "2025-11-10T07:30:00.000Z",
                    updatedAt: "2025-11-10T07:30:00.000Z",
                    __v: 0,
                  },
                  {
                    _id: "69112380f8fc7e52df1668f2",
                    name: "Clothing",
                    createdAt: "2025-11-10T08:00:00.000Z",
                    updatedAt: "2025-11-10T08:00:00.000Z",
                    __v: 0,
                  },
                ],
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
              example: { name: "Furniture" },
            },
          },
        },
        responses: {
          "201": {
            description: "Created category",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Category" },
                example: {
                  _id: "690a29b59f88ad4e24a82a18",
                  name: "Furniture",
                  createdAt: "2025-11-10T07:00:00.000Z",
                  updatedAt: "2025-11-10T07:00:00.000Z",
                  __v: 0,
                },
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
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "690cfac8074754553d5dedf7",
          },
        ],
        responses: {
          "200": {
            description: "Category found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Category" },
                example: {
                  _id: "690a29b59f88ad4e24a82a18",
                  name: "Electronics",
                  createdAt: "2025-11-10T07:00:00.000Z",
                  updatedAt: "2025-11-10T07:00:00.000Z",
                  __v: 0,
                },
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
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "690cfac8074754553d5dedf7",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CategoryInput" },
              example: { name: "Luxury furniture" },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated category",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Category" },
                example: {
                  _id: "690a29b59f88ad4e24a82a18",
                  name: "Luxury furniture",
                  createdAt: "2025-11-10T07:00:00.000Z",
                  updatedAt: "2025-11-10T07:00:00.000Z",
                  __v: 0,
                },
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
                example: {
                  _id: "690a29b59f88ad4e24a82a18",
                  name: "Electronics",
                  createdAt: "2025-11-10T07:00:00.000Z",
                  updatedAt: "2025-11-10T07:00:00.000Z",
                  __v: 0,
                },
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
                example: [
                  {
                    _id: "690a10df1d8bd6d55c7a56a3",
                    name: "John Doe",
                    email: "jdoe@mail.com",
                    createdAt: "2025-11-10T10:30:00.000Z",
                    updatedAt: "2025-11-10T10:30:00.000Z",
                    __v: 0,
                  },
                  {
                    _id: "690d10a6011018a21988877b",
                    name: "Jane Smith",
                    email: "jsmith@mail.com",
                    createdAt: "2025-11-10T11:00:00.000Z",
                    updatedAt: "2025-11-10T11:00:00.000Z",
                    __v: 0,
                  },
                ],
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
              example: {
                name: "Jasmin Smith",
                email: "jassmith@mail.com",
                password: "AbcD!1234",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created user",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
                example: {
                  _id: "690d10a6011018a21988877b",
                  name: "Jane Smith",
                  email: "jsmith@mail.com",
                  createdAt: "2025-11-10T11:00:00.000Z",
                  updatedAt: "2025-11-10T11:00:00.000Z",
                  __v: 0,
                },
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
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "690d10a6011018a21988877b",
          },
        ],
        responses: {
          "200": {
            description: "User found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
                example: {
                  _id: "690a10df1d8bd6d55c7a56a3",
                  name: "John Doe",
                  email: "jdoe@mail.com",
                  createdAt: "2025-11-10T10:30:00.000Z",
                  updatedAt: "2025-11-10T10:30:00.000Z",
                  __v: 0,
                },
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
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "690a10df1d8bd6d55c7a56a3",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserInputNoPW" },
              example: {
                name: "Johnathan Doe",
                email: "johnathan.doe@mail.com",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated user",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
                example: {
                  _id: "690a10df1d8bd6d55c7a56a3",
                  name: "Jamie Doe",
                  email: "jamie.doe@mail.com",
                  createdAt: "2025-11-10T10:30:00.000Z",
                  updatedAt: "2025-11-10T10:30:00.000Z",
                  __v: 0,
                },
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
                example: {
                  _id: "690a10df1d8bd6d55c7a56a3",
                  name: "John Doe",
                  email: "jdoe@mail.com",
                  createdAt: "2025-11-10T10:30:00.000Z",
                  updatedAt: "2025-11-10T10:30:00.000Z",
                  __v: 0,
                },
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
                example: [
                  {
                    _id: "690d0193cf6cfdbb7032a5ee",
                    userId: {
                      _id: "690a10df1d8bd6d55c7a56a3",
                      name: "John Doe",
                    },
                    products: [
                      {
                        lineItem: {
                          _id: "690a2b718c1d0a3f54c8e557",
                          name: "Laptop",
                          price: 1999.99,
                        },
                        quantity: 2,
                        _id: "6912222ea31ea1a843124ef3",
                      },
                      {
                        lineItem: {
                          _id: "690a2e8b14bd8de1122d3423",
                          name: "Gaming Mouse",
                          price: 59.99,
                        },
                        quantity: 4,
                        _id: "6912222ea31ea1a843124ef4",
                      },
                    ],
                    total: 4239.94,
                    createdAt: "2025-11-06T20:14:11.094Z",
                    updatedAt: "2025-11-10T17:34:38.899Z",
                    __v: 0,
                  },
                  {
                    _id: "691224c4a31ea1a843124f2c",
                    userId: {
                      _id: "690d10a6011018a21988877b",
                      name: "Jane Smith",
                    },
                    products: [
                      {
                        lineItem: {
                          _id: "690a2b718c1d0a3f54c8e557",
                          name: "Laptop",
                          price: 1999.99,
                        },
                        quantity: 2,
                        _id: "691224c4a31ea1a843124f2d",
                      },
                      {
                        lineItem: {
                          _id: "690a3537ae234b0fc230f823",
                          name: "T-Shirt",
                          price: 12.99,
                        },
                        quantity: 2,
                        _id: "691224c4a31ea1a843124f2e",
                      },
                      {
                        lineItem: {
                          _id: "690a2e8b14bd8de1122d3423",
                          name: "Gaming Mouse",
                          price: 59.99,
                        },
                        quantity: 2,
                        _id: "691224c4a31ea1a843124f2f",
                      },
                    ],
                    total: 4145.94,
                    createdAt: "2025-11-10T17:45:40.358Z",
                    updatedAt: "2025-11-10T17:45:40.358Z",
                    __v: 0,
                  },
                ],
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
              example: {
                userId: "690a10df1d8bd6d55c7a56a3",
                products: [
                  {
                    lineItem: "690a2b718c1d0a3f54c8e557",
                    quantity: 2,
                  },
                  {
                    lineItem: "690a2e8b14bd8de1122d3423",
                    quantity: 4,
                  },
                ],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Order placed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" },
                example: {
                  _id: "691225f0a31ea1a843124f35",
                  userId: {
                    _id: "690a10df1d8bd6d55c7a56a3",
                    name: "John Doe",
                  },
                  products: [
                    {
                      lineItem: {
                        _id: "690a2b718c1d0a3f54c8e557",
                        name: "Laptop",
                        price: 1999.99,
                      },
                      quantity: 2,
                      _id: "691225f0a31ea1a843124f36",
                    },
                    {
                      lineItem: {
                        _id: "690a2e8b14bd8de1122d3423",
                        name: "Gaming Mouse",
                        price: 59.99,
                      },
                      quantity: 2,
                      _id: "691225f0a31ea1a843124f37",
                    },
                  ],
                  total: 2119.97,
                  createdAt: "2025-11-10T18:00:00.000Z",
                  updatedAt: "2025-11-10T18:00:00.000Z",
                  __v: 0,
                },
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
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "690d0193cf6cfdbb7032a5ee",
          },
        ],
        responses: {
          "200": {
            description: "Order found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" },
                example: {
                  _id: "690d0193cf6cfdbb7032a5ee",
                  userId: {
                    _id: "690a10df1d8bd6d55c7a56a3",
                    name: "John Doe",
                  },
                  products: [
                    {
                      lineItem: {
                        _id: "690a2b718c1d0a3f54c8e557",
                        name: "Laptop",
                        price: 1999.99,
                      },
                      quantity: 2,
                      _id: "6912222ea31ea1a843124ef3",
                    },
                    {
                      lineItem: {
                        _id: "690a2e8b14bd8de1122d3423",
                        name: "Gaming Mouse",
                        price: 59.99,
                      },
                      quantity: 4,
                      _id: "6912222ea31ea1a843124ef4",
                    },
                  ],
                  total: 4239.94,
                  createdAt: "2025-11-06T20:14:11.094Z",
                  updatedAt: "2025-11-10T17:34:38.899Z",
                  __v: 0,
                },
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
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "690d0193cf6cfdbb7032a5ee",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OrderInput" },
              example: {
                userId: "690a10df1d8bd6d55c7a56a3",
                products: [
                  {
                    lineItem: "690a2b718c1d0a3f54c8e557",
                    quantity: 2,
                  },
                  {
                    lineItem: "690a2e8b14bd8de1122d3423",
                    quantity: 2,
                  },
                ],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated order",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" },
                example: {
                  _id: "690d0193cf6cfdbb7032a5ee",
                  userId: {
                    _id: "690a10df1d8bd6d55c7a56a3",
                    name: "John Doe",
                  },
                  products: [
                    {
                      lineItem: {
                        _id: "690a2b718c1d0a3f54c8e557",
                        name: "Laptop",
                        price: 1999.99,
                      },
                      quantity: 3,
                      _id: "6912222ea31ea1a843124ef3",
                    },
                    {
                      lineItem: {
                        _id: "690a2e8b14bd8de1122d3423",
                        name: "Gaming Mouse",
                        price: 59.99,
                      },
                      quantity: 1,
                      _id: "6912222ea31ea1a843124ef4",
                    },
                  ],
                  total: 6059.96,
                  createdAt: "2025-11-06T20:14:11.094Z",
                  updatedAt: "2025-11-10T18:30:00.000Z",
                  __v: 0,
                },
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
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Deleted order",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" },
                example: {
                  _id: "690d0193cf6cfdbb7032a5ee",
                  userId: {
                    _id: "690a10df1d8bd6d55c7a56a3",
                    name: "John Doe",
                  },
                  products: [
                    {
                      lineItem: {
                        _id: "690a2b718c1d0a3f54c8e557",
                        name: "Laptop",
                        price: 1999.99,
                      },
                      quantity: 2,
                      _id: "6912222ea31ea1a843124ef3",
                    },
                    {
                      lineItem: {
                        _id: "690a2e8b14bd8de1122d3423",
                        name: "Gaming Mouse",
                        price: 59.99,
                      },
                      quantity: 4,
                      _id: "6912222ea31ea1a843124ef4",
                    },
                  ],
                  total: 4239.94,
                  createdAt: "2025-11-06T20:14:11.094Z",
                  updatedAt: "2025-11-10T17:34:38.899Z",
                  __v: 0,
                },
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
