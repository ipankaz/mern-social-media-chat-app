import React, { useState } from "react";
import "./style.css";
// import Input from '../../components/UI/Input'
import profilePic from "../../Media/profilePic.jpg";
import Modal from "../../components/UI/Modal";
import NavBar from "../../components/UI/NavBar";
import {  Container } from "react-bootstrap";
/**
 * @author
 * @function HomePage
 **/

const HomePage = (props) => {
  const [show, setShow] = useState(false);
  const [mediaPreview,setMediaPreview] = useState(null);
  const [mediaError,setMediaError] = useState(false);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setMediaPreview(null);
    setMediaError(false);
  };

  const handleMediaUploadModal = (event)=>{
      const selected = event.target.files[0];
      const allowedTypes = ["image/jpg", "image/png","image/gif","image/jpeg","video/mp4","video/mov","video/3gp","video/mkv"]
      if(selected && allowedTypes.includes(selected.type)){
       let reader = new FileReader()
       reader.onloadend = ()=>{
            setMediaPreview(reader.result)
       }
       reader.readAsDataURL(selected)
      }else{
        setMediaError(true)
      }
  }

  const renderCreatePostModal = () => {
    return (
      <Modal
        //  size="sm"
        modalTitle={"Create Post"}
        show={show}
        handleClose={handleClose}
        onHide={handleClose}
        //  action={submitCreatePageForm}
        _task={"Post"}
        centered="centered"
        color="primary"
      >
        <Container fluid>
          <div className="createPostModal">
            <div className="profileModal">
              <div className="profilePic-1">
                <img src={profilePic} alt="profile pic"></img>
              </div>
               <span className="usernameModal">Pankaj Arora</span>
            </div>
            <input type="textarea" className="descriptionModal" placeholder="What's on your mind, Pankaj?"></input>
            <div className="mediaPreview"> 
               {mediaError && <p className="errorMessage"> Media not supported</p>}
               {mediaPreview && <>
                 <img src={mediaPreview} alt="selected media"></img>
                <div className="removeMediaPreview"> <ion-icon onClick={()=>setMediaPreview(null)} name="close-outline"></ion-icon></div>
                 </>
               }
            </div>
            <div className="addMediaModal">
               <span className="mediaSpan">Add to your post</span>
                <label htmlFor="file-input">
                <ion-icon name="images-outline" className="mediaIcon"></ion-icon>
                 </label>
               <input id="file-input" type="file" onChange={handleMediaUploadModal} />
             </div>
          </div>

        </Container>
      </Modal>
    );
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="container-1">
        <div className="feed-1">
          <div className="createPostSection-1">
            <div className="profilePic-1">
              <img src={profilePic} alt="profile pic"></img>
            </div>
            
              <p onClick={handleShow}>Write something here...</p>
           
          </div>
          <div className="posts-1">
            <div className="post-1">This is post</div>
          </div>
        </div>
        {renderCreatePostModal()}
      </div>
    </>
  );
};

export default HomePage;
