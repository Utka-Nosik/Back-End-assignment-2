const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/', itemController.getAllItems);
router.get('/:id', async (req, res) => {}); 

router.post('/', authenticate, authorizeAdmin, itemController.createItem);
router.put('/:id', authenticate, authorizeAdmin, itemController.updateItem);
router.delete('/:id', authenticate, authorizeAdmin, itemController.deleteItem);

module.exports = router;