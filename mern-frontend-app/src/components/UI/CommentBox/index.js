import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './style.css'
/**
* @author
* @function CommentBox
**/

const CommentBox = (props) => {
   const auth = useSelector(state=>state.auth)
   const [verifiedUser,setVerifiesUser] = useState(false)
   
   useEffect(()=>{
    if(props.user._id===auth.user._id){
        setVerifiesUser(true)
    }
   },[verifiedUser,auth.user._id,props.user._id])

  return(
    <div className="userCommentBox">
       <div className="userProfilePicture">
         <img src={props.profilePic} alt="profile"></img>
       </div>
       <div className="userCommentSection">
           <div className="userCommentHeader">
             <div className="username">
               <span>{props.user.fullName}</span>
             </div>
             {verifiedUser && 
             <div className="userCommentDeleteIcon">
                <ion-icon name="trash-outline"></ion-icon>
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