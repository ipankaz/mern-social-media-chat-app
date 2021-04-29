import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from '../../../Actions'
import './style.css'
/**
* @author
* @function CommentBox
**/

const CommentBox = (props) => {
   const auth = useSelector(state=>state.auth)
   const [verifiedUser,setVerifiesUser] = useState(false)
   const dispatch = useDispatch();
   
   useEffect(()=>{
    if(props.user._id===auth.user._id){
        setVerifiesUser(true)
    }
   },[verifiedUser,auth.user._id,props.user._id])

   const handleDeleteUserComment = ()=>{
      
       for(let i = 0 ; i<props.originalPost.comments.length ; i++){
           if(props.id===props.originalPost.comments[i]._id){
               props.originalPost.comments.splice(i,1);
               const updatedPost = {
                ...props.originalPost,
              };
                dispatch(updatePost(updatedPost))
               return;
           }
       }
   }

  return(
    <div className="userCommentBox">
       <div className="userProfilePicture">
         <img src={props.profilePic} alt="profile"></img>
       </div>
       <div className="userCommentSection">
           <div className="userCommentHeader">
             <div className="username">
               <span>{props.user.firstName} {props.user.lastName}</span>
             </div>
             {verifiedUser && 
             <div className="userCommentDeleteIcon">
                <ion-icon onClick={handleDeleteUserComment} name="trash-outline"></ion-icon>
             </div>}
           </div>
          
          <div className="userComment">
             <p>{props.postComment}</p>
          </div>
       </div>
  </div>
   )

 }

export default CommentBox