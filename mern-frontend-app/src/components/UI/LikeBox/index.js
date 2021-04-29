import React from 'react'
import './style.css'
/**
* @author
* @function LikeBox
**/

const LikeBox = (props) => {
  return(
    
       <div className="userLikeBox">
           <div className="userProfilePic">
               <img src={props.profilePic} alt="profile"></img>
           </div>
           <span className="username">{props.user.firstName} {props.user.lastName}</span>
       </div>
  
   )

 }

export default LikeBox