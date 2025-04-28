const itemsService = require("../services/items.service");

exports.getItems = async (req, res, next) => {
  try {
    const { page, pageSize, search } = req.query;
    const result = await itemsService.getItems(page, pageSize, search);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.toggleSelect = async (req, res, next) => {
  try {
    const { id, selected } = req.body;
    await itemsService.toggleSelect(id, selected);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.saveOrder = async (req, res, next) => {
  try {
    const { order } = req.body;
    await itemsService.saveOrder(order);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.getSelectedItems = async (req, res, next) => {
  try {
    const selectedItems = await itemsService.getSelectedItems();
    res.json({ data: selectedItems });
  } catch (err) {
    next(err);
  }
};
