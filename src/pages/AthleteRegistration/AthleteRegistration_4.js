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
  Typography,
} from '@material-ui/core';

class AthleteRegistrationFour extends Component {
  state = {
    injury: '',
    injury_description: '',
    medication: '',
    medication_description: '',
    health_risk_comment: '',
  };

  handleNext = (e) => {
    e.preventDefault();
    // this.props.dispatch({ type: 'UPDATE_FEELING', payload: this.state });
    this.props.history.push('/registration/athlete/page5');
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
          <Typography gutterBottom>Health Details</Typography>
          {this.props.store.errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {this.props.store.errors.registrationMessage}
            </h3>
          )}

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
            <InputLabel id="long-run-day">Preferred Long Run Day</InputLabel>
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

export default connect(mapStoreToProps)(AthleteRegistrationFour);
