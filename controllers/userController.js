// const { Thought } = require('../models');
// const User = require('../models/User');


// module.exports = {

//   getUsers(req, res) {
//     User.find({})
//       .then(dbUserData => res.json(dbUserData))
//       .catch(err => res.status(500).json(err));
//   },
  

//   getSingleUser(req, res) {
//     User.findOne({ _id: req.params.userId })
//     .populate("thoughts")
//     .populate("friends")
//     .select("-__v")
//       .then(dbUserData => {
//         if(!dbUserData) {
//           res.status(404).json({ message: "No user found with this id" });
//           return;
//         }
//         res.json(dbUserData);
//       })
//       .catch(err => res.status(500).json(err));
//   },
  

//   createUser(req, res) {
//     User.create(req.body)
//       .then((dbUserData) => res.json(dbUserData))
//       .catch(err => res.status(500).json(err));
//   },

  

//   updateSingleUser({ params, body }, res)  {
//     User.findOneAndUpdate({ _id: params.userId }, body, { runValidators: true })
//     .then((dbUserData) => {
//       if(!dbUserData) {
//         res.status(404).json({ message: "No user found with this id" });
//         return;
//       }
//       res.json (dbUserData);
//     })
//     .catch(err => res.status(500).json(err));  
//   },


//   deleteSingleUser({ params }, res) {
//     User.findOneAndDelete({ _id: params.userId })
//     .then(dbUserData => {
//       if(!dbUserData) {
//         res.status(404).json ({ message: "No user found with this id" });
//         return;
//       }
//       User.updateMany({ _id: { $in: dbUserData.friends }},
//         { $pull: { friends: params.id } }
//     )
//     .then(() => {
//       Thought.deleteMany({ username: dbUserData.username }) 
//     .then(() => {
//       res.json({ message: "Successfully deleted user, associated friend(s) and associated thought(s)" });
//     })
//     .catch(err => res.status(500).json(err));
//     }) 
//     .catch(err => res.status(500).json(err));    
//     })
//     .catch(err => res.status(500).json(err));
//   },

  

//   addFriend(req, res) {

//     User.findOneAndUpdate(
//       { _id: req.params.userId },
//       { $addToSet: { friends: req.params.friendId }},
//       { new: true, runValidators: true }
//     ) 
//     .then(dbUserData => {
//       if(!dbUserData) {
//         res.status(404).json({ message: "No user found with this Id" })
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch(err => res.status(500).json(err));
//   },


//   deleteFriend({ params}, res) {
//     User.findOneAndUpdate(
//       { _id: params.userId },
//       { $pull: { friends: params.friendId }},
//       { new: true, runValidators: true }
//       )
//       .then(dbUserData => {
//         if(!dbUserData) {
//           res.status(404).json({ message: "No user found with this Id" });
//         return;
//       }
//       res.json(dbUserData);
//     })
//       .catch(err => res.status(500).json(err))
//     },
// };

import { Thought, User } from '../models';

export default {
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
        return res.status(404).json({ message: "No user found with this ID" });
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
        return res.status(404).json({ message: "No user found with this ID" });
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
        return res.status(404).json({ message: "No user found with this ID" });
      }
      await User.updateMany(
        { _id: { $in: dbUserData.friends } },
        { $pull: { friends: params.id } }
      );
      await Thought.deleteMany({ username: dbUserData.username });
      res.json({ message: "Successfully deleted user, associated friend(s) and associated thought(s)" });
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
        return res.status(404).json({ message: "No user found with this ID" });
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
        return res.status(404).json({ message: "No user found with this ID" });
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
