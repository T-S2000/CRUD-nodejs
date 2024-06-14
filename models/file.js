const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hash: { type: String, required: true },
    bucketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bucket', required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', FileSchema);