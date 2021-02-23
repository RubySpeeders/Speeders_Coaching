import React, { Component } from 'react';

//Material-UI imports
import { Grid, Typography } from '@material-ui/core';

class AthleteWorkoutDetailItem extends Component {
  render() {
    return (
      <Grid item xs={12}>
        <Typography>{this.props.workouts.step}</Typography>
        <Typography>Distance: {this.props.workouts.distance}</Typography>
        <Typography>Pace: {this.props.workouts.pace}</Typography>
      </Grid>
    );
  }
}

export default AthleteWorkoutDetailItem;
