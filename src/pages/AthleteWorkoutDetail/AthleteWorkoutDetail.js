import React, { Component } from 'react';

//Material-UI imports
import {
  Button,
  Grid,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from '@material-ui/core';

class AthleteWorkoutDetail extends Component {
  handleBack = (e) => {
    this.props.history.push('/home');
  };
  render() {
    return (
      <div>
        <Typography>Workout Details</Typography>
        <Button color="primary" onClick={this.handleBack}>
          Back to Calendar
        </Button>
      </div>
    );
  }
}

export default AthleteWorkoutDetail;
