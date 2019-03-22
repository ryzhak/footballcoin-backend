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

const News = mongoose.model('News', newsSchema);

module.exports = News;

