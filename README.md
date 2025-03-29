# User Profile Management API

A RESTful API for user profile management with JWT authentication built with Express.js and MongoDB.

## Features

- User registration and authentication
- JWT-based protected routes
- Profile management (create, retrieve, update)
- MongoDB data storage
- Error handling

## Tech Stack

- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Packages**: mongoose, bcryptjs, jsonwebtoken, dotenv, cors

## Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/user-profile-api.git
   cd user-profile-api
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/user-profile-api
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

4. Start the server
   ```
   npm start
   ```

## API Endpoints

### Authentication

- **POST /api/users/register** - Register a new user
  - Request body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123", "address": "123 Main St" }`
  - Optional fields: `bio`, `profilePicture`

- **POST /api/users/login** - Login user
  - Request body: `{ "email": "john@example.com", "password": "password123" }`

### User Profile Management

All these endpoints require authentication (Bearer token in Authorization header)

- **GET /api/users/:id** - Get user profile (users can only access their own profile)
- **PUT /api/users/:id** - Update user profile (users can only update their own profile)
  - Request body: Any fields to update
- **GET /api/users** - Get all user profiles (for demonstration purposes, would likely be admin-only in production)

## Authentication

The API uses JWT for authentication. To access protected routes:

1. Login to get a token
2. Include the token in the Authorization header for subsequent requests:
   ```
   Authorization: Bearer your_token_here
   ```

## Project Structure

```
user-profile-api/
├── controllers/
│   └── users.js
├── middleware/
│   └── auth.js
├── models/
│   └── User.js
├── routes/
│   └── users.js
├── .env
├── server.js
└── package.json
```

## Error Handling

The API includes comprehensive error handling for:
- Invalid requests
- Authentication errors
- Database errors
- Server errors

## Postman Documentation

[Link to Postman Documentation](#) - Create and add your own Postman collection link here.

## License

MIT