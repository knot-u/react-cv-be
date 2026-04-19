module.exports = (projectRepository) => async ({ page = 1, limit = 10 }) => {
  return projectRepository.findAll({ page, limit });
};
