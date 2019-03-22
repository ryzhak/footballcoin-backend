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

const User = mongoose.model('User', userSchema);

module.exports = User;

