const express = require('express');

const News = require('../db/models/news.model');

const newsRoutes = express.Router();

/**
 * Returns all news
 */
newsRoutes.route('/').get(async (req, res, next) => {
	try {
		const news = await News.find();
    	res.send(news);
	} catch (err) {
		next(err);
	}
});

/**
 * Returns news item by id
 */
newsRoutes.route('/:id').get(async (req, res, next) => {
	try {
		const model = await News.findById(req.params.id);
    	res.send(model);
	} catch (err) {
		next(err);
	}
});

/**
 * Creates a new news item
 */
newsRoutes.route('/').post(async (req, res, next) => {
	try {
		const model = new News(req.body);
		await model.save();
    	res.send(model);
	} catch (err) {
		next(err);
	}
});

/**
 * Updates news item by id
 */
newsRoutes.route('/:id').patch(async (req, res, next) => {
	try {
		const model = await News.findByIdAndUpdate(req.params.id, req.body, {new: true});
    	res.send(model);
	} catch (err) {
		next(err);
	}
});

/**
 * Deletes news item by id
 */
newsRoutes.route('/:id').delete(async (req, res, next) => {
	try {
		await News.findByIdAndDelete(req.params.id);
    	res.send();
	} catch (err) {
		next(err);
	}
});

module.exports = newsRoutes;

