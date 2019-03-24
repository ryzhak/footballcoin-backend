const express = require('express');

const User = require('../db/models/user.model');

const userRoutes = express.Router();

/**
 * Login user by username and password
 */
userRoutes.route('/login').post(async (req, res, next) => {
	try {
		const user = await User.findOne({username: req.body.login});
		// user and password validation
		if(!user || !user.hasValidPassword(req.body.password)) {
			res.status(404).send({error: 'User not found'});
		} else {
			// refresh token and return user
			user.refreshAccessToken();
			res.send(user);
		}
	} catch (err) {
		next(err);
	}
});

/**
 * Registers a new user
 */
userRoutes.route('/register').post(async (req, res, next) => {
	try {
		// check that user with such username does not exist
		let user = await User.findOne({username: req.body.username});
		if(user) {
			res.status(400).send({error: 'User exists'});
		} else {
			// create a new user
			user = new User({username: req.body.username, password: req.body.password, role: User.ROLES.CUSTOMER});
			await user.save();
			res.send(user);
		}
	} catch (err) {
		next(err);
	}
});

module.exports = userRoutes;

