let database = require("../database");
const fetch = require("node-fetch");
const { json, response } = require("express");

let remindersController = {
  list: async (req, res) => {
    let unsplashUrl = "https://api.unsplash.com/search/photos?query=dog&client_id=m1oAyaxH-pXjJMFBWF9a3EBJ0chMxLzTF8uwGE9jiDg"
    async function getRandomImg(url) {
      const response = await fetch(url)
      return response.json();
    }
    const contents = await getRandomImg(unsplashUrl);
    const randomImgContents = contents.results[0]
    const imgLink = randomImgContents.urls.small
    
    let user = database.userModel.findById(req.user.id)
    res.render("reminder/index", { reminders: user.reminders, image: imgLink });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let user = database.userModel.findById(req.user.id)
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: user.reminders });
    }
  },

  create: (req, res) => {
    let user = database.userModel.findById(req.user.id)
    let reminder = {
      id: user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    user.reminders.push(reminder);
    database.userModel.updateDatabase(user)
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let user = database.userModel.findById(req.user.id)
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    if (req.body.completed == "true") {
      completed = true;
    } else if (req.body.completed == "false") {
      completed = false;
    } else {
      completed = false;
    }

    newReminder = {
      id: parseInt(req.params.id),
      title: req.body.title,
      description: req.body.description,
      completed: completed,
    };

    let user = database.userModel.findById(req.user.id)
    index = 0
    for (let reminder of user.reminders) {
      if (reminder.id === parseInt(req.params.id)) {
        user.reminders[index] = newReminder;
      };
      index += 1;
    };
    database.userModel.updateDatabase(user)
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let user = database.userModel.findById(req.user.id)
    index = 0
    for (let reminder of user.reminders) {
      if (reminder.id === parseInt(req.params.id)) {
        user.reminders.splice(index, 1);
      };
      index += 1;
    };
    database.userModel.updateDatabase(user)
    res.redirect("/reminders");
  }
};



module.exports = remindersController;
