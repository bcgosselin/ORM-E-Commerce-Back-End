const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, { 
      include: [{ model: Product, through: ProductTag }],
    });
    // if no tag return message
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    const [updated] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    //if no tag name updated return message
    if (!updated) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    const updatedTag = await Tag.findByPk(req.params.id);
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    //if no tag to delete return message
    if (!deleteTag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

//export
module.exports = router;
