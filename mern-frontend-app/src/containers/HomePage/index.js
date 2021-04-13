import React, { useState ,useEffect} from "react";
import "./style.css";
import profilePic from "../../Media/profilePic.jpg";
import Modal from "../../components/UI/Modal";
import NavBar from "../../components/UI/NavBar";
import { Container } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { createPost,getPosts } from "../../Actions/post.action";
import PostFeed from "../../components/UI/PostFeed";
import CommentBox from "../../components/UI/CommentBox";
import LikeBox from "../../components/UI/LikeBox";
// import { generatePublicUrl } from "../../urlConfig";
/**
 * @author
 * @function HomePage
 **/
 let data = true;
const HomePage = (props) => {
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaError, setMediaError] = useState(false);
  const [postPictures, setPostPictures] = useState([]);
  const [commentModal, setCommentModal] = useState(false);
  const [likeModal, setLikeModal] = useState(false);
  const [childPost,setChildPost] = useState(null)
  const [likedUser,setLikedUser] = useState(null)
  const dispatch = useDispatch()
  const auth = useSelector(state=>state.auth)


  useEffect(()=>{
    if(auth.authenticate && data){
      dispatch(getPosts())
      data=false;
    }
  },[auth.authenticate,dispatch])

  const allPosts = useSelector(state=>state.post);
  

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setMediaPreview(null);
    setMediaError(false);
  };

  const handleModalDescription = (event) => {
    setDescription(event.target.value);
  };

  const submitCreatePostForm = () => {
    if (description === "" || postPictures.length === 0) {
      alert("Empty Fields");
      return;
    }

    const form = new FormData();
    form.append("description", description);
    postPictures.forEach((picture, index) => {
      form.append("pictures", picture);
    });
    
    dispatch(createPost(form))
    setDescription("");setPostPictures([]);
    handleClose()
  };

  const handleMediaUploadModal = (event) => {
    const selected = event.target.files[0];
    // setPostPictures(...postPictures, selected);
    setMediaError(false)
    const allowedTypes = [
      "image/jpg",
      "image/png",
      "image/gif",
      "image/jpeg",
      "video/mp4",
      "video/mov",
      "video/3gp",
      "video/mkv",
    ];
    if (selected && allowedTypes.includes(selected.type)) {
      setPostPictures([...postPictures, selected]);
      let reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setMediaError(true);
    }
  };
   
  const handleCommentBoxModal = (post)=>{
    setCommentModal(true)
    setChildPost(post)
}
const handleLikeBoxaModal = (post)=>{
    setLikeModal(true)
    setLikedUser(post)
}

const handleCloseCommentBoxModal = ()=>{
setCommentModal(false)
}

const handleCloseLikeBoxModal = ()=>{
  setLikeModal(false)
}

  const renderCreatePostModal = () => {
    return (
      <Modal
        //  size="sm"
        // modalTitle={"Create Post"}
        show={show}
        handleCloseModal={handleClose}
        onHide={handleClose}
        action={submitCreatePostForm}
        _task={"Post"}
        centered="centered"
        color="primary"
        className="my-modal"
      >
        <Container fluid>
          <div className="createPostModal">
            <div className="profileModal">
              <div className="profilePic-1">
                <img src={profilePic} alt="profile pic"></img>
              </div>
              <span className="usernameModal">Pankaj Arora</span>
            </div>
            <input
              onChange={handleModalDescription}
              value={description}
              type="textarea"
              className="descriptionModal"
              placeholder="What's on your mind, Pankaj?"
            ></input>
            <div className="mediaPreview">
              {mediaError && (
                <p className="errorMessage"> Media not supported</p>
              )}
              {mediaPreview && (
                <>
                  <img src={mediaPreview} alt="selected media"></img>
                  <div className="removeMediaPreview">
                    {" "}
                    <ion-icon
                      onClick={() => setMediaPreview(null)}
                      name="close-outline"
                    ></ion-icon>
                  </div>
                </>
              )}
            </div>
            <div className="addMediaModal">
              <span className="mediaSpan">Add to your post</span>
              <label htmlFor="file-input">
                <ion-icon
                  name="images-outline"
                  className="mediaIcon"
                ></ion-icon>
              </label>
              <input
                id="file-input"
                type="file"
                onChange={handleMediaUploadModal}
              />
            </div>
          </div>
        </Container>
      </Modal>
    );
  };

  const renderCommentBoxModal = ()=>{
    return(
      <Modal
        show={commentModal}
        // modalTitle={"Comments"}
        handleCloseModal={handleCloseCommentBoxModal}
        onHide={handleCloseCommentBoxModal}
        centered="centered"
        color="primary"
        className="my-modal"
      >
      {childPost && 
         <Container fluid>
             <div className="allUserComments">
               {childPost.comments.map((comment,index)=>(
                <CommentBox
                key={index}
                profilePic={profilePic}
                postComment={comment.comment}
                user={comment.user}
                originalPost={childPost}
                id={comment._id}
               />
               ))}
               
             </div>
         </Container>
      }
      </Modal>
    )
  }

  const renderLikeBoxModal = ()=>{
    return(
      <Modal
        show={likeModal}
        handleCloseModal={handleCloseLikeBoxModal}
        onHide={handleCloseLikeBoxModal}
        centered="centered"
        color="primary"
        className="my-modal"
      >
      {likedUser && 
         <Container fluid>
             <div className="allUserLikes">
              {likedUser.likes.map((like,index)=>(
                <LikeBox
                user={like.user}
                profilePic={profilePic}
                />
              ))}
               
             </div>
         </Container>
      }
      </Modal>
    )
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="container-1">
        <div className="feed-1">
          <div className="createPostSection-1">
            <div className="profilePic-1">
              <img src={profilePic} alt="profile pic"></img>
            </div>
             <div className="createBtn"> 
               <p onClick={handleShow}>Write something here...</p>
             </div>
          </div>
          <div className="posts-1">
            {/* <div className="post-1">This is post</div> */}

            {/* All Post Feed goes here */}

            {allPosts.posts.map((post,index)=>{
              return(
                <PostFeed 
                post={post}
                id={post._id}
                key={index}
                src={profilePic}
                description={post.description}
                uploadedMedia={post.pictures[0].img}
                fullName = {`${post.user.firstName} ${post.user.lastName}`}
                likes={post.likes}
                comments={post.comments}
                onChange={handleCommentBoxModal}
                onLikeChange={handleLikeBoxaModal}
                />
              )
            })}
          </div>
        </div>
        {renderCreatePostModal()}
        {renderCommentBoxModal()}
        {renderLikeBoxModal()}
      </div>
    </>
  );
};

export default HomePage;
