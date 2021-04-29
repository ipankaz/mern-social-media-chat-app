import React, { useEffect, useState} from "react";
import { useSelector} from "react-redux";
import { NavLink } from "react-router-dom";
import HomePage from "../../containers/HomePage";
import { generatePublicUrl } from "../../urlConfig";
import EditProfile from "../UI/EditProfile";

import "./style.css";
/**
 * @author
 * @function BannerBox
 **/

const BannerBox = (props) => {
  const auth = useSelector((state) => state.auth);
  const [differentUser, setDifferentUser] = useState(true);

  useEffect(()=>{
    if(auth.user._id===props.user._id ){
      setDifferentUser(false)
    }
  },[auth.user._id,props.user._id])

  const pathname = window.location.pathname;

  let active1 = "";
  let active2 = "";
  let active3 = "";
  let active4 = "";

  if (pathname === `/profile/${props.user.username}`) {
    active1 = "active";
  } else if (pathname === `/profile/${props.user.username}/followers`) {
    active2 = "active";
  } else if (pathname === `/profile/${props.user.username}/about`) {
    active3 = "active";
  } else if (pathname === `/profile/${props.user.username}/edit`) {
    active4 = "active";
  }

  return (
    <>
      <div className="banner-box">
        <div className="cover-photo-blur">
          <img src={props.coverPic} alt="cover"></img>

          <div className="profile-cover-photo">
            <div className="cover-photo">
              <div className="cover-pic">
                <img src={props.coverPic} alt="cover"></img>
                {!differentUser &&
                <div className="change-cover">
                <span>Change Cover Photo </span>
                <div>
                  <ion-icon name="camera"></ion-icon>
                </div>
              </div>
                }
              </div>
              <div className="profile-photo">
                <div className="profile-icon">
                  <img src={props.user ? generatePublicUrl(props.user.profilePicture.img) : null} alt="profile"></img>
                  {!differentUser && 
                  <div className="change-profile-pic-icon">
                  <ion-icon name="camera-outline"></ion-icon>
                </div>
                  }
                </div>
              </div>
            </div>
          </div>
          {differentUser && (
            <div className="follow-unfollow">
              <div className="follow">
                <span>Follow</span>
                <div className="follow-icon">
                  <ion-icon name="add"></ion-icon>
                </div>
              </div>
            </div>
          )}
          <div className="username">
            <span>{props.user.firstName} {props.user.lastName}</span>
          </div>
          <div className="user-bio">
            <p>{props.user.bio}</p>
          </div>
          <div className="mini-bar">
            <div className="mini-links">
              <ul>
                <li className={`mini-bar-item ${active1}`}>
                  <NavLink exact to={`/profile/${props.user.username}`}>
                    Posts
                  </NavLink>
                </li>
                <li className={`mini-bar-item ${active2}`}>
                  <NavLink to={`/profile/${props.user.username}/followers`}>
                    Followers (130)
                  </NavLink>
                </li>
                <li className={`mini-bar-item ${active3}`}>
                  <NavLink to={`/profile/${props.user.username}/following`}>
                    Following (90)
                  </NavLink>
                </li>
                {!differentUser &&
                <li className={`mini-bar-item ${active4}`}>
                <NavLink to={`/profile/${props.user.username}/edit`}>
                  Edit Profile
                </NavLink>
              </li>
                }
              </ul>
            </div>
          </div>
        </div>
        {active1 === "active" &&
         <HomePage
          posts={props.posts}
          user={props.user}
          differentUser={differentUser}
         ></HomePage>}
         {active4==="active" &&
         <EditProfile></EditProfile>
         }
      </div>
    </>
  );
};

export default BannerBox;
