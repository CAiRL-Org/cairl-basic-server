# CAiRL Basic Server Documentation

## Table of Contents

- [Email Configuration](./email-configuration.md) - How to set up and troubleshoot email functionality
- [API Documentation](./api-documentation.md) - Detailed API endpoints and usage
- [Deployment Guide](./deployment-guide.md) - Instructions for deploying to production

## Getting Started

Refer to the main [README.md](../README.md) file in the project root for installation and basic setup instructions.

## Project Structure

```
├── src/                  # Source code
│   ├── app.ts            # Express app setup
│   ├── server.ts         # Server entry point
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── dist/                 # Compiled JavaScript (generated)
├── docs/                 # Documentation
└── node_modules/         # Dependencies (generated)
```

## Environment Variables

See the `.env.example` file in the project root for all required and optional environment variables.