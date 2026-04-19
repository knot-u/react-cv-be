module.exports = (projectRepository) => async (id) => {
  const deleted = await projectRepository.deleteById(id);

  if (!deleted) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }

  return { deleted: true, id };
};
