const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();
const bucketRoutes = require('./routes/bucketRoutes');
const fileRoutes = require('./routes/fileRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swaggerConfig');

const app = express();

const port = process.env.PORT;

//connect to database
connectDB();

//Middleware
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

//Routes
app.use('/api/buckets', bucketRoutes);
app.use('/api/files', fileRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });



