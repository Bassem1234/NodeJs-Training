const User = require("../models/userSchema")
const passport = require('passport');
const jwt = require('jsonwebtoken');
const BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new BearerStrategy(

    async (token, done) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(user.userId);
            if (!user) {
                return done(null, false);
            }
            else {
                return done(null, user, {scope: 'all'});
            }
            User.findOne({ token: token }, (err, user) => {
                if (err) { return done(err); }

            });
        }
        catch (err) {
            console.log(err);
        }
    }
));