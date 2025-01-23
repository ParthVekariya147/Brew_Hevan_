// const Inventory = require('../model/Inventory');

// exports.createItem = async (req, res) => {
//     try {
//         const newItem = new Inventory(req.body);
//         await newItem.save();
//         res.status(201).json(newItem);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// exports.getItems = async (req, res) => {
//     try {
//         const items = await Inventory.find();
//         res.status(200).json(items);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// exports.getItem = async (req, res) => {
//     try {
//         const item = await Inventory.findById(req.params.id);
//         if (!item) {
//             return res.status(404).json({ error: 'Item not found' });
//         }
//         res.status(200).json(item);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// exports.updateItem = async (req, res) => {
//     try {
//         const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//         if (!item) {
//             return res.status(404).json({ error: 'Item not found' });
//         }
//         res.status(200).json(item);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// exports.deleteItem = async (req, res) => {
//     try {
//         const item = await Inventory.findByIdAndDelete(req.params.id);
//         if (!item) {
//             return res.status(404).json({ error: 'Item not found' });
//         }
//         res.status(200).json({ message: 'Item deleted successfully' });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };