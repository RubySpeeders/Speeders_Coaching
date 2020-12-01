import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//SWEET ALERT
import Swal from 'sweetalert2';

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
  componentDidMount() {
    //dispatch to get all exercise types for checkboxes
    this.props.dispatch({ type: 'GET_EXERCISES' });
  }
  state = {
    other_exercise: {},
    life_outside_running: '',
    general_comments: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //send answers to athlete registration reducer, saved until after sweet alert
    this.props.dispatch({ type: 'UPDATE_ATHLETE', payload: this.state });
    Swal.fire({
      title: 'Are you sure?',
      text: 'Click the submit button to save your feedback.',
      icon: 'question',
      confirmButtonText: `SUBMIT`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.dispatch({
          type: 'FINALISE_ATHLETE',
          payload: {
            athlete: { ...this.props.store.athleteRegistration, ...this.state },
          },
        });
      }
    });
    this.props.history.push('/home');
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

  //goes back a page
  onBackClick = (e) => {
    this.props.history.push('/registration/athlete/page4');
  };

  render() {
    const other_exercise = this.props.store.exercises.map((item, index) => {
      return (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              value={item.id}
              onChange={this.handleChangeForChecks(item.id)}
              name={item.description}
            />
          }
          label={item.description}
        />
      );
    });
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
                <FormGroup row>{other_exercise}</FormGroup>
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
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={this.onBackClick}
                >
                  Back
                </Button>
                <Button color="secondary" type="submit" variant="contained">
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
