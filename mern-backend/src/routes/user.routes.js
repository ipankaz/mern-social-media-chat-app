const express = require("express");
const { requireSignin } = require("../controllers/auth");
const { getUsers, getUsersByUsername } = require("../controllers/user");
const router = express.Router();

router.get("/search/firstname",requireSignin,getUsers);
router.get("/search/username",requireSignin,getUsersByUsername);

module.exports = router;