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
  KeyboardDatePicker,
} from '@material-ui/core';

class RegisterForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        dob: this.state.dob,
        username: this.state.username,
        password: this.state.password,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <Container>
        <form className="formPanel" onSubmit={this.registerUser}>
          <h2>Register Coach</h2>
          {this.props.store.errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {this.props.store.errors.registrationMessage}
            </h3>
          )}
          <div>
            <TextField
              placeholder="First Name"
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
              placeholder="Last Name"
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
              name="email"
              value={this.state.email}
              required
              variant="outlined"
              onChange={this.handleInputChangeFor('email')}
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
          {/* <div>
            <KeyboardDatePicker
              format="MM/dd/yyyy"
              required
              value={this.state.dob}
              label="dob"
              onChange={this.handleInputChangeFor('dob')}
            />
          </div> */}
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
            <Button
              type="submit"
              variant="contained"
              // name="submit"
              // value="Register"
            >
              Register
            </Button>
          </div>
        </form>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
