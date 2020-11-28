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
} from '@material-ui/core';

class AthleteRegistrationFive extends Component {
  state = {
    life_outside_running: '',
    general_comments: '',
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
        <Typography>More fun stuff!</Typography>
        <form onSubmit={this.handleNext}>
          <Grid container spacing={6}>
            <Grid item>
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
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item>
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
            </Grid>
          </Grid>
          <Box m={2}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AthleteRegistrationFive);
