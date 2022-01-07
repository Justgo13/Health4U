const express = require('express');

const userControllers = require('../controllers/user-controllers');

const router = express.Router();

router.post("/signUpBuyer", userControllers.signUpBuyer)
router.post("/signUpSeller", userControllers.signUpSeller)
router.post("/login", userControllers.login)

module.exports = router;
