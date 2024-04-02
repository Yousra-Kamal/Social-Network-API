const { User, Thought } = require("../models");

// Export the thought controller
module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought by ID
  async getThoughtsById(req, res) {
    try {
      // Find thought by ID
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        // Exclude __v field
        .select("-__v")
      // If no thought is found, return an error message
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No Thought found with this ID!" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a thought
  async createThought(req, res) {
    try {
      // Create a new thought with req.body
      const thought = await Thought.create(req.body);
      // Find user by ID and update with new thought
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        // Push the new thought's _id to the user's thoughts array
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      // If no user is found, return an error message
      if (!user) {
        return res.status(404).json({ message: "No User found with this ID!" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update thought by ID
  async updateThought(req, res) {
    try {
      // Find thought by ID and update with req.body
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        // Update thought with req.body
        { $set: req.body },
        { runValidators: true, new: true }
      );
      // If no thought is found, return an error message
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No Thought found with this ID!" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete thought by ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      // If no thought is found, return an error message
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No Thought found with this ID!" });
      } else {
        // Find user by ID and update with new thought
        const user = await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          // Pull the deleted thought's _id from the user's thoughts array
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
        // If no user is found, return an error message
        if (!user) {
          return res
            .status(404)
            .json({ message: "Thought deleted, but no user found" });
        } else {
          res.json({ message: "Thought successfully deleted" });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a reaction stored in a single thought's reactions array field
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        // Push the new reaction to the reactions array
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      // If no thought is found, return an error message
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID!" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a reaction by ID
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        // Find thought by ID
        { _id: req.params.thoughtId },
        // Pull removes the reaction by reactionId from the reactions array field
        // $pull is a MongoDB operator that removes from an existing array all instances of a value or values that match a specified condition.
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      // If no thought is found, return an error message
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID!" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
