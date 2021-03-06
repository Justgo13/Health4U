const express = require('express');

const itemControllers = require("../controllers/item-controllers")
const router = express.Router();


router.get("/getItem/:itemID", itemControllers.getItem)
router.get("/getItems", itemControllers.getItems)

router.post("/addItem", itemControllers.addItem)
router.post("/resolveItemIds", itemControllers.resolveItemIds)

router.delete("/deleteItem", itemControllers.deleteItem)

router.patch("/editItem", itemControllers.editItem)

module.exports = router;
