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
        username: 'frjohned',
        email: 'john@hotmail.com'
      },
      {
        username: 'sam',
        email: 'sam@gmail.com'
      }
    ];

    const thoughts = [
      {
        thoughtText: 'Many, many moons ago...',
        username: 'Kim'
      },
      {
        thoughtText: 'How many times must I...',
        username: 'Chris'
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
