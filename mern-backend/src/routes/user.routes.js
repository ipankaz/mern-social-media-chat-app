const express = require("express");
const { requireSignin } = require("../controllers/auth");
const { getUsers, getUsersByUsername, updateUserProfile } = require("../controllers/user");
const router = express.Router();

router.get("/search/firstname",requireSignin,getUsers);
router.get("/search/username",requireSignin,getUsersByUsername);
router.post("/user/update",requireSignin,updateUserProfile);

module.exports = router;