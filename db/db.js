const mongoose = require('mongoose');

const config = require('../config');

// require all models so that all of them are available on app start
const News = require('./models/news.model');
const Player = require('./models/player.model');
const User = require('./models/user.model');

/**
 * Connects to DB
 */
function connect() {
	mongoose.connect(config.MONGODB_CONNECTION, {useNewUrlParser: true});
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', () => { console.log('connected to MongoDB'); });
}

/**
 * Initializes DB
 */
function init() {
	connect();
	createInitialModels();
}

/**
 * Creates initial db data
 */
function createInitialModels() {
	// let m = new News({caption: 'caption', content: 'content', createdAt: 2});
	// m.save();
}

module.exports = {
	init
};

