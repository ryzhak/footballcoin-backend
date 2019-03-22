const bodyParser = require('body-parser');
const express = require('express');

const config = require('./config');
const db = require('./db/db');

const app = express();

// init db
db.init();

// user express middleware
app.use(bodyParser.json());

// start server
app.listen(config.SERVER_PORT, () => {
	console.log('football coin backend is running on port:', config.SERVER_PORT);
});

