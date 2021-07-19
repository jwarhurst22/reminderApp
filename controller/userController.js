const userModel = require("../database").userModel;
const database = require("../database").database;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
};

function getUserByGitHubIdOrCreate(profile) {
  let user = userModel.findGithubUserById(profile.id)
  if (user) {
    return user
  } else {
    let newUser = {
      id: profile.id,
      name: profile._json.name,
      email: profile._json.email,
      password: null,
      reminders: [],
    };
    database.push(newUser)
    return newUser
  };
};


module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGitHubIdOrCreate,
};
