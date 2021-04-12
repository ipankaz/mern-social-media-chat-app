const express = require('express');
const router = express.Router()
const multer = require('multer')
const shortId = require('shortid')
const path = require('path')
const {createPost, deletePostById, updatePostById, getPosts} = require('../controllers/post')
const {requireSignin} = require('../common-middlewares/index')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate() + '-' + file.originalname )
    }
  })
   
  const upload = multer({ storage: storage })

  router.post('/post/create',requireSignin,upload.array('pictures'),createPost)
  router.post('/post/delete',requireSignin,deletePostById)
  router.post('/post/update',requireSignin,updatePostById)
  router.get('/post/getposts',requireSignin,getPosts)

  module.exports=router
