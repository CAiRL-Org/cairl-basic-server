# Deployment Guide

## Overview

This guide covers how to deploy the CAiRL Basic Server to production environments. The application is containerized using Docker, making it easy to deploy to various hosting platforms.

## Prerequisites

- Docker and Docker Compose installed on your server
- A MongoDB instance (either containerized or hosted service like MongoDB Atlas)
- Domain name (optional, but recommended for production)

## Deployment Options

### 1. Docker Deployment (Recommended)

The project includes a Dockerfile and docker-compose.yml for easy deployment.

#### Step 1: Prepare Environment Variables

Create a `.env` file in the project root with your production settings:

```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://mongo:27017/cairl

# For MongoDB authentication (if using the containerized MongoDB)
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=secure_password

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=30d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_app_password
EMAIL_FROM=your_email@gmail.com
```

#### Step 2: Build and Start Containers

```bash
docker-compose up -d
```

This command builds the Docker image and starts the containers in detached mode.

#### Step 3: Verify Deployment

Check if the containers are running:

```bash
docker-compose ps
```

View logs:

```bash
docker-compose logs -f app
```

### 2. Manual Deployment

If you prefer not to use Docker, you can deploy the application manually.

#### Step 1: Build the Application

```bash
npm run build
```

This creates a `dist` directory with the compiled JavaScript code.

#### Step 2: Copy Files to Server

Copy the following files and directories to your server:

- `dist/` directory
- `package.json` and `package-lock.json`
- `.env` file (with production settings)

#### Step 3: Install Dependencies

```bash
npm ci --only=production
```

#### Step 4: Start the Server

You can use a process manager like PM2 to keep the application running:

```bash
npm install -g pm2
pm2 start dist/server.js --name "cairl-server"
```

## Setting Up a Reverse Proxy

For production deployments, it's recommended to use a reverse proxy like Nginx.

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL Configuration

For production, you should enable HTTPS. You can use Let's Encrypt to get a free SSL certificate.

### Using Certbot with Nginx

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Monitoring and Maintenance

### Logs

The application logs are stored in the following files:

- `error.log` - Error logs only
- `combined.log` - All logs

If using Docker, you can view logs with:

```bash
docker-compose logs -f app
```

### Updating the Application

1. Pull the latest changes from your repository
2. Rebuild the Docker image:

```bash
docker-compose build
docker-compose up -d
```

### Backup

Regularly backup your MongoDB database:

```bash
# For containerized MongoDB
docker exec -it cairl-basic-server_mongo_1 mongodump --out /backup

# Copy the backup from the container
docker cp cairl-basic-server_mongo_1:/backup ./backup
```

## Troubleshooting

### Container Won't Start

Check the logs:

```bash
docker-compose logs app
```

Verify environment variables are set correctly in your `.env` file.

### Database Connection Issues

Ensure MongoDB is running and accessible:

```bash
docker-compose logs mongo
```

Check the `MONGO_URI` in your `.env` file.

### Email Sending Issues

See the [Email Configuration Guide](./email-configuration.md) for troubleshooting email issues.