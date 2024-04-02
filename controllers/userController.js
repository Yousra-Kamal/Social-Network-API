const { User, Thought } = require("../models");

// Export the user controller
module.exports = {
  //  Get all users
  async getAllUsers(req, res) {
    try {
      // Find all users
      const userData = await User.find({});
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //  Get one user by ID
  async getUserById(req, res) {
    try {
      // Find user by ID and populate thoughts and friends data
      const userData = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        // Exclude __v field
        .select("-__v");
      // If no user is found, return an error message
      if (!userData) {
        return res.status(404).json({ message: "No User found with that ID!" });
      } else {
        res.json(userData);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a user
  async createUser(req, res) {
    try {
      // Create a new user with req.body
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update user by ID
  async updateUser(req, res) {
    try {
      // Find user by ID and update with req.body
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      // If no user is found, return an error message
      if (!userData) {
        return res.status(404).json({ message: "No User found with that ID!" });
      } else {
        res.json(userData);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete user by ID
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });
      // If no user is found, return an error message
      if (!userData) {
        return res.status(404).json({ message: "No User found with that ID!" });
      } else {
        // Bonus // Delete all thoughts associated with the user
        await Thought.deleteMany({ _id: { $in: userData.thoughts } });
        res.json({ message: "User and User's Thoughts deleted!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add friend to user's friend list
  async addFriend(req, res) {
    try {
      // Find user by ID and add friend to friends array
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        // $addToSet add elements to an array field in a MongoDB document
        // if they are not already present, in which case $addToSet does nothing to that array.
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      // If no user is found, return an error message
      if (!userData) {
        return res.status(404).json({ message: "User not found!" });
      } else {
        res.json(userData);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete friend from user's friend list
  async deleteFriend(req, res) {
    try {
      // Find user by ID and delete friend from friends array
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        // $pull operator removes from an existing array all instances of a value or values that match a specified condition.
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      // If no user is found, return an error message
      if (!userData) {
        return res.status(404).json({ message: "No User found with this ID!" });
      } else {
        res.json(userData);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
