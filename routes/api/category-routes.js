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
    const updated = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Fetch the updated category from the database
    const updatedCategory = await Category.findByPk(req.params.id);

    // Send the updated category as a response
    res.json(updatedCategory);
  } catch (error) {
    // If an error occurs during the update process, send a 500 status code along with the error message
    res.status(500).json({ message: 'Update Failed' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const deleted = await Category.destroy({ 
      where: {
        id: req.params.id
      }, 
    });
    // if nothing is deleted return message
    if (!deleted) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    
    res.status(204).json(deleted);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// export
module.exports = router;
