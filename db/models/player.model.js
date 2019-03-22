const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	photoName: {
		type: String,
		required: true
	},
	photoPath: {
		type: String,
		required: true
	},
	position: {
		type: String,
		required: true
	},
	createdAt: {
		type: Number,
		required: true
	}
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;

