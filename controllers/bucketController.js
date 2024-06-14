const Bucket = require('../models/Bucket');

const createBucket = async (req, res) => {
    const { name, userId } = req.body;
    try {
        const newBucket = new Bucket({ name, userId });
        await newBucket.save();
        res.status(201).json(newBucket);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create bucket', error: error });
    }
};

const listBuckets = async (req, res) => {
    try {
        const buckets = await Bucket.find({ userId: req.params.userId });
        res.status(200).json(buckets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to list buckets', error: error });
    }
};

const deleteBucket = async (req, res) => {
    try {
        await Bucket.findByIdAndDelete(req.params.bucketId);
        res.status(200).json({ message: 'Bucket deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete bucket', error: error });
    }
};

module.exports = { createBucket, listBuckets, deleteBucket };
