const express = require('express');
const { createBucket, listBuckets, deleteBucket } = require('../controllers/bucketController');

const router = express.Router();

router.post('/', createBucket);
router.get('/:userId', listBuckets);
router.delete('/:bucketId', deleteBucket);

module.exports = router;
