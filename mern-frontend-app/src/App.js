import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import './App.css';
import React,{useEffect} from 'react'
import PrivateRoute from './components/HOC/PrivateRoute';
import HomePage from './containers/HomePage';
import LoginSignup from './containers/LoginSignup';
import { useDispatch , useSelector} from "react-redux";
import {isUserLoggedIn} from './Actions/auth.action'


function App() {
 

  const dispatch = useDispatch()
  const auth = useSelector(state=>state.auth)

  useEffect(()=>{
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
    if(auth.authenticate){
      // dispatch(getInitialData());
    }
    
    
  },[auth.authenticate,dispatch])


  return (
    <div className="App">
      <Router>
        <Switch>
        <PrivateRoute exact path="/" component={HomePage}></PrivateRoute>
        <Route path="/login" component={LoginSignup}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
