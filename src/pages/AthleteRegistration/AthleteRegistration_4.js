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
  Box,
  Typography,
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
    //send answers to athlete registration reducer, saved until the last page
    this.props.dispatch({ type: 'UPDATE_ATHLETE', payload: this.state });
    //goes to next page of registration
    this.props.history.push('/registration/athlete/page5');
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  //goes back a page
  onBackClick = (e) => {
    this.props.history.push('/registration/athlete/page3');
  };

  render() {
    return (
      <Container>
        <form onSubmit={this.handleNext}>
          <Typography variant="h4">Health Information</Typography>
          <FormControl component="fieldset">
            <Grid container spacing={6} justify="space-evenly">
              <Grid item xs={6}>
                <FormLabel component="legend">
                  Are you currently injured?
                </FormLabel>
                <RadioGroup
                  required
                  onChange={this.handleInputChangeFor('injury')}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="yes"
                  />
                  <FormControlLabel
                    value="false"
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
                <RadioGroup onChange={this.handleInputChangeFor('medication')}>
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="yes"
                  />
                  <FormControlLabel
                    value="false"
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
          <Box m={2}>
            <Button
              color="secondary"
              variant="contained"
              onClick={this.onBackClick}
            >
              Back
            </Button>
            <Button color="secondary" type="submit" variant="contained">
              Next
            </Button>
          </Box>
        </form>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AthleteRegistrationFour);
