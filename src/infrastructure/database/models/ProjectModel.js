const { mongoose } = require('../mongo');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    techStack: {
      type: [String],
      default: []
    },
    imageUrl: {
      type: String,
      default: ''
    },
    githubUrl: {
      type: String,
      default: ''
    },
    liveUrl: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

projectSchema.index({ createdAt: -1 });

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
