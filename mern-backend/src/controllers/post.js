const Post = require('../models/posts')
const User = require('../models/users')

exports.createPost = async (req,res,next) =>{
    const {description} = req.body

    let pictures=[]
    if(req.files.length>0){
        pictures = req.files.map(file=>{
            return {img:file.filename}
        })
    }

    const user = await User.findOne({_id:req.user._id}).select("_id firstName lastName email username contactNumber")

    const post = new Post({
        user,
        description,
        pictures,
        createdBy:req.user._id
    })
    post.save((error,posts)=>{
        if(error){
            res.status(400).json({error})
        }else if(posts){
            res.status(200).json({posts})
        }
    })
    
}

exports.deletePostById = async (req,res,next)=>{
    const { postId } = req.query;
    const post = await Post.findOne({_id:postId}).select("_id user")

        if (postId && req.user._id==post.user._id) {
         const deletedPost = await  Post.deleteOne({ _id: postId }).exec((error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
              res.status(202).json({ result });
            }
          });
        } else {
          res.status(400).json({ error: "Params required or different user" });
        }
}

exports.updatePostById = async (req,res,next)=>{
    const { postId } = req.query;
    const {updatePost} = req.body
    const post = await Post.findOne({_id:postId}).select("_id user")

        if (postId && req.user._id==post.user._id) {
          const updatedPost = await Post.updateOne({ _id: postId },updatePost,{new:true})
          res.status(201).json(updatedPost)
            
        } else {
          res.status(400).json({ error: "Params required or different user" });
        }
}