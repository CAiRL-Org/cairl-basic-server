# CAiRL Basic Server

This is a basic Express.js server with TypeScript, MongoDB, user authentication (login/register), and logging. Production-ready with Docker support and comprehensive documentation.

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
- Email notifications using Nodemailer

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

2.  Add the following environment variables (see `.env.example` for a complete list):

    ```
    PORT=5000
    NODE_ENV=development
    MONGO_URI=mongodb://localhost:27017/cairl-basic-server
    JWT_SECRET=supersecretjwtkey
    
    # Email Configuration
    EMAIL_HOST=smtp.gmail.com
    EMAIL_PORT=465
    EMAIL_SECURE=true
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_regular_password
    EMAIL_FROM=noreply@example.com
    ```

    -   `PORT`: The port your server will run on. (e.g., `5000`)
    -   `NODE_ENV`: Set to `development` for local development or `production` for production environment
    -   `MONGO_URI`: Your MongoDB connection string. If you're running MongoDB locally, the provided URI should work. Otherwise, replace it with your MongoDB Atlas or other cloud provider URI.
    -   `JWT_SECRET`: A strong, random string for JWT signing. You can generate one using a tool or just type a long random string.

### Setting up Gmail for Production

If you're using Gmail for sending emails in production, you need to set up an App Password:

1. Go to your Google Account settings at [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if you haven't already
3. After enabling 2-Step Verification, go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" as the app and give it a name (e.g., "CAiRL Server")
5. Google will generate a 16-character password - copy this password
6. Add it to your `.env` file as `EMAIL_APP_PASSWORD`:

```
EMAIL_APP_PASSWORD=your16characterpassword
```

> **Note**: Do not use spaces in the App Password when adding it to your `.env` file.

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

For detailed API documentation, see [API Documentation](./docs/api-documentation.md).

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
        }
        ```

## Deployment

For detailed deployment instructions, see [Deployment Guide](./docs/deployment-guide.md).

### Using Docker

This project includes a Dockerfile and docker-compose.yml for easy deployment:

1. Build and start the containers:

```bash
docker-compose up -d
```

2. To stop the containers:

```bash
docker-compose down
```

## Troubleshooting

### Email Sending Issues

If you encounter issues sending emails in production:

1. Verify that you've set up an App Password correctly for Gmail
2. Check that `EMAIL_APP_PASSWORD` is set in your environment variables
3. Ensure 2-Step Verification is enabled on your Google account
4. Check the server logs for detailed error messages

For detailed email configuration instructions, see [Email Configuration Guide](./docs/email-configuration.md).

## License

ISC

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

## Documentation

Comprehensive documentation is available in the `docs` directory:

- [API Documentation](./docs/api-documentation.md) - Detailed API endpoints and usage
- [Deployment Guide](./docs/deployment-guide.md) - Instructions for deploying to production
- [Email Configuration](./docs/email-configuration.md) - Setting up email functionality
- [Documentation Hub](./docs/README.md) - Central documentation index
