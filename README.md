# CAiRL Basic Server

This is a basic Express.js server with TypeScript, MongoDB, user authentication (login/register), and logging.

## Features

- Express.js with TypeScript
- MongoDB with Mongoose
- User Authentication (Register & Login)
- JWT for token-based authentication
- Service Layer for Business Logic
- Input Validation with `express-validator`
- Winston for logging
- Morgan for HTTP request logging
- Error Handling Middleware

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- MongoDB (running locally or a cloud instance like MongoDB Atlas)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd cairl-basic-server
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

### Configuration

1.  Create a `.env` file in the root directory of the project.

2.  Add the following environment variables:

    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/cairl-basic-server
    JWT_SECRET=supersecretjwtkey
    ```

    -   `PORT`: The port your server will run on. (e.g., `5000`)
    -   `MONGO_URI`: Your MongoDB connection string. If you're running MongoDB locally, the provided URI should work. Otherwise, replace it with your MongoDB Atlas or other cloud provider URI.
    -   `JWT_SECRET`: A strong, random string for JWT signing. You can generate one using a tool or just type a long random string.

### Running the Application

1.  **Development Mode (with hot-reloading):**

    ```bash
    npm run dev
    ```

    The server will start on the port specified in your `.env` file (default: 5000).

2.  **Build for Production:**

    ```bash
    npm run build
    ```

    This will compile the TypeScript code into JavaScript in the `dist` folder.

3.  **Production Mode:**

    ```bash
    npm start
    ```

    This will run the compiled JavaScript code from the `dist` folder.

## API Endpoints

### User Authentication

-   **Register a new user**
    -   `POST /api/users`
    -   **Request Body:**
        ```json
        {
          "username": "testuser",
          "email": "test@example.com",
          "password": "password123"
        }
        ```
    -   **Success Response (201 Created):**
        ```json
        {
          "_id": "<user_id>",
          "username": "testuser",
          "email": "test@example.com",
          "role": "user",
          "isSubscribedToNewsletter": false,
          "token": "<jwt_token>"
        }
        ```

-   **Authenticate user and get token**
    -   `POST /api/users/login`
    -   **Request Body:**
        ```json
        {
          "email": "test@example.com",
          "password": "password123"
        }
        ```
    -   **Success Response (200 OK):**
        ```json
        {
          "_id": "<user_id>",
          "username": "testuser",
          "email": "test@example.com",
          "role": "user",
          "isSubscribedToNewsletter": false,
          "token": "<jwt_token>"
        }
        ```

-   **Get all users (Admin only)**
    -   `GET /api/users`
    -   **Access:** Private (Admin only)
    -   **Success Response (200 OK):**
        ```json
        [
          {
            "_id": "<user_id>",
            "username": "testuser",
            "email": "test@example.com",
            "role": "user",
            "isSubscribedToNewsletter": false
          }
        ]
        ```

### Newsletter Subscription

-   **Toggle newsletter subscription**
    -   `PUT /api/users/newsletter`
    -   **Access:** Private
    -   **Success Response (200 OK):**
        ```json
        {
          "message": "Subscribed to newsletter",
          "isSubscribedToNewsletter": true
        }
        ```
        OR
        ```json
        {
          "message": "Unsubscribed from newsletter",
          "isSubscribedToNewsletter": false
        }
        ```

## Logging

The application uses `winston` for general logging and `morgan` for HTTP request logging. Logs are output to the console and also saved to `error.log` (for errors) and `combined.log` (for all logs) files in the root directory.

## Error Handling

Global error handling middleware is implemented to catch and format errors consistently.
