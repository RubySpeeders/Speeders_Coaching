import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import {
  Container,
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

class AthleteRegistrationFive extends Component {
  state = {
    other_exercise: {
      yoga: false,
      barre: false,
      cycling: false,
      crossfit: false,
      weight_lifting: false,
      dance: false,
      hiit: false,
      pilates: false,
    },
    life_outside_running: '',
    general_comments: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch({ type: 'REGISTER_PAGE_FIVE', payload: this.state });
    this.props.history.push('/home');
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleChangeForChecks = (propertyName) => (event) => {
    this.setState({
      other_exercise: {
        ...this.state.other_exercise,
        [propertyName]: event.target.checked,
      },
    });
  };

  render() {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          More fun stuff!
        </Typography>
        <Grid container justify="space-evenly">
          <Grid item>
            <form onSubmit={this.handleSubmit}>
              <FormControl>
                <FormLabel>
                  Check all other forms of exercise you enjoy:
                </FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.other_exercise.yoga === true}
                        onChange={this.handleChangeForChecks('yoga')}
                        name="yoga"
                      />
                    }
                    label="yoga"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.other_exercise.barre === true}
                        onChange={this.handleChangeForChecks('barre')}
                        name="barre"
                      />
                    }
                    label="barre"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.other_exercise.cycling === true}
                        onChange={this.handleChangeForChecks('cycling')}
                        name="cycling"
                      />
                    }
                    label="cycling"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.other_exercise.crossfit === true}
                        onChange={this.handleChangeForChecks('crossfit')}
                        name="crossfit"
                      />
                    }
                    label="crossfit"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          this.state.other_exercise.weight_lifting === true
                        }
                        onChange={this.handleChangeForChecks('weight_lifting')}
                        name="weight_lifting"
                      />
                    }
                    label="weight lifting"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.other_exercise.dance === true}
                        onChange={this.handleChangeForChecks('dance')}
                        name="dance"
                      />
                    }
                    label="dance"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.other_exercise.hiit === true}
                        onChange={this.handleChangeForChecks('hiit')}
                        name="hiit"
                      />
                    }
                    label="HIIT"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.other_exercise.pilates === true}
                        onChange={this.handleChangeForChecks('pilates')}
                        name="pilates"
                      />
                    }
                    label="pilates"
                  />
                </FormGroup>
              </FormControl>

              <TextField
                placeholder="Describe your life outside of running"
                type="text"
                name="life_outside_running"
                value={this.state.life_outside_running}
                variant="outlined"
                multiline
                rows={4}
                onChange={this.handleInputChangeFor('life_outside_running')}
              />

              <TextField
                placeholder="Any other comments or details you want to share"
                type="text"
                name="general_comments"
                value={this.state.general_comments}
                variant="outlined"
                multiline
                rows={4}
                onChange={this.handleInputChangeFor('general_comments')}
              />

              <Box m={2}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AthleteRegistrationFive);
