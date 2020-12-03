import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
} from '@material-ui/core';

class AthleteCalendarTab extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_WORKOUTS',
      payload: this.props.store.athletes.athleteDetails.id,
    });
  }
  render() {
    return (
      <div>
        <Typography variant="h5">
          {this.props.store.athletes.athleteDetails.first_name}'s workouts
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Title</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow onClick={this.handleDetails}>
                <TableCell>
                  <Typography>12/20/2020</Typography>
                </TableCell>
                <TableCell>
                  <Typography>workout hardcode #2</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AthleteCalendarTab);
