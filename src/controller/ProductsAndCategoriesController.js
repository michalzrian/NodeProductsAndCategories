const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/category'); // יבוא של מודל הקטגוריה
const Product = require('../models/product'); // יבוא של מודל המוצר
// החזרת כל הקטגוריות ממוינות
router.get('', async (req, res) => {
    try {
        const allcategories = await Category.find();
        res.json(allcategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//    מחזירה קטגוריה לפי קלט
router.get('/:name', async (req, res) => {
    try {
      const category = await Category.findOne({ name: req.params.name });
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (err) {
      console.error('Error fetching category', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
router.post('/:product', async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      res.status(201).json(category);
    } catch (err) {
      console.error('Error adding category', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
router.put('/:id/:name', async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.params.name, { new: true });
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (err) {
      console.error('Error updating category', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
//  מחיקת קטגוריה
router.delete('/:id', async (req, res) => {
    try {
      const category = await Category.findByIdAndRemove(req.params.id);
      if (category) {
        res.json({ message: 'Category deleted successfully' });
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (err) {
      console.error('Error deleting category', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
//  allproduct

// מחזירה את כל המוצרים לפי הקטגוריה שנקלטה ממוינים
router.get('/allproduct/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category }).sort('name');
        res.json(products);
    } catch (error) {
        console.error('Error fetching products', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// מחזירה את המוצר אם קיים
router.get('/:category/:name', async (req, res) => {
    try {
        const product = await Product.findOne({ category: req.params.category, name: req.params.name });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// עדכון מוצר לפי קטגוריה
router.put('/allproduct/:id/:name', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name: req.params.name }, { new: true });
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// מחיקת מוצר
router.delete('/allproduct', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndRemove(req.params.id);
        if (deletedProduct) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// הוספת מוצר
router.post('/allproduct', async (req, res) => {
    try {
        const category = req.params.category;
        const getName = req.params.product;
        const newProduct = new Product({ name: getName, category: category });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding product', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;