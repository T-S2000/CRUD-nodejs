const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const dotenv = require('dotenv');
const { emptyDirectory } = require('../helpers/helper');

dotenv.config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_SECRET_API_KEY;

const pinFileToIPFS = async (filePath) => {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const options = {
        headers: {
            ...formData.getHeaders(),
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_API_SECRET,
        },
    };

    try {
        const response = await axios.post('http://api.pinata.cloud/pinning/pinFileToIPFS', formData, options);
        await emptyDirectory();
        return response.data;
    } catch (error) {
        console.error('Error pinning file to IPFS:', error);
        throw error;
    }
};

const unpinFileFromIPFS = async (hash) => {
    try {
        const url = `https://api.pinata.cloud/pinning/unpin/${hash}`;
    
        await axios.delete(url,{
            headers: {
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_API_SECRET,
            }
        })    
    } catch (error) {
        console.log(error);
    }
}

module.exports = { pinFileToIPFS, unpinFileFromIPFS };