# API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

## Words API

### Get Random Word
```http
GET /api/words/random
```

### Get All Words
```http
GET /api/words?page=1&limit=10&category=noun
```

### Get Word by ID
```http
GET /api/words/:id
```

### Create Word (Protected)
```http
POST /api/words
Authorization: Bearer <token>
Content-Type: application/json

{
  "word": "example",
  "category": "noun",
  "definition": "A thing characteristic of its kind"
}
```

### Update Word (Protected)
```http
PUT /api/words/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "word": "updated-example",
  "category": "verb",
  "definition": "Updated definition"
}
```

### Delete Word (Protected)
```http
DELETE /api/words/:id
Authorization: Bearer <token>
```

## Health Check

### Server Status
```http
GET /api/health
```

## Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

- General API: 100 requests per 15 minutes
- Authentication: 5 requests per 15 minutes
- Account Creation: 3 requests per hour








