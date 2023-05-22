const { Thought, User } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const dbUserData = await User.find({});
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const dbUserData = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");
      if (!dbUserData) {
        return res.status(404).json({ message: "No user was found with this ID" });
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateSingleUser({ params, body }, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        body,
        { runValidators: true }
      );
      if (!dbUserData) {
        return res.status(404).json({ message: "No user was found with this ID" });
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteSingleUser({ params }, res) {
    try {
      const dbUserData = await User.findOneAndDelete({ _id: params.userId });
      if (!dbUserData) {
        return res.status(404).json({ message: "No user was found with this ID" });
      }
      await User.updateMany(
        { _id: { $in: dbUserData.friends } },
        { $pull: { friends: params.id } }
      );
      await Thought.deleteMany({ username: dbUserData.username });
      res.json({ message: "Deleted user, associated friends and thoughts" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );
      if (!dbUserData) {
        return res.status(404).json({ message: "No user was found with this ID" });
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend({ params }, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true, runValidators: true }
      );
      if (!dbUserData) {
        return res.status(404).json({ message: "No user was found with this ID" });
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
