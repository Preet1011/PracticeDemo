import express from 'express';
import Product from '../models/Product.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), async (req, res, next) => {
  try {
    const { title, description, price } = req.body; 
    if (!title || !price) {
      return res.status(400).json({ message: 'Title and price are required' });
    }
    const product = await Product.create({
      title,
      description,
      price,
      image: req.file ? req.file.path : undefined,  
    });

    res.status(201).json(product); 
  } catch (err) {
    next(err);
  }
});


router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

export default router;
