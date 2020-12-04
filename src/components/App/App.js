import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

//MATERIAL-UI imports
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { pink, cyan, lightGreen } from '@material-ui/core/colors';

//custom file imports
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../../pages/AboutPage/AboutPage';
import UserPage from '../../pages/UserPage/UserPage';
import InfoPage from '../../pages/InfoPage/InfoPage';
import LandingPage from '../../pages/LandingPage/LandingPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import './App.css';
import MessageBoard from '../../pages/MessageBoard/MessageBoard';
import TipsTricks from '../../pages/TipsTricks/TipsTricks';
import AthleteRegistrationOne from '../../pages/AthleteRegistration/AthleteRegistration_1';
import AthleteRegistrationTwo from '../../pages/AthleteRegistration/AthleteRegistration_2';
import AthleteRegistrationThree from '../../pages/AthleteRegistration/AthleteRegistration_3';
import AthleteRegistrationFour from '../../pages/AthleteRegistration/AthleteRegistration_4';
import AthleteRegistrationFive from '../../pages/AthleteRegistration/AthleteRegistration_5';

import AddAthlete from '../../pages/AddAthlete/AddAthlete';
import AthleteDetails from '../../pages/AthleteDetails/AthleteDetails';
import AthleteWorkoutDetail from '../../pages/AthleteWorkoutDetail/AthleteWorkoutDetail';

const customTheme = createMuiTheme({
  //theme settings
  palette: {
    primary: cyan,
    secondary: pink,
    // error: '',
    // warning: '',
    // info: '',
    // success: '',
  },
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <ThemeProvider theme={customTheme}>
        <Container>
          <Router>
            <div>
              <Nav />
              <Switch>
                {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
                <Redirect exact from="/" to="/home" />

                {/* Visiting localhost:3000/about will show the about page. */}
                <Route
                  // shows AboutPage at all times (logged in or not)
                  exact
                  path="/about"
                  component={AboutPage}
                />

                {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
                <ProtectedRoute
                  // logged in shows UserPage else shows LoginPage
                  exact
                  path="/user"
                  component={UserPage}
                />

                <ProtectedRoute
                  // logged in shows InfoPage else shows LoginPage
                  exact
                  path="/info"
                  component={InfoPage}
                />

                {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
                <ProtectedRoute
                  // with authRedirect:
                  // - if logged in, redirects to "/user"
                  // - else shows LoginPage at /login
                  exact
                  path="/login"
                  component={LoginPage}
                  authRedirect="/user"
                />
                <ProtectedRoute
                  // with authRedirect:
                  // - if logged in, redirects to "/user"
                  // - else shows RegisterPage at "/registration"
                  exact
                  path="/registration/coach"
                  component={RegisterPage}
                  authRedirect="/user"
                />
                <ProtectedRoute
                  // with authRedirect:
                  // - if logged in, redirects to "/user"
                  // - else shows LandingPage at "/home"
                  exact
                  path="/home"
                  component={LandingPage}
                  authRedirect="/user"
                />
                <ProtectedRoute
                  exact
                  path="/athlete/details/:id"
                  component={AthleteDetails}
                />

                <ProtectedRoute
                  exact
                  path="/register/add/athlete"
                  component={AddAthlete}
                />
                <ProtectedRoute
                  exact
                  path="/message"
                  component={MessageBoard}
                />
                <ProtectedRoute exact path="/tips" component={TipsTricks} />
                <Route
                  exact
                  path="/athlete/workout/details"
                  component={AthleteWorkoutDetail}
                />
                <Route
                  exact
                  path="/register/athlete/:temporary"
                  component={AthleteRegistrationOne}
                />
                <Route
                  exact
                  path="/registration/athlete/page2"
                  component={AthleteRegistrationTwo}
                />
                <Route
                  exact
                  path="/registration/athlete/page3"
                  component={AthleteRegistrationThree}
                />
                <Route
                  exact
                  path="/registration/athlete/page4"
                  component={AthleteRegistrationFour}
                />
                <Route
                  exact
                  path="/registration/athlete/page5"
                  component={AthleteRegistrationFive}
                />

                {/* If none of the other routes matched, we will show a 404. */}

                <Route render={() => <h1>404</h1>} />
              </Switch>
              <Footer />
            </div>
          </Router>
        </Container>
      </ThemeProvider>
    );
  }
}

export default connect()(App);
