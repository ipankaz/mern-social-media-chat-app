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

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

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
            <div class="addMediaModal">
              <span className="mediaSpan">Add to your post</span>
               <label for="file-input">
               <ion-icon name="images-outline" className="mediaIcon"></ion-icon>
                 </label>
               <input id="file-input" type="file" />
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
            <span onClick={handleShow}>
              <p>Write something here...</p>
            </span>
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
