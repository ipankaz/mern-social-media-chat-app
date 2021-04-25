const User = require("../models/users");

exports.getUsers = async (req, res) => {
    const {name} = req.query
    // 'i' is used for ignoring case sensitive
    // /name/ this is the regex . if name appears between the firstname , respnse will give results then 
    const users = await User.find({firstName : {'$regex': name ,$options:'i'}})
      .sort({ createdAt: -1 })
      .exec();
  
    res.status(200).json({ users });
  };
exports.getUsersByUsername = async (req, res) => {
    const {username} = req.query
    // 'i' is used for ignoring case sensitive
    // /username/ this is the regex . if username appears between the username , respnse will give results then 
    const users = await User.find({username : {'$regex': username ,$options:'i'}})
      .sort({ createdAt: -1 })
      .exec();
  
    res.status(200).json({ users });
  };