# College Event Management System

## Project Overview
A complete, working, production-quality College Event Management System built using the MERN stack with manual JWT authentication.

## Features
- User registration and login (manual JWT authentication)
- View authenticated profile
- View, search, and filter all college events
- View event details
- Create, update, and delete events (only by the creator)
- Register for events
- View registrations for events created by the user

## Technology Stack
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs
- **Frontend:** React, Vite, React Router DOM, Axios
- **No external services:** No Firebase, No Redux, No Tailwind

## Architecture
```
Request -> Route -> Middleware -> Controller -> Service -> Model -> MongoDB
```

## Folder Structure
```
college-event-management/
├── server/
│   ├── src/
│   ├── package.json
│   └── README.md
└── client/
    ├── src/
    ├── package.json
    └── README.md
```

## Backend Setup
```bash
cd server
npm install
```
Create `.env` file based on `.env.example`.

Required env variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/college_event_management
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

**Login uses JWT:** on `POST /api/auth/login`, the server verifies the submitted password against the stored bcrypt hash, and on success signs a JWT (using `JWT_SECRET`) with the user's id as payload. This token is returned to the client and must be sent as `Authorization: Bearer <token>` on all protected routes, where the auth middleware verifies it before passing the decoded user to the controller.

```bash
npm run dev
```

## Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Event Search & Filter
`GET /api/events` supports search and filtering via query params:

```
GET /api/events?search=hackathon&category=technical&date=2025-03-10&page=1&limit=10
```

| Param      | Type   | Description                                              |
|------------|--------|-----------------------------------------------------------|
| `search`   | string | Case-insensitive match on event `title` and `description` |
| `category` | string | Exact match on event category (e.g. technical, cultural)  |
| `date`     | date   | Filters events on/after the given date                    |
| `page`     | number | Pagination page number (default 1)                        |
| `limit`    | number | Results per page (default 10)                             |

Implementation notes:
- Handled in the events service layer, not the controller, keeping query-building logic separate from request/response handling.
- `search` uses a Mongoose `$or` with `$regex` (case-insensitive) across `title` and `description`; for larger datasets this can be swapped for a MongoDB text index (`$text`) on those fields.
- `category` and `date` are applied as exact/range filters and combined with `$and` alongside the search condition.
- Results are paginated using `.skip()` and `.limit()`, with the total count returned via `Model.countDocuments()` for building pagination on the client.

## MongoDB Setup
- **Local MongoDB**: Run `mongod` and use `mongodb://localhost:27017/college_event_management` as the `MONGO_URI`.
- **MongoDB Atlas**: Replace `MONGO_URI` with your connection string.

## Authentication Flow
Register/Login -> JWT Generated -> Stored in localStorage -> Sent in Authorization header -> Validated by Auth Middleware -> Passed to Protected Controller.

## Error Handling
Centralized error handler catches MongoDB duplicate errors, CastErrors, validation errors, and custom errors thrown from services.

## Security
- `helmet` for security headers
- `cors` configured for specific client URL
- bcrypt for password hashing
- JWT for stateless authentication

## Testing Sequence
1. Register
2. Login
3. Copy JWT
4. Get profile
5. Create event
6. Get all events
7. Get event
8. Update own event
9. Register for event
10. Get registrations
11. Delete event
12. Test unauthorized requests
