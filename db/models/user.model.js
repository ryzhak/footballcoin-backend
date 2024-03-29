const crypto = require('crypto');
const moment = require('moment');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Number,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	accessToken: {
		type: String,
		required: true
	}
});

/**
 * Static methods
 */

/**
 * Available user roles
 */
userSchema.statics.ROLES = {
	ADMIN: 'admin',
	CUSTOMER: 'customer'
};

/**
 * Instance methods
 */

/**
 * Checks that user provided a valid password
 * @param {string} providedPassword Provided password
 * @returns {boolean} Whether password is correct
 */
userSchema.method('hasValidPassword', function(providedPassword) {
	return crypto.createHash('md5').update(providedPassword).digest('hex') == this.password;
});

/**
 * Refreshes user access token
 */
userSchema.method('refreshAccessToken', function() {
	this.accessToken = crypto.randomBytes(32).toString('hex');
	this.save();
});

/**
 * Before validate hook
 */
userSchema.pre('validate', function() {
	if(this.isNew) {
		this.password = crypto.createHash('md5').update(this.password).digest('hex');
		this.createdAt = moment().unix();
		this.accessToken = crypto.randomBytes(32).toString('hex');
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;

