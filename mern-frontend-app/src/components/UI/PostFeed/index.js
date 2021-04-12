import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../../Actions";
import { generatePublicUrl } from "../../../urlConfig";
import "./style.css";
/**
 * @author
 * @function PostFeed
 **/

const PostFeed = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [postLiked, setPostLiked] = useState(false);
  
  const [userComment, setUserComment] = useState("");
  const [totalLikes, setTotalLikes] = useState(props.likes.length);
  const [totalComments, setTotalComments] = useState(props.comments.length);

  useEffect(() => {
    for (let j = 0; j < props.post.likes.length; j++) {
      if (props.post.likes[j].userId === user._id) {
        setPostLiked(true);
      }
    }
  }, [postLiked, props.post.likes, user._id]);

  const handlePostLike = () => {
    const likedUser = {
      userId: user._id,
      user:user
    };

    if (postLiked) {
      setPostLiked(false);
      setTotalLikes(totalLikes - 1);
      let i = 0;
      while (i < props.post.likes.length) {
        if (props.post.likes[i].userId === user._id) {
          props.post.likes.splice(i, 1);
        } else {
          ++i;
        }
      }
    } else {
      setPostLiked(true);
      setTotalLikes(totalLikes + 1);
      props.post.likes.push(likedUser);
    }

    const updatedPost = {
      ...props.post,
    };
    dispatch(updatePost(updatedPost));
  };

  const handleSubmitComment = () => {
    setTotalComments(totalComments + 1);
    const UserComment = {
      userId: user._id,
      comment: userComment,
      likes: 0,
      user:user
    };
    props.post.comments.push(UserComment);
    const updatedPost = {
      ...props.post,
    };
    dispatch(updatePost(updatedPost));
  };

  const createdAt = props.post.createdAt.split("T");
  // const postDate = createdAt.split("-") ;


  const handleCommentBoxModal = ()=>{
      props.onChange(props.post)
  }

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
  if (e.keyCode === 13) {
    handleSubmitComment();
  }
};

  return (
    
    <div className="post-11">
      <div className="profilePost-11">
        <div className="profilePic-11">
          <img src={props.src} alt="profile pic"></img>
        </div>
        <span className="usernamePost-11">{props.fullName}</span>
        <span className="sloganPost-11">uploaded new photo.</span>
      </div>
      <div className="timePost-11">
        <span>{createdAt[0]}</span>
      </div>
      <div className="descriptionPost-11">
        <p>{props.description}</p>
      </div>
      <div className="uploadedMedia-11">
        <img
          src={generatePublicUrl(props.uploadedMedia)}
          alt="uploaded Media"
        ></img>
      </div>
      <div className="likesCommentsPost-11">
        <span className="likesPost-11">
          {totalLikes} Like{totalLikes > 1 && "s"}
        </span>
        <span onClick={handleCommentBoxModal} className="commentsPost-11">
          {totalComments} Comment{totalComments > 1 && "s"}
        </span>
        {/* {renderCommentBoxModal()} */}
      </div>
      <div className="likeCommentIcon-11">
        <div className="likePost-11">
          <label htmlFor="like-11">
            <div className="likeIcon-11">
              {postLiked ? (
                <ion-icon onClick={handlePostLike} name="thumbs-up"></ion-icon>
              ) : (
                <ion-icon
                  onClick={handlePostLike}
                  name="thumbs-up-outline"
                ></ion-icon>
              )}
            </div>
          </label>
          <span onClick={handlePostLike} id="like-11">
            Like
          </span>
        </div>
        <div className="commentPost-11">
          <label htmlFor="comment-11">
            <div className="commentIcon-11">
              <ion-icon name="chatbox-outline"></ion-icon>
            </div>
          </label>
          <label htmlFor="comment-11">
            <span>Comment</span>{" "}
          </label>
        </div>
      </div>
      <div className="commentSection-11"></div>
      <div className="writeCommentSection-11">
        <div className="profilePic-11">
          <img src={props.src} alt="profile pic"></img>
        </div>
        <div className="writeComment-11">
          {userComment.length > 0 && (
            <ion-icon onClick={handleSubmitComment} name="send"></ion-icon>
          )}
          <input
            onChange={(e) => setUserComment(e.target.value)}
            value={userComment}
            id="comment-11"
            placeholder="Write a comment..."
            onKeyPress={handleKeypress}
          />
        </div>
      </div>
    </div>
    
    
  );
};

export default PostFeed;
