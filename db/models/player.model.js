const moment = require('moment');
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
	position: {
		type: String,
		required: true
	},
	desc: {
		type: String
	},
	createdAt: {
		type: Number,
		required: true
	}
});

/**
 * Available player positions
 */
playerSchema.statics.POSITIONS = {
	GK: 'GK',
	LB: 'LB',
	CB: 'CB',
	RB: 'RB',
	LM: 'LM',
	CM: 'CM',
	RM: 'RM',
	ST: 'ST'
};

/**
 * Before validate hook
 */
playerSchema.pre('validate', function() {
	if(this.isNew) {
		this.createdAt = moment().unix();
	}
});


const Player = mongoose.model('Player', playerSchema);

module.exports = Player;

