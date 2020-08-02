const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db_config');
const apiRouter = require('./routes/apiRouter');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const corsOption = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOption));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// setup mongoose
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.use('/', apiRouter);

app.use(express.json());

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


