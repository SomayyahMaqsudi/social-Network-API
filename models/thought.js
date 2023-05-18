// const { Schema, model } = require('mongoose');
// const reactionSchema = require('../models/Reaction');
// const moment = require('moment');


// const thoughtSchema = new Schema(
//   {
//     thoughtText: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: 1,
//         maxLength: 280
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now,
//         get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
//     },
//     username: {
//         type: String,
//         required: true,
//     },
//     reactions: [reactionSchema]
//   },
//   { 
//     toJSON: {
//       virtuals: true,
//       getters: true,
//     },
//     id: false,
//   }
// );

// thoughtSchema.virtual('reactionCount').get(function () {
//   return `reactions: ${this.reactions.length}`;
//   });

// const Thought = model('Thought', thoughtSchema);

// //export Thought model
// module.exports = Thought;

import { Schema, model } from 'mongoose';
import moment from 'moment';
import reactionSchema from '../models/Reaction';

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return `reactions: ${this.reactions.length}`;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;
