const express = require("express");

const userControllers = require("../controllers/user-controllers");

const router = express.Router();

router.post("/signUpBuyer", userControllers.signUpBuyer);
router.post("/signUpSeller", userControllers.signUpSeller);
router.post("/login", userControllers.login);
router.post("/addBookmark", userControllers.addBookmark);
router.get("/getBookmarks/:userID", userControllers.getBookmarks);
router.delete("/removeBookmark", userControllers.removeBookmark);
router.post("/addOrder", userControllers.addOrder);
router.get("/getCartHistory/:userID", userControllers.getCartHistory);
router.get("/getSellerItems/:userID", userControllers.getSellerItems);

module.exports = router;
