const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all categories and include associated Products
    const categories = await Category.findAll({ 
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value and include associated Products
    const category = await Category.findByPk(req.params.id, { 
      include: [{ model: Product }],
    });

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new category
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a category by its `id` value
    const updated = await Category.update({
      where: {
        id: req.body.id,
      },
    });

    if (!updated) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    const updatedCategory = await Category.findByPk(id);
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const deleted = await Category.destroy({ 
      where: {
        id: req.body.id
      }, 
    });

    if (!deleted) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
