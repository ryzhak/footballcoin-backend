const express = require('express');
const formidableMiddleware = require('express-formidable');
const fs = require('fs');

const Player = require('../db/models/player.model');
const User = require('../db/models/user.model');
const accessMiddleware = require('../lib/middlewares/access-middleware');

const playerRoutes = express.Router();

/**
 * Returns all players
 */
playerRoutes.route('/').get(async (req, res, next) => {
	try {
		const players = await Player.find();
    	res.send(players);
	} catch (err) {
		next(err);
	}
});

/**
 * Returns player by id
 */
playerRoutes.route('/:id').get(async (req, res, next) => {
	try {
		const model = await Player.findById(req.params.id);
    	res.send(model);
	} catch (err) {
		next(err);
	}
});

/**
 * Deletes player by id
 */
playerRoutes.route('/:id')
	.all(accessMiddleware(User.ROLES.ADMIN))
	.delete(async (req, res, next) => {
	try {
		// check model exists
		const model = await Player.findById(req.params.id);
		if(!model) return res.status(404).send();
		// delete photo file
		fs.unlinkSync(`${__dirname}/../assets/players/${model.photoName}`);
		// delete model
		await Player.findByIdAndDelete(req.params.id);
    	res.send();
	} catch (err) {
		next(err);
	}
});

/**
 * Creates a new player
 */
playerRoutes.route('/')
	.all(formidableMiddleware(), accessMiddleware(User.ROLES.ADMIN))
	.post(async (req, res, next) => {
	try {
		const model = new Player({
			name: req.fields.name,
			surname: req.fields.surname,
			position: req.fields.position,
			desc: req.fields.desc,
			createdAt: 0,
			photoName: 'temp'
		});
		// validate model
		const validationErrors = model.validateSync();
		if(validationErrors) {
			res.status(422).send(validationErrors);
		}
		// validate file
		if(Object.keys(req.files).length == 0 || !req.files.photo) {
			res.status(400).send({error: 'No files to upload'});
		}
		// save file
		const photoFile = req.files.photo;
		const newPhotoPath = `${__dirname}/../assets/players/${photoFile.name}`;
		fs.copyFileSync(photoFile.path, newPhotoPath);
		// save model
		model.photoName = photoFile.name;
		await model.save();
		res.send(model);
	} catch (err) {
		next(err);
	}
});

/**
 * Updates player by id
 */
playerRoutes.route('/:id')
	.all(formidableMiddleware(), accessMiddleware(User.ROLES.ADMIN))
	.patch(async (req, res, next) => {
	try {
		const model = await Player.findById(req.params.id);
		// check model exists
		if(!model) res.status(404).send();
		// assign new model properties
		model.name = req.fields.name || model.name;
		model.surname = req.fields.surname || model.surname;
		model.position = req.fields.position || model.position;
		model.desc = req.fields.desc || req.fields.desc === '' ? req.fields.desc : model.desc;
		// validate model
		const validationErrors = model.validateSync();
		if(validationErrors) {
			res.status(422).send(validationErrors);
		}
		// if file exists then upload it
		if(req.files.photo) {
			// delete old file
			fs.unlinkSync(`${__dirname}/../assets/players/${model.photoName}`);
			// save new file
			const photoFile = req.files.photo;
			const newPhotoPath = `${__dirname}/../assets/players/${photoFile.name}`;
			fs.copyFileSync(photoFile.path, newPhotoPath);
		}
		// save model
		model.photoName = req.files.photo ? req.files.photo.name : model.photoName;
		await model.save();
		res.send(model);
	} catch (err) {
		next(err);
	}
});

module.exports = playerRoutes;

