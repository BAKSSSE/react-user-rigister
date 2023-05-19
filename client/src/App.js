import './App.css';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom"

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={LandingPage}>
        </Route>
        <Route exact path="/login" component={LoginPage}>
        </Route>
        <Route exact path="/register" component={RegisterPage}>
        </Route>
      </div>

    </Router>
  );
}

export default App;
