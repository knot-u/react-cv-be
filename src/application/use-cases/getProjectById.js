module.exports = (projectRepository) => async (id) => {
  const project = await projectRepository.findById(id);

  if (!project) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }

  return project;
};
