import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Recipie from './components/Recipie';
import About from './components/layout/About';
import Footer from './components/layout/footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/auth/Alerts';
import setAuthToken from './utils/setAuthToken';
import RecipeState from './context/recipe/RecipeState';
import AuthState from './context/auth/authState';
import AlertState from './context/alert/AlertState';
import PrivateRoute from './components/routing/PrivateRoute';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <RecipeState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/recipe' component={Recipie} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
              <Footer />
            </Fragment>
          </Router>
        </AlertState>
      </RecipeState>
    </AuthState>
  );
};

export default App;
