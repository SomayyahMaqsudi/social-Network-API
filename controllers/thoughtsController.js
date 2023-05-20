import { User, Thought } from '../models';

export default {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.create(body);
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );
      if (!dbUserData) {
        return res.status(404).json({ message: "No user found with this ID" });
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        body,
        { new: true }
      );
      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({ _id: params.thoughtId });
      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: params.thoughtId } }
      );
      res.status(200).json({ message: `Successfully deleted the thought from user ID ${params.userId}` });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions:  body }},
        { new: true, runValidators: true }
      );
      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought found with this ID" });
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId }}},
        { new: true, runValidators: true }
      );
      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought found with this ID" });
      }
      res.json({ message: "Successfully deleted the reaction" });
    } catch (err) {
    res.status(500).json(err);
  }
},
};
