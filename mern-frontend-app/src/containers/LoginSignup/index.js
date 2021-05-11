import React, { useState } from "react";
import "./style.css";
import playImg from "../../Media/play.svg";
import launchImg from "../../Media/launch.svg";
import Input from "../../components/UI/Input";
import { useDispatch , useSelector} from "react-redux";
import { Redirect, useHistory} from 'react-router-dom'
import authAction from "../../Actions/auth.action";
import { signupAuthentication } from "../../Actions/user.action";
// import { signup } from "../../Actions/user.action";

/**
 * @author
 * @function LoginSignup
 **/

const LoginSignup = (props) => {
  const [mode, setMode] = useState("container-123");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const dispatch = useDispatch();
  const history = useHistory()
  const auth = useSelector(state=>state.auth);
  const user = useSelector(state=>state.user);

  if(auth.authenticate){
    return <Redirect to='/'/>
  }

  const signUpBtn = () => {
    setMode("container-123 sign-up-mode-123");
  };

  const signInBtn = () => {
    setMode("container-123");
  };

  const submitSignupBtn = (event) => {
    event.preventDefault();
    const signupForm = {
      firstName,
      lastName,
      email,
      username,
      contactNumber,
      password,
    };

   history.push("/login/complete",{form:signupForm})
    // dispatch(signup(signupForm))
    // setMode("container-123");
  };

  const submitSigninBtn = (event) => {
    event.preventDefault();
    const signinForm = {
      email,
      password,
    };
    dispatch(authAction(signinForm))
  };

  const handleUsername = (event)=>{
    setUsername(event.target.value)
    if(event.target.value.length>0){
      dispatch(signupAuthentication({username:`${event.target.value}`}))
    }
    
  }
const validateEmail = (email)=>{
  let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(regexEmail);
}
const validateFirstName = (firstname)=> {
  if (
      typeof firstname !== "string" ||
      /[0-9]+/g.test(firstname)
  ) {
      return false; 
  }
  return true;
}

  const handleEmail = (event)=>{
    setEmail(event.target.value)
  if (validateEmail(event.target.value)) {
    dispatch(signupAuthentication({email:`${event.target.value}`}))
  }
  
  }
  const handleContactNumber = (event)=>{
    setContactNumber(event.target.value)
    if(event.target.value.length===10){
      dispatch(signupAuthentication({contactNumber:`${event.target.value}`}))
    }
    
  }

  return (
    <div className={mode}>
      <div className="forms-container-loginSignup">
        <div className="signin-signup-123">

            {/* Signin Form  */}  

          <form onSubmit={submitSigninBtn} className="sig-in-form-123">
            {(user.done) && <p className="signup-done">Signed up Successfully, now Signin</p>}
            {(user.message) && <p className="signup-message">{user.message}. Try Again !</p>}
            {(user.error) && <p className="signup-message">{user.error}</p>}
            <h2 className="title-123">SIGNIN</h2>
            <Input
              type="text"
              placeholder="Email"
              iclassname="fas fa-envelope"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={ email ?  !validateEmail(email) ? {border:"1px solid red"} : {border:"1px solid green"} : null}
            />

            <Input
              type="password"
              placeholder="Password"
              iclassname="fas fa-lock"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={ password ?  password.length<6 ? {border:"1px solid red"} : {border:"1px solid green"} : null}
            />
             {(auth.message) && <p className="login-message">{auth.message}</p>}
             {(auth.error) && <p className="login-message">{auth.error}. Try Again !</p>}
            <input type="submit" value="Login" className="btn-123 solid" />
          </form>

          {/* Sign up form  */}

          <form onSubmit={submitSignupBtn} className="sig-up-form-123">
            <h2 className="title-123">SIGNUP</h2>
            <Input
              type="text"
              placeholder="First Name"
              iclassname="fas fa-user"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              style={ firstName ? !validateFirstName(firstName) ? {border:"1px solid red"} : {border:"1px solid green"} : null}
            />

            <Input
              type="text"
              placeholder="Last Name"
              iclassname="fas fa-user"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              style={ lastName ? !validateFirstName(lastName) ? {border:"1px solid red"} : {border:"1px solid green"} : null}
            />

            <Input
              type="text"
              placeholder="Username"
              iclassname="fas fa-user"
              value={username}
              onChange={handleUsername}
              style={username.length>0 ? user.validateMessage==="Username exist" ? {border:"1px solid red"} : {border:"1px solid green"} : null}
            />

            <Input
              type="email"
              placeholder="Email"
              iclassname="fas fa-envelope"
              value={email}
              onChange={handleEmail}
              style={ validateEmail(email) ?  user.validateMessage==="Email exist" ? {border:"1px solid red"} : {border:"1px solid green"} : null}
            />

            <Input
              type="tel"
              max={"10"}
              placeholder="Phone Number"
              iclassname="fas fa-phone"
              value={contactNumber}
              onChange={handleContactNumber}
              style={ contactNumber.length===10 ?  user.validateMessage==="mobile number exist" ? {border:"1px solid red"} : {border:"1px solid green"} : null}
            />

            <Input
              type="password"
              placeholder="Password"
              iclassname="fas fa-lock"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={ password ?  password.length<6 ? {border:"1px solid red"} : {border:"1px solid green"} : null}
            />
            <input type="submit" value="Next Step" className="btn-123 solid" />
            {/* <div className="btn-123 solid">signup</div> */}
          </form>
        </div>
      </div>

      <div className="panels-container-123">
        <div className="panel-123 left-panel-123">
          <div className="content-123">
            <h3>New Here?</h3>
            <p>Register yourself by clicking on Signup Button</p>
            <button
              onClick={signUpBtn}
              className="btn-123 transparent-123"
              id="sign-up-btn"
            >
              Signup
            </button>
          </div>
          <img src={launchImg} className="image-123" alt="Rocket" />
        </div>
        <div className="panel-123 right-panel-123">
          <div className="content-123">
            <h3>One of Us?</h3>
            <p>Login yourself by clicking on Signin Button</p>
            <button
              onClick={signInBtn}
              className="btn-123 transparent-123"
              id="sign-in-btn"
            >
              Signin
            </button>
          </div>
          <img src={playImg} className="image-123" alt="play" />
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
