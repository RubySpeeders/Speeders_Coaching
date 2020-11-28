import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import {
  Container,
  Button,
  Radio,
  RadioGroup,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Typography,
  Box,
} from '@material-ui/core';

class AthleteRegistrationFour extends Component {
  state = {
    injury: '',
    injury_description: '',
    medication: '',
    medication_description: '',
    health_risk_comments: '',
  };

  handleNext = (e) => {
    e.preventDefault();
    // this.props.dispatch({ type: 'UPDATE_FEELING', payload: this.state });
    this.props.history.push('/registration/athlete/page5');
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
        <form onSubmit={this.handleNext}>
          <FormControl>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <FormLabel>Are you currently injured?</FormLabel>
                <RadioGroup>
                  <FormControlLabel
                    checked={this.state.injury === true}
                    onChange={this.handleInputChangeFor('injury')}
                    value={true}
                    control={<Radio />}
                    label="yes"
                  />
                  <FormControlLabel
                    checked={this.state.injury === false}
                    onChange={this.handleInputChangeFor('injury')}
                    value={false}
                    control={<Radio />}
                    label="no"
                  />
                </RadioGroup>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  placeholder="If currently injured, describe your injury, date of onset, and severity."
                  type="text"
                  name="injury_description"
                  value={this.state.injury_description}
                  variant="outlined"
                  multiline
                  rows={4}
                  onChange={this.handleInputChangeFor('injury_description')}
                />
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <FormLabel>Are you currently taking any medications?</FormLabel>
                <RadioGroup>
                  <FormControlLabel
                    checked={this.state.medication === true}
                    onChange={this.handleInputChangeFor('medication')}
                    value={true}
                    control={<Radio />}
                    label="yes"
                  />
                  <FormControlLabel
                    checked={this.state.medication === false}
                    onChange={this.handleInputChangeFor('medication')}
                    value={false}
                    control={<Radio />}
                    label="no"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  placeholder="If currently taking medication, please describe how often and how long you have been taking."
                  type="text"
                  name="medication_description"
                  value={this.state.medication_description}
                  variant="outlined"
                  multiline
                  rows={4}
                  onChange={this.handleInputChangeFor('medication_description')}
                />
              </Grid>
            </Grid>
            <TextField
              placeholder="Are there any other health risks you want me to know about?"
              type="text"
              name="health_risk_comments"
              value={this.state.health_risk_comments}
              variant="outlined"
              multiline
              rows={4}
              onChange={this.handleInputChangeFor('health_risk_comments')}
            />
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
