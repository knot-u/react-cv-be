---
description: Backend portfolio API rules and project goals
globs:
  - "src/**/*.js"
  - "server.js"
  - "app.js"
alwaysApply: true
---

# Backend-only scope

This repository covers only the backend API for the portfolio and CV platform. The frontend is a separate project and must not be implemented here unless explicitly requested.

## Required stack

- Node.js
- Express.js
- MongoDB via Mongoose

## Mandatory architecture

All code must follow Clean Architecture with strict separation of concerns:

- src/domain: pure business rules and entities
- src/application: use cases that orchestrate domain logic
- src/infrastructure: database, file storage, repository implementations
- src/interfaces: HTTP controllers, routes, and middlewares

### Layer rules

1. Domain
   - No Express, Mongoose, or framework imports
   - Holds entities and business validation

2. Application
   - Contains use cases such as getProjects, createProject, deleteProject
   - Uses repository abstractions only
   - No direct database access

3. Infrastructure
   - Implements Mongo repositories, file storage, and external integrations
   - Can use Mongoose, multer, filesystem, and other libs

4. Interfaces
   - Handles request parsing, input validation, controllers, and routes
   - No business logic or direct database code

## Data model

The system manages only projects, images, and external links.

Project fields:
- title: String
- description: String
- techStack: [String]
- imageUrl: String
- githubUrl: String
- liveUrl: String
- createdAt: Date

## API rules

Expose RESTful endpoints:
- GET /api/projects
- GET /api/projects/:id
- POST /api/projects
- DELETE /api/projects/:id

Requirements:
- Always paginate listing endpoints
- Return consistent JSON responses in the form shown below
- Use centralized error handling
- Never return raw stack traces to clients

{
  "data": [],
  "error": null
}

## Image handling

- Do not store image binaries in MongoDB
- Store files locally in uploads or use public external URLs
- Only persist the image URL or path in the database
- Validate file type and size in the infrastructure layer

## Forbidden patterns

- No business logic in controllers
- No direct DB calls in controllers
- No layer leakage
- No tight coupling
- No dead code
- No console logs in production

## Performance requirements

- Use pagination for project listing
- Avoid unnecessary fields in list responses
- Index createdAt
- Keep files small and focused

## Project goal

Build a backend API for a modern portfolio and CV application whose frontend lives in another repository. This backend powers a premium frontend experience by exposing paginated project data and media URLs through a clean, maintainable Express API backed by MongoDB Atlas and suitable for free-tier deployment on Render or Railway.

## Backend backlog

- Scaffold the clean architecture structure
- Add MongoDB Atlas connectivity
- Implement the Project model and repository pattern
- Provide paginated project endpoints with metadata
- Add CORS, validation, and centralized error handling
- Add a health endpoint
- Support local image uploads with validation
- Prepare free-tier deployment configuration with environment variables
