const User = require('../../db/models/user.model');

/**
 * Express middleware to check user role
 */
module.exports = function(role) {
	return async function(req, res, next) {
		// check auth header exists
		if(!req.headers.authorization) return res.status(403).send({error: 'Authorization failed'});
		// check user with token exists
		const accessToken = req.headers.authorization.replace('Bearer ', '');
		const user = await User.findOne({accessToken: accessToken});
		if(!user) return res.status(403).send({error: 'Authorization failed'});
		// check user role
		if(user.role != role) return res.status(403).send({error: 'Authorization failed'});
		next();
	}
};

