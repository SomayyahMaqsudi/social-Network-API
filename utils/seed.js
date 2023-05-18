// const connection = require('../config/connection');
// const { User, Thought } = require('../models');

// connection.on('error', (err) => err);

// connection.once('open', async () => {
//   console.log('connected');

//   await Thought.deleteMany({});

//   await User.deleteMany({});

//   const users = [
//       {
//           username: "fred",
//           email: "fred@hotmail.com"
//       },
//       {
//           username: "tony",
//           email: "tony@gmail.com"
//       }
//   ];

//   const thoughts = [
//       {
//           thoughtText: "Many, many moons ago...",
//           username: "Steve"
//       },
//       {
//           thoughtText: "How many times must I ...",
//           username: "Linda"
//       }
//   ]

//   await User.collection.insertMany(users);

//   await Thought.collection.insertMany(thoughts);

//   console.table(users);
//   console.table(thoughts);
//   console.info('Seeding complete! 🌱');
//   process.exit(0);
// });


import connection from '../config/connection';
import { User, Thought } from '../models';

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  try {
    await Thought.deleteMany({});
    await User.deleteMany({});

    const users = [
      {
        username: 'fred',
        email: 'fred@hotmail.com'
      },
      {
        username: 'tony',
        email: 'tony@gmail.com'
      }
    ];

    const thoughts = [
      {
        thoughtText: 'Many, many moons ago...',
        username: 'Steve'
      },
      {
        thoughtText: 'How many times must I...',
        username: 'Linda'
      }
    ];

    await User.insertMany(users);
    await Thought.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
