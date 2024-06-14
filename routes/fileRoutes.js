const express = require('express');
const { uploadFile, getFile, listFiles, deleteFile } = require('../controllers/fileController');
const { upload } = require('../services/fileService');

const router = express.Router();

router.post('/upload/:bucketId', upload.single('file'), uploadFile);
router.get('/:fileId', getFile);
router.get('/bucket/:bucketId', listFiles);
router.delete('/:fileId', deleteFile);

module.exports = router;
