import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Material-UI imports
import {
  Button,
  Card,
  CardContent,
  Typography,
  TableCell,
  TableRow,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class AthleteInfo extends Component {
  //delete an athlete
  deleteAthlete = (e) => {
    this.props.dispatch({
      type: 'DELETE_ATHLETE',
      payload: this.props.athlete.id,
    });
  };

  //go to details of specific athlete
  handleDetails = (e) => {
    this.props.history.push(`/athlete/details/${this.props.athlete.id}`);
  };

  render() {
    return (
      <TableRow>
        <TableCell>
          <Typography>
            {this.props.athlete.first_name} {this.props.athlete.last_name}
          </Typography>
        </TableCell>
        <TableCell>
          <Button color="primary" onClick={this.handleDetails}>
            Details
          </Button>
          <Button color="primary" onClick={this.deleteAthlete}>
            <DeleteIcon />
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(connect()(AthleteInfo));
