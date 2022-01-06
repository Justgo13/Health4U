const express = require('express');
const { check } = require('express-validator');

const userControllers = require('../controllers/user-controllers');

const router = express.Router();

router.post("/signUpBuyer", userControllers.signUpBuyer)
router.post("/signUpSeller", userControllers.signUpSeller)

module.exports = router;
