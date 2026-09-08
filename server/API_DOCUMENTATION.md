# API Documentation

## Auth

### Register
- **Method:** POST
- **Endpoint:** `/api/auth/register`
- **Authentication:** Public
- **Request Body:** `{ name, email, password, college, department }`
- **Success:** 201 Created
- **Error:** 400 Bad Request, 409 Conflict

### Login
- **Method:** POST
- **Endpoint:** `/api/auth/login`
- **Authentication:** Public
- **Request Body:** `{ email, password }`
- **Success:** 200 OK
- **Error:** 400 Bad Request, 401 Unauthorized

## Users

### Get Profile
- **Method:** GET
- **Endpoint:** `/api/users/me`
- **Authentication:** Required (Bearer Token)
- **Success:** 200 OK
- **Error:** 401 Unauthorized

## Events

### Create Event
- **Method:** POST
- **Endpoint:** `/api/events`
- **Authentication:** Required
- **Request Body:** `{ title, description, college, category, date, venue }`
- **Success:** 201 Created

### Get All Events
- **Method:** GET
- **Endpoint:** `/api/events`
- **Authentication:** Public
- **Success:** 200 OK

### Get Single Event
- **Method:** GET
- **Endpoint:** `/api/events/:id`
- **Authentication:** Public
- **Success:** 200 OK
- **Error:** 404 Not Found, 400 Bad Request

### Update Event
- **Method:** PUT
- **Endpoint:** `/api/events/:id`
- **Authentication:** Required (Creator only)
- **Request Body:** `{ title, description, college, category, date, venue }`
- **Success:** 200 OK
- **Error:** 403 Forbidden, 404 Not Found

### Delete Event
- **Method:** DELETE
- **Endpoint:** `/api/events/:id`
- **Authentication:** Required (Creator only)
- **Success:** 200 OK
- **Error:** 403 Forbidden, 404 Not Found

### Search Events
- **Method:** GET
- **Endpoint:** `/api/events/search`
- **Authentication:** Public
- **Query Parameters:** `college`, `category`, `date`
- **Success:** 200 OK

## Registrations

### Register for Event
- **Method:** POST
- **Endpoint:** `/api/events/:id/register`
- **Authentication:** Required
- **Success:** 201 Created
- **Error:** 404 Not Found, 409 Conflict

### Get Event Registrations
- **Method:** GET
- **Endpoint:** `/api/events/:id/registrations`
- **Authentication:** Required (Creator only)
- **Success:** 200 OK
- **Error:** 403 Forbidden, 404 Not Found
