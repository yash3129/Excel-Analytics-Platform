const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');
const { uploadFile } = require('../controllers/fileController');

router.post('/upload', auth, upload.single('file'), uploadFile);

module.exports = router;