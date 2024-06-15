const { pinFileToIPFS, unpinFileFromIPFS } = require('../services/pinataService');
const File = require('../models/file');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const uploadFile = async (req, res) => {
    try {
        const file = req.file;
        const result = await pinFileToIPFS(file.path);
        
        const newFile = new File({
            name: file.originalname,
            hash: result.IpfsHash,
            bucketId: req.params.bucketId,
        });

        await newFile.save();

        res.status(200).json(newFile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload file', error: error });
    }
};

const getFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);
        if (!file) return res.status(404).json({ message: 'File not found' });

        const pinataGatewayUrl = `http://gateway.pinata.cloud/ipfs/${file.hash}`;

        const response = await axios({
            method: 'get',
            url: pinataGatewayUrl,
            responseType: 'stream'
        });

        response.data.on('error', (error) => {
            console.error('Error in streaming data:', error);
            res.status(500).json({ error: 'Failed to stream file' });
        });

        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get file', error: error });
    }
};

const listFiles = async (req, res) => {
    try {
        const files = await File.find({ bucketId: req.params.bucketId });
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: 'Failed to list files', error: error });
    }
};

const deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);
        if (!file) return res.status(404).json({ error: 'File not found' });
        await unpinFileFromIPFS(file.hash);
        await file.remove();

        res.status(200).json({ message: 'File deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete file', error: error });
    }
};

module.exports = { uploadFile, getFile, listFiles, deleteFile };
