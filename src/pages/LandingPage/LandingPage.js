import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//SWEET ALERT
import Swal from 'sweetalert2';

//MATERIAL-UI imports
import { Typography, Button, Grid, Container, Box } from '@material-ui/core';

// CUSTOM COMPONENTS
import './LandingPage.css';

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  coachRegistration = (event) => {
    Swal.fire({
      title: 'Are you a coach or an athlete?',
      icon: 'question',
      confirmButtonText: `Coach`,
      showDenyButton: true,
      denyButtonText: 'Athlete',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        //goes to coach registration page
        this.props.history.push('/registration/coach');
      } else if (result.isDenied) {
        Swal.fire(`Please wait for an email from your coach to register!`);
      }
    });
  };

  render() {
    return (
      <Container>
        <Typography variant="h2" gutterBottom>
          Welcome to Speeders Coaching!
        </Typography>
        <Grid container justify="space-evenly" alignItems="center">
          <Grid item>
            <div className="opacity">
              <Box m={2}>
                <Typography>Do you need an account?</Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={this.coachRegistration}
                >
                  Register
                </Button>
              </Box>
              <Box m={2}>
                <Typography>Already running?</Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={this.onLogin}
                >
                  Login
                </Button>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
