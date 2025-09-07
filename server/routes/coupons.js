import express from 'express';
import Coupon from '../models/Coupon.js';
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const c = await Coupon.create(req.body);
    res.status(201).json(c);
  } catch (err) { next(err); }
});

router.get('/apply/:code', async (req, res, next) => {
  try {
    const { code } = req.params;

    const c = await Coupon.findOne({ 
      code: code.toUpperCase(), 
      active: true 
    });

    if (!c) return res.status(404).json({ message: 'Coupon not found' });

    if (c.expiresAt && new Date(c.expiresAt) < new Date()) {
      return res.status(400).json({ message: 'Coupon expired' });
    }

    res.json(c);
  } catch (err) {
    next(err);
  }
});


export default router;
