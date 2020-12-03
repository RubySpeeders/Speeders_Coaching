import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import {
  Box,
  Container,
  Button,
  Grid,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
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
        city: this.state.city,
        email: this.state.email,
        dob: this.state.dob,
        gender: this.state.gender,
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
        <Grid container justify="space-evenly">
          <Grid item>
            <Typography variant="h4" component="h2">
              Coach Registration
            </Typography>
            <form className="formPanel" onSubmit={this.registerUser}>
              {this.props.store.errors.registrationMessage && (
                <Typography component="h3" className="alert" role="alert">
                  {this.props.store.errors.registrationMessage}
                </Typography>
              )}
              <Grid container>
                <Grid item>
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
                      placeholder="city"
                      type="text"
                      name="city"
                      value={this.state.city}
                      required
                      variant="outlined"
                      onChange={this.handleInputChangeFor('city')}
                    />
                  </Box>
                  <Box m={2}>
                    <TextField
                      placeholder="email"
                      type="email"
                      name="email"
                      value={this.state.email}
                      required
                      variant="outlined"
                      onChange={this.handleInputChangeFor('email')}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box m={2}>
                    <TextField
                      id="dob"
                      label="dob"
                      type="date"
                      value={this.state.dob}
                      onChange={this.handleInputChangeFor('dob')}
                      variant="outlined"
                    />
                  </Box>
                  <FormControl variant="outlined" fullWidth>
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
                  <Box m={2}>
                    <TextField
                      placeholder="username"
                      type="text"
                      name="username"
                      value={this.state.username}
                      required
                      variant="outlined"
                      onChange={this.handleInputChangeFor('username')}
                    />
                  </Box>
                  <Box m={2}>
                    <TextField
                      placeholder="password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      required
                      variant="outlined"
                      onChange={this.handleInputChangeFor('password')}
                    />
                  </Box>
                  <Box m={2}>
                    <Button color="secondary" type="submit" variant="outlined">
                      Register Coach
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
