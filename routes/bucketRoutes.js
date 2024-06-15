const express = require('express');
const { createBucket, listBuckets, deleteBucket } = require('../controllers/bucketController');

const router = express.Router();

/**
 * @swagger
 * /api/buckets:
 *   post:
 *     summary: Create a new bucket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               userId:
 *                 type: string
 *             required:
 *               - name
 *               - userId
 *     responses:
 *       201:
 *         description: Bucket created successfully
 *       500:
 *         description: Failed to create bucket
 */

router.post('/', createBucket);

/**
 * @swagger
 * /api/buckets/{userId}:
 *   get:
 *     summary: List all buckets for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Buckets retrieved successfully
 *       500:
 *         description: Failed to list buckets
 */

router.get('/:userId', listBuckets);

/**
 * @swagger
 * /api/buckets/{bucketId}:
 *   delete:
 *     summary: Delete a bucket by ID
 *     parameters:
 *       - in: path
 *         name: bucketId
 *         required: true
 *         schema:
 *           type: string
 *         description: The bucket ID
 *     responses:
 *       200:
 *         description: Bucket deleted successfully
 *       400:
 *         description: Bucket contains files
 *       404:
 *         description: Bucket not found
 *       500:
 *         description: Failed to delete bucket
 */

router.delete('/:bucketId', deleteBucket);

module.exports = router;
