const mongoose = require('mongoose');

const MongoProjectRepository = require('../../infrastructure/repositories/mongoProjectRepository');
const makeGetProjects = require('../../application/use-cases/getProjects');
const makeGetProjectById = require('../../application/use-cases/getProjectById');
const makeCreateProject = require('../../application/use-cases/createProject');
const makeDeleteProject = require('../../application/use-cases/deleteProject');
const asyncHandler = require('../middlewares/asyncHandler');

const repository = new MongoProjectRepository();
const getProjects = makeGetProjects(repository);
const getProjectById = makeGetProjectById(repository);
const createProject = makeCreateProject(repository);
const deleteProject = makeDeleteProject(repository);

function parsePositiveInteger(value, fallback, max = 100) {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.min(parsed, max);
}

function normalizeTechStack(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== 'string' || !value.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
}

function validateCreateRequest(req, _res, next) {
  const { title, description } = req.body;

  if (!title || !description) {
    const error = new Error('Title and description are required');
    error.statusCode = 400;
    return next(error);
  }

  return next();
}

const listProjects = asyncHandler(async (req, res) => {
  const page = parsePositiveInteger(req.query.page, 1, 10000);
  const limit = parsePositiveInteger(req.query.limit, 10, 50);
  const result = await getProjects({ page, limit });

  res.status(200).json({
    data: result,
    error: null
  });
});

const getProject = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    const error = new Error('Invalid project id');
    error.statusCode = 400;
    throw error;
  }

  const project = await getProjectById(req.params.id);

  res.status(200).json({
    data: project,
    error: null
  });
});

const create = asyncHandler(async (req, res) => {
  const payload = {
    title: req.body.title,
    description: req.body.description,
    techStack: normalizeTechStack(req.body.techStack),
    imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl,
    githubUrl: req.body.githubUrl,
    liveUrl: req.body.liveUrl
  };

  const createdProject = await createProject(payload);

  res.status(201).json({
    data: createdProject,
    error: null
  });
});

const remove = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    const error = new Error('Invalid project id');
    error.statusCode = 400;
    throw error;
  }

  const result = await deleteProject(req.params.id);

  res.status(200).json({
    data: result,
    error: null
  });
});

module.exports = {
  validateCreateRequest,
  listProjects,
  getProject,
  create,
  remove
};
