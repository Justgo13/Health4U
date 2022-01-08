const express = require("express");

const userControllers = require("../controllers/user-controllers");

const router = express.Router();

router.get("/getCartHistory/:userID", userControllers.getCartHistory);
router.get("/getSellerItems/:userID", userControllers.getSellerItems);
router.get("/getBookmarks/:userID", userControllers.getBookmarks);

router.post("/signUpBuyer", userControllers.signUpBuyer);
router.post("/signUpSeller", userControllers.signUpSeller);
router.post("/login", userControllers.login);
router.post("/addBookmark", userControllers.addBookmark);
router.post("/addOrder", userControllers.addOrder);

router.delete("/removeBookmark", userControllers.removeBookmark);

router.patch("/editUser", userControllers.editUser);

module.exports = router;
