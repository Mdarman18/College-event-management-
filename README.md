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
```bash
npm run dev
```

## Frontend Setup
```bash
cd client
npm install
npm run dev
```

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
