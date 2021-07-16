const passport = require("../middleware/passport");


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: passport.authenticate("local", {
    successRedirect: "/reminder/index",
    failureRedirect: "auth/login",
    }),

  registerSubmit: (req, res) => {
    // note - don't have to do at the moment.
  },

  githubSubmit: passport.authenticate("github", {
    successRedirect: "/reminder/index",
    failureRedirect: "auth/login",
  }),
};

module.exports = authController;
