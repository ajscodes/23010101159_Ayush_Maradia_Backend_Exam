# Ticket Management System API

A Node.js Express backend for a Ticket Management System, using MongoDB and JWT for authentication.

## Prerequisites

- Node.js installed
- MongoDB connection string (or local instance)

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Run the Application**:
   - For development (with auto-reload using nodemon):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```
     The server will start on `http://localhost:3000` (or your configured `PORT`).

---

## API Documentation

Most API routes require authentication via JSON Web Token (JWT). You should include the token in your requests via the `Authorization` header:
`Authorization: Bearer <your_jwt_token>`

### 1. Authentication

- **POST** `/auth/login`
  - Authenticates a user and returns a JWT token.

### 2. Users

_Requires Authentication and `MANAGER` role._

- **POST** `/users`
  - Create a new user account.
- **GET** `/users`
  - Retrieve details of users.

### 3. Tickets

_Requires Authentication._

- **POST** `/tickets`
  - Create a new ticket. _(Roles allowed: `USER`, `MANAGER`)_
- **GET** `/tickets`
  - Retrieve a list of tickets.
- **PATCH** `/tickets/:id/assign`
  - Assign a ticket to a specific user. _(Roles allowed: `MANAGER`, `SUPPORT`)_
- **PATCH** `/tickets/:id/status`
  - Update the status of a specific ticket. _(Roles allowed: `MANAGER`, `SUPPORT`)_
- **DELETE** `/tickets/:id`
  - Delete a specific ticket. _(Roles allowed: `MANAGER`)_

### 4. Comments

_Requires Authentication._

- **POST** `/comments/tickets/:id/comments`
  - Add a new comment to a specific ticket.
- **GET** `/comments/tickets/:id/comments`
  - Retrieve all comments for a specific ticket.
- **PATCH** `/comments/:id`
  - Update an existing comment by ID.
- **DELETE** `/comments/:id`
  - Delete a comment by ID.
