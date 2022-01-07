const express = require('express');

const itemControllers = require("../controllers/item-controllers")
const router = express.Router();

router.post("/addItem", itemControllers.addItem)
router.get("/getItem/:itemID", itemControllers.getItem)
router.post("/resolveItemIds", itemControllers.resolveItemIds)
router.delete("/deleteItem", itemControllers.deleteItem)

module.exports = router;
