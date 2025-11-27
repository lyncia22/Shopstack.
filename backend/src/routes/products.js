const express = require('express');
const Product = require('../models/Product');
const verifyFirebaseToken = require('../middleware/auth');
const { LRUCache } = require('lru-cache');

const router = express.Router();
const cache = new LRUCache({ max: 100, ttl: 1000 * 30 }); // 30s cache

// list
router.get('/', async (req, res) => {
  try {
    const key = 'products:all';
    if (cache.has(key)) return res.json(cache.get(key));
    const products = await Product.find().lean();
    cache.set(key, products);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get single
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// create (auth required)
router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const doc = await Product.create(req.body);
    cache.delete('products:all');
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// update
router.put('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const doc = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    cache.delete('products:all');
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// delete
router.delete('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    cache.delete('products:all');
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;