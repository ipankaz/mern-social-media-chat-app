const express = require("express");
const { signup, signin, signout} = require("../controllers/auth");
const router = express.Router();
const {validateSignupRequest,validateSigninRequest,isRequestValidated} = require('../Validators/auth')

router.post("/signup",validateSignupRequest,isRequestValidated, signup);
router.post("/signin",validateSigninRequest,isRequestValidated, signin);
router.post("/signout", signout);

module.exports = router;