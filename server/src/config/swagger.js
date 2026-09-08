const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "College Event Management API",
      version: "1.0.0",
      description: "API documentation for the college Event Management System",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      "/auth/register": {
        post: {
          summary: "Register a new user",
          tags: ["Auth"],
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Sameer Srinath" },
                    email: {
                      type: "string",
                      example: "sameer.srinath@example.com",
                    },
                    password: { type: "string", example: "SecurePassword123" },
                    college: {
                      type: "string",
                      example: "Suresh Gyan Vihar University",
                    },
                    department: { type: "string", example: "CSE" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "User registered successfully" },
            400: { description: "Validation failed" },
            409: { description: "User already exists" },
          },
        },
      },
      "/auth/login": {
        post: {
          summary: "Login user",
          tags: ["Auth"],
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      example: "sameer.srinath@example.com",
                    },
                    password: { type: "string", example: "SecurePassword123" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Login successful" },
            401: { description: "Invalid email or password" },
          },
        },
      },
      "/users/me": {
        get: {
          summary: "Get current user profile",
          tags: ["Users"],
          responses: {
            200: { description: "Successful operation" },
            401: { description: "Not authorized" },
          },
        },
      },
      "/events": {
        get: {
          summary: "Get all events",
          tags: ["Events"],
          security: [],
          responses: {
            200: { description: "Successful operation" },
          },
        },
        post: {
          summary: "Create an event",
          tags: ["Events"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "TechHack Annual Coding Competition",
                    },
                    description: {
                      type: "string",
                      example:
                        "A 24-hour coding hackathon for full-stack developers.",
                    },
                    college: {
                      type: "string",
                      example: "Suresh Gyan Vihar University",
                    },
                    category: { type: "string", example: "Technology" },
                    date: {
                      type: "string",
                      format: "date-time",
                      example: "2026-10-15T10:00:00.000Z",
                    },
                    venue: {
                      type: "string",
                      example: "Main Auditorium, CSE Block",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Event created successfully" },
            400: { description: "Validation failed" },
          },
        },
      },
      "/events/search": {
        get: {
          summary: "Search events",
          tags: ["Events"],
          security: [],
          parameters: [
            {
              name: "college",
              in: "query",
              schema: {
                type: "string",
                example: "Suresh Gyan Vihar University",
              },
            },
            {
              name: "category",
              in: "query",
              schema: { type: "string", example: "Technology" },
            },
            {
              name: "date",
              in: "query",
              schema: { type: "string", format: "date", example: "2026-10-15" },
            },
          ],
          responses: {
            200: { description: "Successful operation" },
          },
        },
      },
      "/events/{id}": {
        get: {
          summary: "Get an event by ID",
          tags: ["Events"],
          security: [],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", example: "64a7f2b1e4b0c123456789ab" },
            },
          ],
          responses: {
            200: { description: "Successful operation" },
            404: { description: "Event not found" },
          },
        },
        put: {
          summary: "Update an event",
          tags: ["Events"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", example: "64a7f2b1e4b0c123456789ab" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "TechHack 2026 (Updated)",
                    },
                    description: {
                      type: "string",
                      example: "Updated schedule and details.",
                    },
                    college: {
                      type: "string",
                      example: "Suresh Gyan Vihar University",
                    },
                    category: { type: "string", example: "Technology" },
                    date: {
                      type: "string",
                      format: "date-time",
                      example: "2026-10-16T10:00:00.000Z",
                    },
                    venue: { type: "string", example: "Auditorium Hall B" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Event updated successfully" },
            403: { description: "User not authorized to update this event" },
            404: { description: "Event not found" },
          },
        },
        delete: {
          summary: "Delete an event",
          tags: ["Events"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", example: "64a7f2b1e4b0c123456789ab" },
            },
          ],
          responses: {
            200: { description: "Event deleted successfully" },
            403: { description: "User not authorized to delete this event" },
            404: { description: "Event not found" },
          },
        },
      },
      "/events/{id}/register": {
        post: {
          summary: "Register for an event",
          tags: ["Registrations"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", example: "64a7f2b1e4b0c123456789ab" },
            },
          ],
          responses: {
            201: { description: "Registered for event successfully" },
            404: { description: "Event not found" },
            409: { description: "Already registered for this event" },
          },
        },
      },
      "/events/{id}/registrations": {
        get: {
          summary: "Get all registrations for an event",
          tags: ["Registrations"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", example: "64a7f2b1e4b0c123456789ab" },
            },
          ],
          responses: {
            200: { description: "Successful operation" },
            403: {
              description:
                "User not authorized to view registrations for this event",
            },
            404: { description: "Event not found" },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
