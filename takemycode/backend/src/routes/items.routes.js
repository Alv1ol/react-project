const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items.controller");

router.get("/", itemsController.getItems);
router.post("/select", itemsController.toggleSelect);
router.post("/order", itemsController.saveOrder);
router.get("/selected", itemsController.getSelectedItems);

module.exports = router;