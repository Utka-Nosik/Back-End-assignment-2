const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

router.post('/', authenticate, authorizeAdmin, categoryController.createCategory);

router.put('/:id', authenticate, authorizeAdmin, categoryController.updateCategory);

router.delete('/:id', authenticate, authorizeAdmin, categoryController.deleteCategory);

module.exports = router;