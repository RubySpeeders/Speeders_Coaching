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
    console.log('details clicked');
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
          <Typography>{this.props.athlete.gender}</Typography>
        </TableCell>
        <TableCell>
          <Button onClick={this.handleDetails}>Details</Button>
          <Button onClick={this.deleteAthlete}>Delete</Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(connect()(AthleteInfo));
