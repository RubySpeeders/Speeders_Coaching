import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import {
  Box,
  Container,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from '@material-ui/core';

class AthleteRegistrationOne extends Component {
  state = {
    first_name: '',
    last_name: '',
    city: '',
    email: '',
    dob: '',
    gender: '',
    username: '',
    password: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_TEMP_USER',
      payload: this.props.match.params.temporary,
    });
  }

  handleNext = (e) => {
    e.preventDefault();
    //send answers to athlete registration reducer, saved until the last page
    this.props.dispatch({
      type: 'UPDATE_ATHLETE',
      payload: {
        ...this.state,
        temporary_key: this.props.match.params.temporary,
      },
    });
    this.props.history.push('/registration/athlete/page2');
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <Container>
        <Card>
          <CardContent>
            {this.props.store.errors.registrationMessage !== 'NOT AVAILABLE' ? (
              <Grid container justify="space-evenly">
                <Grid item>
                  <Typography variant="h4" component="h2">
                    Welcome {this.props.store.athleteRegistration.first_name}!
                    Please tell me about yourself!
                  </Typography>

                  <form className="formPanel" onSubmit={this.handleNext}>
                    {this.props.store.errors.registrationMessage && (
                      <h3 className="alert" role="alert">
                        {this.props.store.errors.registrationMessage}
                      </h3>
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
                          <Button
                            color="secondary"
                            type="submit"
                            variant="outlined"
                          >
                            Next
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            ) : (
              <Card>
                <CardContent>
                  <Grid container justify="space-evenly">
                    <Grid item>
                      <Typography>
                        User not found -- contact your coach to get an invite
                        email!
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AthleteRegistrationOne);
