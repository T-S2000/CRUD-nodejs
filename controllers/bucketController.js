const Bucket = require('../models/Bucket');
const File = require('../models/file');

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
        const files = await File.find({bucketId: req.params.bucketId});
        if(files.length > 0) return res.status(400).json({ message: 'Bucket contains files' });
        let bucket = await Bucket.findByIdAndDelete({_id: req.params.bucketId});
        if(bucket == null){
            return res.status(404).json({message: "Bucket not found!"});
        }else{
            return res.status(200).json({ message: 'Bucket deleted Successfully!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete bucket', error: error });
    }
};

module.exports = { createBucket, listBuckets, deleteBucket };
