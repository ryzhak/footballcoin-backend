const bodyParser = require('body-parser');
const express = require('express');

const newsRoute = require('./api/news.route');
const config = require('./config');
const db = require('./db/db');

const app = express();

// init db
db.init();

// user express middleware
app.use(bodyParser.json());

// apply api routes
app.use('/news', newsRoute);

// global error handler
app.use((err, req, res, next) => {
	res.status(500).send({error: err.toString()});
});

// start server
app.listen(config.SERVER_PORT, () => {
	console.log('football coin backend is running on port:', config.SERVER_PORT);
});

