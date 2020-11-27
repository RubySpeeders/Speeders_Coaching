import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import {
  Container,
  Button,
  Typography,
  Grid,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

class AddAthlete extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
  };

  addAthlete = (e) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'ADD_ATHLETE',
      payload: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        username: this.state.username,
      },
    });
    this.props.history.push('/home');
  };

  //takes user back to homepage
  handleBack = (e) => {
    e.preventDefault();
    this.props.history.push('/home');
  };

  //captures inputs for registering an athlete
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState(
      {
        [propertyName]: event.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    return (
      <Container>
        <Grid container justify="space-evenly">
          <form className="formPanel" onSubmit={this.addAthlete}>
            <Typography>Register an Athlete!</Typography>
            {this.props.store.errors.registrationMessage && (
              <h3 className="alert" role="alert">
                {this.props.store.errors.registrationMessage}
              </h3>
            )}
            <div>
              <TextField
                placeholder="first name"
                type="text"
                name="first_name"
                value={this.state.first_name}
                required
                variant="outlined"
                onChange={this.handleInputChangeFor('first_name')}
              />
            </div>{' '}
            <div>
              <TextField
                placeholder="last name"
                type="text"
                name="last_name"
                value={this.state.last_name}
                required
                variant="outlined"
                onChange={this.handleInputChangeFor('last_name')}
              />
            </div>{' '}
            <div>
              <TextField
                placeholder="email"
                type="text"
                name="email"
                value={this.state.email}
                required
                variant="outlined"
                onChange={this.handleInputChangeFor('email')}
              />
            </div>
            <div>
              <TextField
                placeholder="username"
                type="text"
                name="username"
                value={this.state.username}
                required
                variant="outlined"
                onChange={this.handleInputChangeFor('username')}
              />
            </div>
            <div>
              <Button
                onClick={this.handleBack}
                type="submit"
                variant="contained"
              >
                Back
              </Button>

              <Button type="submit" variant="contained">
                Add Athlete
              </Button>
            </div>
          </form>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AddAthlete);
