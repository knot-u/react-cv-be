# Portfolio Backend API

## Overview

This repository contains only the backend for a portfolio and CV application. The frontend is a separate project.

The API is built with Node.js, Express.js, and MongoDB via Mongoose, and it follows Clean Architecture so the codebase stays modular, scalable, and easy to evolve.

## Architecture

The backend is organized into four layers:

- src/domain
- src/application
- src/infrastructure
- src/interfaces

Request flow:

Request ? Route ? Controller ? Use Case ? Repository ? Database

## Current features

- REST endpoints for projects
- Pagination support for listing projects
- Health endpoint
- Centralized error handling
- Local image upload support with file validation
- Environment-based MongoDB configuration

## Endpoints

- GET /health
- GET /api/projects?page=1&limit=10
- GET /api/projects/:id
- POST /api/projects
- DELETE /api/projects/:id

## Project model

Each project stores:

- title
- description
- techStack
- imageUrl
- githubUrl
- liveUrl
- createdAt

## Environment setup

Create a local environment file from the example and fill in your values.

## Backend goals

- Keep the API free-tier friendly
- Serve paginated data to a separate frontend app
- Store only image paths or URLs in the database
- Preserve strict layer boundaries
- Stay ready for future admin and auth features

## To-do

### 1. Planning and deployment
- Decide preview and production environment values
- Use Vercel for the frontend and Render or Railway for the backend
- Use MongoDB Atlas for the database

### 2. Backend work
- Finalize clean architecture modules
- Confirm MongoDB Atlas connectivity
- Seed initial project data
- Harden validation and CORS configuration
- Verify deployment health checks

### 3. Assets
- Keep images local in uploads or use public hosted assets
- Optimize image sizes for fast delivery

### 4. Future upgrades
- Add protected admin auth later
- Expand CRUD features when needed
