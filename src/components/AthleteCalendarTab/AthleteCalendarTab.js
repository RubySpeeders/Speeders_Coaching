import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import {
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

//import for date/time config
import { DateTime } from 'luxon';

class AthleteCalendarTab extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_WORKOUTS',
      payload: this.props.store.athletes.athleteDetails.id,
    });
    // this.props.dispatch({
    //   type: 'GET_WORKOUT_DETAILS',
    //   payload: this.props.xxxxx,
    // })
  }
  handleDetails = (e) => {
    console.log(this.props.store.workouts.id);
  };
  render() {
    const workouts = this.props.store.workouts.map((item, index) => {
      const date = DateTime.fromISO(item.date);
      const humanDate = date.toLocaleString(DateTime.DATE_SHORT);
      return (
        <TableRow key={index}>
          <TableCell>
            <Typography>{humanDate}</Typography>
          </TableCell>
          <TableCell>
            <Typography>{item.description}</Typography>
          </TableCell>
          <TableCell>
            {item.complete_status ? (
              <Typography>Complete</Typography>
            ) : (
              <Typography>Not complete</Typography>
            )}
            <Typography>{item.complete_status}</Typography>
          </TableCell>
          <TableCell>
            <Button onClick={this.handleDetails} color="primary">
              Details
            </Button>
            <Button variant="outlined" color="primary">
              <EditIcon />
            </Button>
            &nbsp;
            <Button variant="outlined" color="primary">
              <DeleteIcon />
            </Button>
          </TableCell>
        </TableRow>
      );
    });
    return (
      <div>
        <Card>
          <CardContent>
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
                      <Typography>Status</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Actions</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{workouts}</TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AthleteCalendarTab);
