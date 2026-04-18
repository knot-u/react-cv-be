<p align="center"> Scalable, minimal API powering a dynamic portfolio experience. </p> <p align="center"> <img src="https://img.shields.io/badge/Node.js-Backend-0f172a?style=for-the-badge&logo=node.js" /> <img src="https://img.shields.io/badge/Express.js-API-111827?style=for-the-badge" /> <img src="https://img.shields.io/badge/MongoDB-Database-022c22?style=for-the-badge&logo=mongodb" /> <img src="https://img.shields.io/badge/Status-Stable-16a34a?style=for-the-badge" /> </p>
🌐 Overview

This API serves structured project data to a highly interactive frontend.

Designed with simplicity, scalability, and performance in mind.

🧱 Tech Stack
Node.js
Express.js
MongoDB (free tier via MongoDB Atlas)
Mongoose
dotenv
CORS
📁 Architecture
/src
  /controllers
    project.controller.js
  /routes
    project.routes.js
  /models
    project.model.js
  /services
    project.service.js
  /config
    db.js
  /middlewares
    errorHandler.js

server.js
📦 Data Model
Project {
  title: String
  description: String
  techStack: [String]
  imageUrl: String
  githubUrl: String
  liveUrl: String
  createdAt: Date
}
🔌 API Endpoints
Get Projects (Paginated)
GET /api/projects?page=1&limit=10
Get Single Project
GET /api/projects/:id
⚡ Performance Strategy
Pagination (no overfetching)
Indexed queries (createdAt)
Lightweight JSON responses
🖼️ Asset Strategy (Free)
Images are NOT stored in DB
Stored via:
Local /public folder (dev)
GitHub-hosted assets
⚙️ Setup
Clone
git clone https://github.com/your-username/backend-repo.git
cd backend-repo
Install
npm install
Environment

Create .env:

PORT=5000
MONGO_URI=your_mongodb_connection_string
Run
npm run dev
🚀 Deployment (Free)
Backend: Render / Railway (free tier)
Database: MongoDB Atlas (free tier)
CI/CD: GitHub
🔒 Future Roadmap
JWT Authentication
Admin CRUD dashboard
File upload system
Rate limiting & security hardening
Caching layer (optional)
🧠 Philosophy

Minimal backend.
Maximum frontend impact.

This API exists to serve the experience, not dominate it.
