const express = require('express');
const router = express.Router();
const menuController = require('../controller/menuController');


// Menu routes
router.post('/addmenu', menuController.createMenuItem);
router.get('/getmenu', menuController.getAllMenuItems);
router.get('/menu/:id', menuController.getMenuItemById);
router.put('/menu/:id', menuController.updateMenuItem);
router.delete('/menu/:id', menuController.deleteMenuItem);

router.get('/getmenu', async (req, res) => {
    try {
        const { category } = req.query; // category is passed as a query parameter

        // If category is provided, filter the data by category
        const query = category ? { category } : {}; // If no category, fetch all

        const menuItems = await Menu.find(query); // Retrieve menu items based on filter
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});




// Order routes
router.post('/addorder', menuController.addOrder );
router.get('/getorder', menuController.getAllOrders);
router.get('/order/:id', menuController.getOrderById);
router.put('/order/:id', menuController.updateOrder);
router.delete('/order/:id', menuController.deleteOrder);


module.exports = router;