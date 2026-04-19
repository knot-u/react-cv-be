const express = require('express');
const { upload } = require('../../infrastructure/storage/imageStorage');
const { validateCreateRequest, listProjects, getProject, create, remove } = require('../controllers/projectController');

const router = express.Router();

router.get('/', listProjects);
router.get('/:id', getProject);
router.post('/', upload.single('image'), validateCreateRequest, create);
router.delete('/:id', remove);

module.exports = router;
