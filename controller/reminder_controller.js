let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
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

    index = 0
    for (let reminder of req.user.reminders) {
      if (reminder.id === parseInt(req.params.id)) {
        req.user.reminders[index] = newReminder;
      };
      index += 1;
    };
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    index = 0
    for (let reminder of req.user.reminders) {
      if (reminder.id === parseInt(req.params.id)) {
        req.user.reminders.splice(index, 1);
      };
      index += 1;
    };
    res.redirect("/reminders");
  }
};



module.exports = remindersController;
