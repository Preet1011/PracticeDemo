import express from 'express';
import multer from 'multer';
import csv from 'csvtojson';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();


const upload = multer({ storage: multer.memoryStorage() });

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const allUsers = await User.find().select('-password');
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
});

router.post('/add', requireAuth, async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    const user = new User({
      name,
      email,
      password, 
      role: role || 'user'
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});


router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { name, email, role } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
});


router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const removed = await User.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    next(err);
  }
});

router.post('/uploadcsv', requireAuth, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a CSV file.' });
    }

    const rawCSV = req.file.buffer.toString();
    const csvUsers = await csv().fromString(rawCSV);

    const validUsers = [];

    for (const item of csvUsers) {
      const { name, email, password, role } = item;

      if (!name || !email || !password) continue;

      const exists = await User.findOne({ email });
      if (exists) continue;

      validUsers.push({
        name,
        email,
        password, 
        role: role || 'user'
      });
    }

    if (validUsers.length === 0) {
      return res.status(400).json({ message: 'No valid users found in CSV.' });
    }

    const createdUsers = await User.insertMany(validUsers);

    res.status(201).json({
      message: `${createdUsers.length} users uploaded successfully.`,
      users: createdUsers.map(u => ({
        id: u._id,
        name: u.name,
        email: u.email,
        role: u.role
      }))
    });

  } catch (err) {
    next(err);
  }
});

export default router;
