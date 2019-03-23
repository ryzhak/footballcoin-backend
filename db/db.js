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
async function init() {
	connect();
	await createInitialModels();
}

/**
 * Creates initial db data
 */
async function createInitialModels() {
	// create users
	const users = [
		{username: 'user1', password: 'user1', role: User.ROLES.CUSTOMER},
		{username: 'admin1', password: 'admin1', role: User.ROLES.ADMIN}
	];
	for(let user of users) {
		const modelExists = await User.findOne({username: user.username});
		if(!modelExists) {
			let model = new User(user);
			model.save();
		}
	}
	// create news
	const news = [
		{
			caption: 'Condimentum arcu parturient consectetur scelerisque commodo a nam ac dui ac ad quisque vestibulum dui porta vestibulum leo.',
			content: 'Orci lobortis eu taciti ipsum lacus eleifend parturient leo odio tellus in lacus nam duis porta ridiculus. Orci parturient ullamcorper feugiat phasellus sociosqu adipiscing ut a mus cursus parturient ultrices vestibulum hac parturient semper sociis curae vel condimentum proin natoque enim ante per et proin. Massa mauris himenaeos adipiscing pulvinar facilisi primis magnis enim eget vestibulum ligula justo nec dis leo dictumst a a. Adipiscing ac a bibendum mus consectetur a lacinia vehicula mi nec a scelerisque quis hendrerit. Nisi ut vel scelerisque sagittis adipiscing imperdiet sit sapien magnis mus phasellus hendrerit iaculis ad duis tristique elementum mus ultricies ut parturient adipiscing semper parturient. Quis fermentum sociosqu habitant purus eu condimentum per conubia mi hendrerit tincidunt sodales metus lorem parturient iaculis feugiat venenatis id a aptent a condimentum hendrerit eu hendrerit aenean praesent. Et nam platea ridiculus cursus natoque parturient interdum dui rutrum tellus ullamcorper laoreet tempus curabitur elit. Mi a dui a natoque a condimentum aliquam id ridiculus a a hendrerit id egestas tincidunt porta porta commodo a a per sem lobortis. Ullamcorper suspendisse gravida parturient placerat consequat mi fringilla condimentum risus vehicula ullamcorper consequat dapibus consectetur urna curae commodo vestibulum parturient parturient per nisi. Parturient facilisis a eleifend volutpat placerat montes tempus aenean mollis cum consectetur cursus non porttitor condimentum mi adipiscing a condimentum facilisi cum fringilla a elementum est dui. A nunc vestibulum morbi elit at cum tristique risus a tortor purus sem lacinia consectetur parturient proin parturient nibh interdum lorem. Elementum dis odio augue a nibh molestie at a est a lorem ac nibh a per massa a adipiscing. Ultrices dis convallis curae scelerisque sem parturient et ullamcorper euismod convallis sociosqu tempor vestibulum mauris parturient nullam. A leo lacinia dignissim maecenas turpis id rhoncus fringilla phasellus ad pretium id facilisis ad ad parturient et ullamcorper inceptos vestibulum. Condimentum auctor ut etiam volutpat inceptos ullamcorper a facilisis natoque a malesuada commodo et potenti id in in parturient rutrum eu massa donec ipsum pretium cubilia lobortis.'
		},
		{
			caption: 'Convallis enim nostra accumsan consequat porta sem per venenatis penatibus aliquet a parturient ornare dui lectus.',
			content: 'Orci lobortis eu taciti ipsum lacus eleifend parturient leo odio tellus in lacus nam duis porta ridiculus. Orci parturient ullamcorper feugiat phasellus sociosqu adipiscing ut a mus cursus parturient ultrices vestibulum hac parturient semper sociis curae vel condimentum proin natoque enim ante per et proin. Massa mauris himenaeos adipiscing pulvinar facilisi primis magnis enim eget vestibulum ligula justo nec dis leo dictumst a a. Adipiscing ac a bibendum mus consectetur a lacinia vehicula mi nec a scelerisque quis hendrerit. Nisi ut vel scelerisque sagittis adipiscing imperdiet sit sapien magnis mus phasellus hendrerit iaculis ad duis tristique elementum mus ultricies ut parturient adipiscing semper parturient. Quis fermentum sociosqu habitant purus eu condimentum per conubia mi hendrerit tincidunt sodales metus lorem parturient iaculis feugiat venenatis id a aptent a condimentum hendrerit eu hendrerit aenean praesent. Et nam platea ridiculus cursus natoque parturient interdum dui rutrum tellus ullamcorper laoreet tempus curabitur elit. Mi a dui a natoque a condimentum aliquam id ridiculus a a hendrerit id egestas tincidunt porta porta commodo a a per sem lobortis. Ullamcorper suspendisse gravida parturient placerat consequat mi fringilla condimentum risus vehicula ullamcorper consequat dapibus consectetur urna curae commodo vestibulum parturient parturient per nisi. Parturient facilisis a eleifend volutpat placerat montes tempus aenean mollis cum consectetur cursus non porttitor condimentum mi adipiscing a condimentum facilisi cum fringilla a elementum est dui. A nunc vestibulum morbi elit at cum tristique risus a tortor purus sem lacinia consectetur parturient proin parturient nibh interdum lorem. Elementum dis odio augue a nibh molestie at a est a lorem ac nibh a per massa a adipiscing. Ultrices dis convallis curae scelerisque sem parturient et ullamcorper euismod convallis sociosqu tempor vestibulum mauris parturient nullam. A leo lacinia dignissim maecenas turpis id rhoncus fringilla phasellus ad pretium id facilisis ad ad parturient et ullamcorper inceptos vestibulum. Condimentum auctor ut etiam volutpat inceptos ullamcorper a facilisis natoque a malesuada commodo et potenti id in in parturient rutrum eu massa donec ipsum pretium cubilia lobortis.'
		}
	];
	for(let newsItem of news) {
		const modelExists = await News.findOne({caption: newsItem.caption});
		if(!modelExists) {
			let model = new News(newsItem);
			model.save();
		}
	}
	// create players
	const players = [
		{
			name: 'Wojciech',
			surname: 'Szczesny',
			photoName: 'SZCZESNY_501x752.variant200x300.png',
			position: Player.POSITIONS.GK
		},
		{
			name: 'Alex',
			surname: 'Sandro',
			photoName: 'SANDRO_501x752.variant200x300.png',
			position: Player.POSITIONS.LB
		},
		{
			name: 'Martin',
			surname: 'Caceres',
			photoName: 'Caceres_501x752.variant200x300.png',
			position: Player.POSITIONS.CB
		},
		{
			name: 'Giorgio',
			surname: 'Chiellini',
			photoName: 'Chiellini_501x752.variant200x300.png',
			position: Player.POSITIONS.CB
		},
		{
			name: 'Joao',
			surname: 'Cancelo',
			photoName: 'Cancelo_501x752.variant200x300.png',
			position: Player.POSITIONS.RB
		},
		{
			name: 'Miralem',
			surname: 'Pjanic',
			photoName: 'PJANIC_501x752.variant200x300.png',
			position: Player.POSITIONS.CM
		},
		{
			name: 'Sami',
			surname: 'Khedira',
			photoName: 'KHEDIRA_501x752.variant200x300.png',
			position: Player.POSITIONS.CM
		},
		{
			name: 'Blaise',
			surname: 'Matuidi',
			photoName: 'Matuidi_501x752.variant200x300.png',
			position: Player.POSITIONS.CM
		},
		{
			name: 'Cristiano',
			surname: 'Ronaldo',
			photoName: 'RONALDO_501x752.variant200x300.png',
			position: Player.POSITIONS.LM
		},
		{
			name: 'Paulo',
			surname: 'Dybala',
			photoName: 'Dybala_501x752.variant200x300.png',
			position: Player.POSITIONS.ST
		},
		{
			name: 'Federico',
			surname: 'Bernardeschi',
			photoName: 'Bernardeschi_501x752.variant200x300.png',
			position: Player.POSITIONS.RM
		}
	];
	for(let player of players) {
		const modelExists = await Player.findOne({name: player.name, surname: player.surname, position: player.position});
		if(!modelExists) {
			let model = new Player(player);
			model.save();
		}
	}
}

module.exports = {
	init
};

