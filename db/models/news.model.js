const moment = require('moment');
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
	caption: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	createdAt: {
		type: Number,
		required: true
	}
});

/**
 * Before validate hook
 */
newsSchema.pre('validate', function() {
	if(this.isNew) {
		this.createdAt = moment().unix();
	}
});

const News = mongoose.model('News', newsSchema);

module.exports = News;

