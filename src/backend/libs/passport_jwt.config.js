const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import { User } from '../models/User/user.model';

export default (passport) => {
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = process.env.SECRET_KEY;

	// strategy
	passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
		console.log(jwtPayload);

		User.findOne({ _id: jwtPayload.user._id }) // check the payload in login and use the right name
			.then(user => {
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
					// or you could create a new account
				}
			})
			.catch(err => done(err, false));
	}));
};