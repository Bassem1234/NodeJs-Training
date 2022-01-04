const User = require("../models/userSchema")
const passport = require('passport');
const jwt = require('jsonwebtoken');
const BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new BearerStrategy(

    async (token, done) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            if (!user) {
                return done(null, false);
            }
            else {
                return done(null, user, {scope: 'all'});
            }
            
        }
        catch (err) {
            console.log(err);
            return done(null, false); 
        }
    }
));
