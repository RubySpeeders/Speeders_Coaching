import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import {
  Container,
  Button,
  Grid,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

class AthleteRegistrationOne extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
  };

  // registerUser = (event) => {
  //   event.preventDefault();

  //   this.props.dispatch({
  //     type: 'REGISTER',
  //     payload: {
  //       first_name: this.state.first_name,
  //       last_name: this.state.last_name,
  //       city: this.state.city,
  //       email: this.state.email,
  //       dob: this.state.dob,
  //       gender: this.state.gender,
  //       username: this.state.username,
  //       password: this.state.password,
  //     },
  //   });
  // }; // end registerUser
  handleNext = (e) => {
    e.preventDefault();
    // this.props.dispatch({ type: 'UPDATE_FEELING', payload: this.state });
    this.props.history.push('/registration/athlete/page2');
  };

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
        <form className="formPanel" onSubmit={this.handleNext}>
          <h2>Tell me about yourself!</h2>
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
              placeholder="city"
              type="text"
              name="city"
              value={this.state.city}
              required
              variant="outlined"
              onChange={this.handleInputChangeFor('city')}
            />
          </div>
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
              id="dob"
              label="dob"
              type="date"
              value={this.state.dob}
              onChange={this.handleInputChangeFor('dob')}
              variant="outlined"
            />
          </div>
          <FormControl variant="outlined">
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              id="gender"
              value={this.state.gender}
              onChange={this.handleInputChangeFor('gender')}
              label="gender"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Non-binary'}>Non-binary</MenuItem>
              <MenuItem value={'N/A'}>Prefer not to say</MenuItem>
            </Select>
          </FormControl>
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
            <TextField
              placeholder="password"
              type="password"
              name="password"
              value={this.state.password}
              required
              variant="outlined"
              onChange={this.handleInputChangeFor('password')}
            />
          </div>
          <div>
            <Button type="submit" variant="contained">
              Next
            </Button>
          </div>
        </form>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AthleteRegistrationOne);
