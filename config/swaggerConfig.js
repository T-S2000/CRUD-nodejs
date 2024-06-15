const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'File Management API',
            version: '1.0.0',
            description: 'API for managing files and buckets with Pinata and MongoDB',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
    },
    apis: ['./routes/*'], // Adjust the path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;