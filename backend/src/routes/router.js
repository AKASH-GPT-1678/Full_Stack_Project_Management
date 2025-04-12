const express = require("express");
const router = express.Router();
const {registerUser} = require("../controllers/register.controller.js");


router.post("/register" , registerUser);


module.exports = router;
