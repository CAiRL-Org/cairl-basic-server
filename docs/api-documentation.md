# API Documentation

## Base URL

All API endpoints are prefixed with `/api`.

## Authentication

Most endpoints require authentication using JWT (JSON Web Token). To authenticate, include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

You can obtain a token by logging in with a valid user account.

## Error Handling

All errors return a JSON response with a `message` field describing the error. In development mode, errors also include a `stack` field with the stack trace.

Example error response:

```json
{
  "message": "Not Found - /api/invalid-endpoint",
  "stack": "Error: Not Found - /api/invalid-endpoint\n    at notFound (/app/src/middleware/errorMiddleware.ts:4:17)\n    ..."
}
```

In production mode, the `stack` field is omitted for security reasons.

## Endpoints

### User Management

#### Register a new user

- **URL**: `/api/users`
- **Method**: `POST`
- **Auth required**: No
- **Request Body**:

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

- **Success Response**:
  - **Code**: 201 Created
  - **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "username": "testuser",
  "email": "test@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Auth required**: No
- **Request Body**:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

- **Success Response**:
  - **Code**: 200 OK
  - **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "username": "testuser",
  "email": "test@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get User Profile

- **URL**: `/api/users/profile`
- **Method**: `GET`
- **Auth required**: Yes
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "username": "testuser",
  "email": "test@example.com"
}
```

#### Update User Profile

- **URL**: `/api/users/profile`
- **Method**: `PUT`
- **Auth required**: Yes
- **Request Body**:

```json
{
  "username": "updatedusername",
  "email": "updated@example.com",
  "password": "newpassword123"
}
```

- **Success Response**:
  - **Code**: 200 OK
  - **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "username": "updatedusername",
  "email": "updated@example.com"
}
```

### Webinars

#### Get All Webinars

- **URL**: `/api/webinars`
- **Method**: `GET`
- **Auth required**: No
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:

```json
[
  {
    "_id": "60d21b4667d0d8992e610c86",
    "title": "Introduction to TypeScript",
    "description": "Learn the basics of TypeScript",
    "date": "2023-06-15T14:00:00.000Z",
    "duration": 60,
    "presenter": "John Doe"
  },
  {
    "_id": "60d21b4667d0d8992e610c87",
    "title": "Advanced React Patterns",
    "description": "Explore advanced patterns in React",
    "date": "2023-06-20T15:00:00.000Z",
    "duration": 90,
    "presenter": "Jane Smith"
  }
]
```

#### Get Webinar by ID

- **URL**: `/api/webinars/:id`
- **Method**: `GET`
- **Auth required**: No
- **URL Parameters**: `id=[string]` where `id` is the MongoDB ID of the webinar
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c86",
  "title": "Introduction to TypeScript",
  "description": "Learn the basics of TypeScript",
  "date": "2023-06-15T14:00:00.000Z",
  "duration": 60,
  "presenter": "John Doe"
}
```

#### Create Webinar

- **URL**: `/api/webinars`
- **Method**: `POST`
- **Auth required**: Yes (Admin only)
- **Request Body**:

```json
{
  "title": "Introduction to TypeScript",
  "description": "Learn the basics of TypeScript",
  "date": "2023-06-15T14:00:00.000Z",
  "duration": 60,
  "presenter": "John Doe"
}
```

- **Success Response**:
  - **Code**: 201 Created
  - **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c86",
  "title": "Introduction to TypeScript",
  "description": "Learn the basics of TypeScript",
  "date": "2023-06-15T14:00:00.000Z",
  "duration": 60,
  "presenter": "John Doe"
}
```

#### Update Webinar

- **URL**: `/api/webinars/:id`
- **Method**: `PUT`
- **Auth required**: Yes (Admin only)
- **URL Parameters**: `id=[string]` where `id` is the MongoDB ID of the webinar
- **Request Body**:

```json
{
  "title": "Updated TypeScript Introduction",
  "description": "Updated description",
  "date": "2023-06-16T14:00:00.000Z",
  "duration": 75,
  "presenter": "John Doe"
}
```

- **Success Response**:
  - **Code**: 200 OK
  - **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c86",
  "title": "Updated TypeScript Introduction",
  "description": "Updated description",
  "date": "2023-06-16T14:00:00.000Z",
  "duration": 75,
  "presenter": "John Doe"
}
```

#### Delete Webinar

- **URL**: `/api/webinars/:id`
- **Method**: `DELETE`
- **Auth required**: Yes (Admin only)
- **URL Parameters**: `id=[string]` where `id` is the MongoDB ID of the webinar
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:

```json
{
  "message": "Webinar removed"
}
```

### Newsletter

#### Subscribe to Newsletter

- **URL**: `/api/newsletter/subscribe`
- **Method**: `POST`
- **Auth required**: No
- **Request Body**:

```json
{
  "email": "subscriber@example.com",
  "name": "John Subscriber"
}
```

- **Success Response**:
  - **Code**: 201 Created
  - **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c88",
  "email": "subscriber@example.com",
  "name": "John Subscriber",
  "subscribed": true,
  "subscribedAt": "2023-06-10T12:00:00.000Z"
}
```

#### Unsubscribe from Newsletter

- **URL**: `/api/newsletter/unsubscribe`
- **Method**: `POST`
- **Auth required**: No
- **Request Body**:

```json
{
  "email": "subscriber@example.com"
}
```

- **Success Response**:
  - **Code**: 200 OK
  - **Content**:

```json
{
  "message": "Successfully unsubscribed"
}
```

### Upcoming Webinars

#### Get All Upcoming Webinars

- **URL**: `/api/upcoming-webinars`
- **Method**: `GET`
- **Auth required**: No
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:

```json
[
  {
    "_id": "60d21b4667d0d8992e610c89",
    "title": "Future of AI",
    "description": "Exploring the future of artificial intelligence",
    "tentativeDate": "2023-07-15T14:00:00.000Z",
    "estimatedDuration": 60,
    "potentialPresenters": ["Dr. Smith", "Prof. Johnson"]
  }
]
```

## Rate Limiting

To prevent abuse, the API implements rate limiting. If you exceed the rate limit, you'll receive a 429 Too Many Requests response.

## Pagination

Endpoints that return lists of items support pagination using the following query parameters:

- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 10, max: 100)

Example:

```
GET /api/webinars?page=2&limit=20
```

The response includes pagination metadata:

```json
{
  "items": [...],
  "pagination": {
    "totalItems": 45,
    "totalPages": 3,
    "currentPage": 2,
    "limit": 20
  }
}
```