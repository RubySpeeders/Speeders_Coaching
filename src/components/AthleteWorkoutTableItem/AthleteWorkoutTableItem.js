import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

//import for date/time config
import { DateTime } from 'luxon';

//Material-UI imports
import { Button, Typography, TableCell, TableRow } from '@material-ui/core';

class AthleteWorkoutTableItem extends Component {
  handleDetails = (e) => {
    console.log(this.props.workout.id);
    this.props.history.push(
      `/athlete/workout/details/${this.props.workout.id}`
    );
  };
  render() {
    const date = DateTime.fromISO(this.props.workout.date);
    const humanDate = date.toLocaleString(DateTime.DATE_SHORT);
    return (
      <TableRow onClick={this.handleDetails}>
        <TableCell>
          <Typography>{humanDate}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{this.props.workout.description}</Typography>
        </TableCell>
        <TableCell>
          <Button variant="outlined" color="primary">
            Details
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(AthleteWorkoutTableItem);
