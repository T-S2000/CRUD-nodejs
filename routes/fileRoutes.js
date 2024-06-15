const express = require('express');
const { uploadFile, getFile, listFiles, deleteFile } = require('../controllers/fileController');
const { upload } = require('../services/fileService');

const router = express.Router();


/**
 * @swagger
 * /api/files/upload/{bucketId}:
 *   post:
 *     summary: Upload/Update a file
 *     parameters:
 *       - in: path
 *         name: bucketId
 *         required: true
 *         schema:
 *           type: string
 *         description: The bucket ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Failed to upload file
 */

router.post('/upload/:bucketId', upload.single('file'), uploadFile);

/**
 * @swagger
 * /api/files/{fileId}:
 *   get:
 *     summary: Get a file by ID
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *         description: The file ID
 *     responses:
 *       200:
 *         description: File retrieved successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Failed to retrieve file
 */

router.get('/:fileId', getFile);


/**
 * @swagger
 * /api/files/bucket/{bucketId}:
 *   get:
 *     summary: List all files in a bucket
 *     parameters:
 *       - in: path
 *         name: bucketId
 *         required: true
 *         schema:
 *           type: string
 *         description: The bucket ID
 *     responses:
 *       200:
 *         description: Files retrieved successfully
 *       500:
 *         description: Failed to list files
 */

router.get('/bucket/:bucketId', listFiles);

/**
 * @swagger
 * /api/files/{fileId}:
 *   delete:
 *     summary: Delete a file by ID
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *         description: The file ID
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Failed to delete file
 */

router.delete('/:fileId', deleteFile);

module.exports = router;
