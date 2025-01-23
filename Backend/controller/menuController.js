const Menu = require('../model/MenuSchema'); // Import the Menu model
const Order = require('../model/orderModel'); // Import the Order model
// Create a new menu item
exports.createMenuItem = async (req, res) => {
    try {
        const menuItem = new Menu(req.body);
        const savedMenuItem = await menuItem.save();
        res.status(201).json({ success: true, data: savedMenuItem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json({ success: true, data: menuItems });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a menu item by ID
exports.getMenuItemById = async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        res.status(200).json({ success: true, data: menuItem });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
    try {
        const updatedMenuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Ensure validations are run on the update
        });
        if (!updatedMenuItem) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        res.status(200).json({ success: true, data: updatedMenuItem });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    try {
        const deletedMenuItem = await Menu.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        res.status(200).json({ success: true, message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


//crate order

exports.addOrder = async (req, res) => {
    console.log("object order")
    try {
        const order = new Order(req.body);
        const savedOrder = await order.save();
        res.status(201).json({ success: true, data: savedOrder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }   finally {
        console.log("done")
    }
}

// get a order by ID

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update a order
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Ensure validations are run on the update
        });
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a order
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
