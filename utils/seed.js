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
        username: 'somayyah',
        email: 'somayyah@gmail.com'
      },
      {
        username: 'sam',
        email: 'sam@gmail.com'
      }
    ];

    const thoughts = [
      {
        thoughtText: 'hiiiii...',
        username: 'chris'
      },
      {
        thoughtText: 'Helloooo...',
        username: 'Jack'
      }
    ];

    await User.insertMany(users);
    await Thought.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding is completed!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
