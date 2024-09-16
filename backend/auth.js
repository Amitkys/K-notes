const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');  // Import the User model

const GOOGLE_CLIENT_ID = "48121057593-bbbmeb7nrm2a0si114decbnetit58e80.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
  },
  async function(req, accessToken, refreshToken, profile, done) {
    try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });
        // console.log(profile)
        if (!user) {
            // If not, create a new user
            user = new User({
                googleId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                displayName: profile.displayName,
                email: profile.emails[0].value,  // assuming the user has an email, this will reture one email
                email_verified: profile.emails[0].verified,
                provider: profile.provider,
                profilePhoto: profile.photos[0].value // assuming the user has a profile photo
            });
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, false);
    }
});
