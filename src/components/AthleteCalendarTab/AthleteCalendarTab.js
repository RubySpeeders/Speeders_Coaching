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
  render() {
    return (
      <div>
        <Typography variant="h5">Your workouts</Typography>
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
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow onClick={this.handleDetails}>
                <TableCell>
                  <Typography>workout hardcode #1</Typography>
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
