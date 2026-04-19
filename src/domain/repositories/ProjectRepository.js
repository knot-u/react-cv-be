class ProjectRepository {
  async findAll() {
    throw new Error('findAll must be implemented');
  }

  async findById() {
    throw new Error('findById must be implemented');
  }

  async create() {
    throw new Error('create must be implemented');
  }

  async deleteById() {
    throw new Error('deleteById must be implemented');
  }
}

module.exports = ProjectRepository;
