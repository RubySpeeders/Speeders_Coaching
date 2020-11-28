import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

class AthleteRegistrationThree extends Component {
  componentDidMount() {
    //dispatch to get races for the dropdown
    this.props.dispatch({ type: 'GET_RACES' });
  }
  state = {
    run_history: '',
    avg_weekly_mileage: '',
    personal_record: {
      distance: '',
    },
    agree: false,
    other_exercise: {},
  };

  handleNext = (e) => {
    e.preventDefault();
    // this.props.dispatch({ type: 'UPDATE_FEELING', payload: this.state });
    this.props.history.push('/registration/athlete/page4');
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleChangeForChecks = (propertyName) => (event) => {
    this.setState({
      ...this.state,
      other_exercise: {
        ...this.state.other_exercise,
        [propertyName]: event.target.checked,
      },
    });
  };

  render() {
    const races = this.props.store.races.map((item, index) => {
      return (
        <MenuItem value={item.id} key={index}>
          {item.description}
        </MenuItem>
      );
    });
    return (
      <Container>
        <form onSubmit={this.handleNext}>
          <Typography gutterBottom>Fun Stuff</Typography>
          {this.props.store.errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {this.props.store.errors.registrationMessage}
            </h3>
          )}

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="rest-day">
              How long have you been running?
            </InputLabel>
            <Select
              fullWidth
              labelId="run-history"
              value={this.state.run_history}
              onChange={this.handleInputChangeFor('run_history')}
              label="run_history"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="no experience">
                <em>No experience</em>
              </MenuItem>
              <MenuItem value="1-2 years">
                <em>1-2 years</em>
              </MenuItem>
              <MenuItem value="2-4 years">
                <em>2-4 years</em>
              </MenuItem>
              <MenuItem value="5+ years">
                <em>5+ years</em>
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="avg-weekly-miles">
              How much do you run every week?
            </InputLabel>
            <Select
              fullWidth
              labelId="avg-weekly-miles"
              value={this.state.avg_weekly_mileage}
              onChange={this.handleInputChangeFor('avg_weekly_mileage')}
              label="avg_weekly_mileage"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="0-5 miles">
                <em>0-5 miles</em>
              </MenuItem>
              <MenuItem value="5-10 miles">
                <em>5-10 miles</em>
              </MenuItem>
              <MenuItem value="10-15 miles">
                <em>10-15 miles</em>
              </MenuItem>
              <MenuItem value="15-20 miles">
                <em>15-20 miles</em>
              </MenuItem>
              <MenuItem value="20+ miles">
                <em>20+ miles</em>
              </MenuItem>
            </Select>
          </FormControl>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={this.state.checkedB}
                  onChange={this.handleChangeForChecks}
                  name="checkedB"
                  color="primary"
                />
              }
              label="5K"
            />
          </FormGroup>
          <Typography>If you have any PRs please add them here:</Typography>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="distance">Distance</InputLabel>
            <Select
              fullWidth
              labelId="distance"
              value={this.state.personal_record.distance}
              onChange={this.handleInputChangeFor('distance')}
              label="distance"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {races}
            </Select>
          </FormControl>
          <Typography>
            I agree to make my strava account public for my coach to access
            data:
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.agree === true}
                  //onChange={this.handleChangeForChecks}
                  name="checkedB"
                  color="primary"
                />
              }
              label="I agree"
            />
          </FormGroup>
          <TextField variant="outlined" placeholder="Enter your strava id" />
          <Box m={2}>
            <Button type="submit" variant="contained">
              Next
            </Button>
          </Box>
        </form>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AthleteRegistrationThree);
