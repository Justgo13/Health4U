const express = require('express');

const userControllers = require('../controllers/user-controllers');

const router = express.Router();

router.post("/signUpBuyer", userControllers.signUpBuyer)
router.post("/signUpSeller", userControllers.signUpSeller)
router.post("/login", userControllers.login)
router.post("/addBookmark", userControllers.addBookmark)
router.get("/getBookmarks/:userID", userControllers.getBookmarks)
router.delete("/removeBookmark", userControllers.removeBookmark)
router.get("/getBuyerUser/:userID", userControllers.getBuyerUser)

module.exports = router;
