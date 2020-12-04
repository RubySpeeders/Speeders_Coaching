import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import {
  Container,
  Card,
  CardContent,
  Button,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Box,
} from '@material-ui/core';

class AthleteRegistrationTwo extends Component {
  componentDidMount() {
    //dispatch to get days of the week for the dropdown
    this.props.dispatch({ type: 'GET_DAYS' });
  }

  state = {
    rest_day: '',
    long_run_day: '',
    speed_work: '',
  };

  handleNext = (e) => {
    e.preventDefault();
    //send answers to athlete registration reducer, saved until the last page
    this.props.dispatch({ type: 'UPDATE_ATHLETE', payload: this.state });
    //goes to next page
    this.props.history.push('/registration/athlete/page3');
  };

  //record from inputs to state
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  //goes back a page
  onBackClick = (e) => {
    this.props.history.push('/register/athlete/:temporary');
  };

  render() {
    const day = this.props.store.days.map((item, index) => {
      return (
        <MenuItem value={item.id} key={index}>
          {item.day}
        </MenuItem>
      );
    });
    return (
      <div className="opacity">
        <Grid container justify="space-evenly">
          <Grid item xs={6}>
            <Typography variant="h4" gutterBottom>
              Running Details
            </Typography>
            <form onSubmit={this.handleNext}>
              {this.props.store.errors.registrationMessage && (
                <h3 className="alert" role="alert">
                  {this.props.store.errors.registrationMessage}
                </h3>
              )}
              <Box mb={2}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="rest-day">Preferred Rest Day</InputLabel>
                  <Select
                    fullWidth
                    labelId="rest-day"
                    value={this.state.rest_day}
                    onChange={this.handleInputChangeFor('rest_day')}
                    label="rest_day"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {day}
                  </Select>
                </FormControl>
              </Box>
              <Box mb={2}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="long-run-day">
                    Preferred Long Run Day
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="long-run-day"
                    value={this.state.long_run_day}
                    onChange={this.handleInputChangeFor('long_run_day')}
                    label="long_run_day"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {day}
                  </Select>
                </FormControl>
              </Box>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="speed">Speed Work</InputLabel>
                <Select
                  labelId="speed"
                  value={this.state.speed_work}
                  onChange={this.handleInputChangeFor('speed_work')}
                  label="speed_work"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'Yes, loads of it!'}>
                    Yes, loads of it!
                  </MenuItem>
                  <MenuItem value={'Never heard of it.'}>
                    Never heard of it.
                  </MenuItem>
                  <MenuItem
                    value={'Some - I have heard of it but never tried it.'}
                  >
                    Some - I have heard of it but never tried it.
                  </MenuItem>
                </Select>
              </FormControl>
              <Box m={2}>
                <Grid container justify="space-evenly">
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={this.onBackClick}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button color="secondary" type="submit" variant="outlined">
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AthleteRegistrationTwo);
