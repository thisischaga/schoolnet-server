const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const users = [
  {
    name: 'Alice Koffi',
    email: 'alice@schoolnet.tg',
    password: 'password123',
    level: 'université',
    faculty: 'FASEG',
    role: 'student',
    schoolName: 'Université de Lomé',
  },
  {
    name: 'Bob Mensah',
    email: 'bob@schoolnet.tg',
    password: 'password123',
    level: 'université',
    faculty: 'FASEG',
    role: 'student',
    schoolName: 'Université de Lomé',
  },
  {
    name: 'Charlie Doe',
    email: 'charlie@schoolnet.tg',
    password: 'password123',
    level: 'université',
    faculty: 'Droit',
    role: 'student',
    schoolName: 'Université de Lomé',
  },
  {
    name: 'David Lawson',
    email: 'david@schoolnet.tg',
    password: 'password123',
    level: 'lycée',
    role: 'student',
    schoolName: 'Lycée de Tokoin',
  },
  {
    name: 'Emma Watson',
    email: 'emma@schoolnet.tg',
    password: 'password123',
    level: 'université',
    faculty: 'Médecine',
    role: 'student',
    schoolName: 'Université de Lomé',
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/schoolnet');
    console.log('Connected to MongoDB');

    // Check if users already exist to avoid duplicates
    for (const u of users) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await User.create(u);
        console.log(`User created: ${u.name}`);
      } else {
        console.log(`User already exists: ${u.name}`);
      }
    }

    console.log('User seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedUsers();
