class Project {
  constructor({ title, description, techStack = [], imageUrl = '', githubUrl = '', liveUrl = '', createdAt = new Date() }) {
    this.title = typeof title === 'string' ? title.trim() : '';
    this.description = typeof description === 'string' ? description.trim() : '';
    this.techStack = Array.isArray(techStack) ? techStack.map((item) => String(item).trim()).filter(Boolean) : [];
    this.imageUrl = typeof imageUrl === 'string' ? imageUrl.trim() : '';
    this.githubUrl = typeof githubUrl === 'string' ? githubUrl.trim() : '';
    this.liveUrl = typeof liveUrl === 'string' ? liveUrl.trim() : '';
    this.createdAt = createdAt;

    this.validate();
  }

  validate() {
    if (!this.title) {
      const error = new Error('Title is required');
      error.statusCode = 400;
      throw error;
    }

    if (!this.description) {
      const error = new Error('Description is required');
      error.statusCode = 400;
      throw error;
    }

    [this.imageUrl, this.githubUrl, this.liveUrl].forEach((url) => {
      if (url && !Project.isValidUrl(url) && !url.startsWith('/uploads/')) {
        const error = new Error('A provided URL is invalid');
        error.statusCode = 400;
        throw error;
      }
    });
  }

  toJSON() {
    return {
      title: this.title,
      description: this.description,
      techStack: this.techStack,
      imageUrl: this.imageUrl,
      githubUrl: this.githubUrl,
      liveUrl: this.liveUrl,
      createdAt: this.createdAt
    };
  }

  static isValidUrl(value) {
    try {
      const parsedUrl = new URL(value);
      return ['http:', 'https:'].includes(parsedUrl.protocol);
    } catch {
      return false;
    }
  }
}

module.exports = Project;
