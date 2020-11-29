import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import {
  Box,
  Container,
  Button,
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';

class AddAthlete extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
  };

  //coach adds an athlete
  addAthlete = (e) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'ADD_ATHLETE',
      payload: this.state,
    });
    //goes back home after adding athlete
    this.props.history.push('/add/athlete/success');
  };

  //takes user back to homepage
  handleBack = (e) => {
    e.preventDefault();
    this.props.history.push('/home');
  };

  //captures inputs for registering an athlete
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <Container>
        <Grid container justify="space-evenly">
          <Grid item>
            <Typography variant="h4">Register an Athlete!</Typography>
            <form className="formPanel" onSubmit={this.addAthlete}>
              {this.props.store.errors.registrationMessage && (
                <h3 className="alert" role="alert">
                  {this.props.store.errors.registrationMessage}
                </h3>
              )}
              <Box m={2}>
                <TextField
                  placeholder="first name"
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  required
                  variant="outlined"
                  onChange={this.handleInputChangeFor('first_name')}
                />
              </Box>{' '}
              <Box m={2}>
                <TextField
                  placeholder="last name"
                  type="text"
                  name="last_name"
                  value={this.state.last_name}
                  required
                  variant="outlined"
                  onChange={this.handleInputChangeFor('last_name')}
                />
              </Box>{' '}
              <Box m={2}>
                <TextField
                  placeholder="email"
                  type="text"
                  name="email"
                  value={this.state.email}
                  required
                  variant="outlined"
                  onChange={this.handleInputChangeFor('email')}
                />
              </Box>
              <Box m={2}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button
                      onClick={this.handleBack}
                      type="submit"
                      variant="contained"
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button type="submit" variant="contained">
                      Add Athlete
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AddAthlete);
