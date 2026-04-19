const ProjectRepository = require('../../domain/repositories/ProjectRepository');
const ProjectModel = require('../database/models/ProjectModel');
const { isDatabaseConfigured } = require('../database/mongo');

class MongoProjectRepository extends ProjectRepository {
  async findAll({ page, limit }) {
    if (!isDatabaseConfigured()) {
      return {
        items: [],
        page,
        limit,
        total: 0,
        hasNext: false
      };
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      ProjectModel.find({}, 'title description techStack imageUrl githubUrl liveUrl createdAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ProjectModel.countDocuments()
    ]);

    return {
      items,
      page,
      limit,
      total,
      hasNext: page * limit < total
    };
  }

  async findById(id) {
    if (!isDatabaseConfigured()) {
      return null;
    }

    return ProjectModel.findById(id, 'title description techStack imageUrl githubUrl liveUrl createdAt').lean();
  }

  async create(payload) {
    if (!isDatabaseConfigured()) {
      const error = new Error('Database is not configured');
      error.statusCode = 503;
      throw error;
    }

    const document = await ProjectModel.create(payload);
    return document.toObject();
  }

  async deleteById(id) {
    if (!isDatabaseConfigured()) {
      const error = new Error('Database is not configured');
      error.statusCode = 503;
      throw error;
    }

    const deleted = await ProjectModel.findByIdAndDelete(id);
    return Boolean(deleted);
  }
}

module.exports = MongoProjectRepository;
