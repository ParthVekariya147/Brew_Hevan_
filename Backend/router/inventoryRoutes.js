const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventoryController');

router.get('/getinventory', inventoryController.getAllItems);
router.post('/addinventory', inventoryController.addItem);
router.put('/inventory/:id', inventoryController.updateItem);
router.delete('/inventory/:id', inventoryController.deleteItem);

module.exports = router; 