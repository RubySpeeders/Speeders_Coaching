import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI
import { Typography, TextField, Grid, Button } from '@material-ui/core';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <Grid container justify="space-evenly">
        <form className="formPanel" onSubmit={this.login}>
          <Typography variant="h4" component="h2" gutterBottom>
            Login
          </Typography>
          {this.props.store.errors.loginMessage && (
            <h3 className="alert" role="alert">
              {this.props.store.errors.loginMessage}
            </h3>
          )}
          <div>
            <TextField
              placeholder="username"
              type="text"
              name="username"
              required
              variant="outlined"
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
          </div>
          <div>
            <TextField
              placeholder="password"
              type="password"
              name="password"
              required
              variant="outlined"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
          </div>
          <div>
            <Button variant="outlined" type="submit">
              Log In
            </Button>
          </div>
        </form>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(LoginForm);
