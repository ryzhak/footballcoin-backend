const bodyParser = require('body-parser');
const express = require('express');

const newsRoute = require('./api/news.route');
const playerRoute = require('./api/player.route');
const userRoute = require('./api/user.route');
const config = require('./config');
const db = require('./db/db');

const app = express();

// init db
db.init();

// use express middleware
app.use(bodyParser.json());
app.use('/assets', express.static('assets'));

// apply api routes
app.use('/news', newsRoute);
app.use('/players', playerRoute);
app.use('/users', userRoute);

// global error handler
app.use((err, req, res, next) => {
	res.status(500).send({error: err.toString()});
});

// default route
app.get('/', (req, res) => {
	res.send('FootballCoin backend')
});

// start server
app.listen(config.SERVER_PORT, () => {
	console.log('football coin backend is running on port:', config.SERVER_PORT);
});

