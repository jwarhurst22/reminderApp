let database = [
    {
      id: 1,
      name: "Jimmy Smith",
      email: "jimmy123@gmail.com",
      password: "jimmy123!",
      reminders: [{
        id: 1,
        title: "hello 123",
        description: "hello",
        completed: false,
      }],
    },
    {
      id: 2,
      name: "Johnny Doe",
      email: "johnny123@gmail.com",
      password: "johnny123!",
      reminders: [],
    },
    {
      id: 3,
      name: "Jonathan Chen",
      email: "jonathan123@gmail.com",
      password: "jonathan123!",
      reminders: [],
    },
  ];
  
  const userModel = {
    findOne: (email) => {
      const user = database.find((user) => user.email === email);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
      const user = database.find((user) => user.id === id);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with id: ${id}`);
    },
    updateDatabase: (user) => {
      index = 0
      let updatedDatabase = []
      for (const currentUser of database) {
        let updatedUser = currentUser
        if (currentUser.id === user.id) {
          updatedUser = user
        }
        updatedDatabase.push(updatedUser)
        index += 1
      }
      database = updatedDatabase
    },
    findGithubUserById: (id) => {
      const user = database.find((user) => user.id === id);
      if (user) {
        return user;
      }
    },
  };
  
  module.exports = { database, userModel };