const passport = require("passport")
 , LocalStrategy = require("passport-local").Strategy
 , GitHubStrategy = require("passport-github2").Strategy
const userController = require("../controller/userController");
const GITHUB_CLIENT_ID = "810fca778ccb76bc7ddd"
const GITHUB_CLIENT_SECRET = "0201e0e7e1a475adffa3dfd6877b08d906ac071b"
passport.use(new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
));

passport.use(new GitHubStrategy(
  {
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/github/callback"
  },
  function (accessToken, refreshToken, profile, cb) {
    let user = userController.getUserByGitHubIdOrCreate(profile);
    return cb(null, user);
  }
));


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport;
