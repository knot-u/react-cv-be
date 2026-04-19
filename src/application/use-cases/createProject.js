const Project = require('../../domain/entities/Project');

module.exports = (projectRepository) => async (payload) => {
  const project = new Project(payload);
  return projectRepository.create(project.toJSON());
};
