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

class AthleteRegistrationThree extends Component {
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
    // this.props.dispatch({ type: 'UPDATE_FEELING', payload: this.state });
    this.props.history.push('/registration/athlete/page3');
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <Container>
        <form onSubmit={this.handleNext}>
          <h2>Fun Stuff</h2>
          {this.props.store.errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {this.props.store.errors.registrationMessage}
            </h3>
          )}

          <FormControl variant="outlined">
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
            <InputLabel id="speed">Speed Work</InputLabel>
            <Select
              fullWidth
              labelId="speed"
              value={this.state.speed_work}
              onChange={this.handleInputChangeFor('speed_work')}
              label="speed_work"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Yes, loads of it!'}>Yes, loads of it!</MenuItem>
              <MenuItem value={'Never heard of it.'}>
                Never heard of it.
              </MenuItem>
              <MenuItem value={'Some - I have heard of it but never tried it.'}>
                Some - I have heard of it but never tried it.
              </MenuItem>
            </Select>
          </FormControl>
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

export default connect(mapStoreToProps)(AthleteRegistrationThree);
