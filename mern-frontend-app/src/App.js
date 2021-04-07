import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import './App.css';
import PrivateRoute from './components/HOC/PrivateRoute';
import HomePage from './containers/HomePage';
import LoginSignup from './containers/LoginSignup';

function App() {
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
