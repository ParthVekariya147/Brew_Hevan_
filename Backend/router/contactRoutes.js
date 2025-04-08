const express = require('express');
const router = express.Router();
const contactController = require("../controller/contactController");

router.post("/contacts", contactController.submitContactForm);
router.get("/getcontacts", contactController.getAllContacts);

module.exports = router;




// 
// 
// const inventoryController = require('../controller/inventoryController');

// router.get('/getinventory', inventoryController.getAllItems);
// router.post('/addinventory', inventoryController.addItem);
// router.put('/inventory/:id', inventoryController.updateItem);
// router.delete('/inventory/:id', inventoryController.deleteItem);

// module.exports = router; 