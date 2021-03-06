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
        <div className="opacity">
          <Grid container justify="space-evenly">
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Health Information
              </Typography>
              <form onSubmit={this.handleNext}>
                <Box mb={2}>
                  <Grid container justify="space-evenly">
                    <Grid item xs={6}>
                      {/* <FormControl> */}

                      <FormLabel>Are you currently injured?</FormLabel>
                      <RadioGroup
                        color="secondary"
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
                        fullWidth
                        placeholder="If currently injured, describe your injury, date of onset, and severity."
                        type="text"
                        name="injury_description"
                        value={this.state.injury_description}
                        variant="outlined"
                        multiline
                        rows={4}
                        onChange={this.handleInputChangeFor(
                          'injury_description'
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Grid container justify="space-evenly">
                  <Grid item xs={6}>
                    <FormLabel>
                      Are you currently taking any medications?
                    </FormLabel>
                    <RadioGroup
                      onChange={this.handleInputChangeFor('medication')}
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
                      fullWidth
                      placeholder="If currently taking medication, please describe how often and how long you have been taking."
                      type="text"
                      name="medication_description"
                      value={this.state.medication_description}
                      variant="outlined"
                      multiline
                      rows={4}
                      onChange={this.handleInputChangeFor(
                        'medication_description'
                      )}
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  placeholder="Are there any other health risks you want me to know about?"
                  type="text"
                  name="health_risk_comments"
                  value={this.state.health_risk_comments}
                  variant="outlined"
                  multiline
                  rows={4}
                  onChange={this.handleInputChangeFor('health_risk_comments')}
                />
                {/* </FormControl> */}
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
                      <Button
                        color="secondary"
                        type="submit"
                        variant="outlined"
                      >
                        Next
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AthleteRegistrationFour);
