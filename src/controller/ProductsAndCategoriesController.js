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
//     const sortCategory = categories.toSorted((a, b) => { 
//         return a.name.localeCompare(b.name); 
//       }); 
//     res.json(sortCategory);
//    });
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
// router.get('/:name', (req, res) => {
//     const getName = req.params.name.toLowerCase();
//     const findCategory = categories.find((c) => c.name.toLowerCase() === getName);

//     if (findCategory) {
//         res.json(`Details of Category ${findCategory.name}`);
//     } else {
//         res.json(`Category ${getName} not found`);
//     }
// });
// הוספת קטגוריה
// router.post('/:product', (req, res) => {

//     const getName = req.params.product;
//     console.log(getName)
//     const newProduct = { id: categories.length + 1, name: getName };
//     save(newProduct);
// });
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
// עדכון קטגוריה
// router.put('/:id/:name', (req, res) => {
//     const id = parseInt(req.params.id);
//     const name = req.params.name;
//     const findCategory = categories.find((c) => c.id === id);
//     if (findCategory) {
//         findCategory.name = name;
//         res.json(`put of Category ${findCategory.id}`);
//     } else {
//         res.json(`Category ${id} not found`);
//     }
// });
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
// router.delete('/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const findCategory = categories.find((c) => c.id === id);
//     if (findCategory) {
//         categories.splice(findCategory, 1);
//     }


//     categories.forEach(element => {
//         console.log(element.name)
//     });
// })
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
// router.get('/allproduct/:category', (req, res) => {
//     const all = [];
//     products.forEach(prod => {
//         if (prod.category === req.params.category)
//             all.push(prod);
//     })
//     const sortCategory = all.toSorted((a, b) => {
//         return a.name.localeCompare(b.name);
//     });
//     res.json(sortCategory);
// });
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
// router.get('/:category/:name', (req, res) => {
//     const category = (req.params.category);
//     const name = req.params.name;
//     const findCategory = products.find((c) => c.category === category && c.name === name);
//     if (findCategory) {
//         res.json(`the product ${findCategory.name} is found!`);
//     } else {
//         res.json(`Category ${findCategory.name} not found`);
//     }
// });
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
// router.put('/allproduct/:id/:name', (req, res) => {
//     const id = parseInt(req.params.id);
//     const name = req.params.name;
//     const findCategory = products.find((c) => c.id === id);
//     if (findCategory) {
//         findCategory.name = name;
//         res.json(`put of Category ${findCategory.id}`);
//     } else {
//         res.json(`Category ${id} not found`);
//     }
// });
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
// router.delete('/allproduct/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const findCategory = products.find((c) => c.id === id);
//     if (findCategory) {
//         products.splice(findCategory, 1);
//     }


//     products.forEach(element => {
//         console.log(element.name)
//     });
// })
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
// router.post('/allproduct/:product/:category', (req, res) => {
//     const category = req.params.category;
//     const getName = req.params.product;
//     if (!(categories.find(c => c.name === category)))
//         res.send("this category not found!")
//     else {
//         const newProduct = { id: products.length + 1, name: getName, category: category };
//         // products.push(newProduct);
//         saveP(newProduct);

//     }

//     products.forEach(element => {
//         console.log(element.name)
//     });
// })

module.exports = router;