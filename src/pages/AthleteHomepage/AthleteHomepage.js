import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

//Material-UI imports
import {
  AppBar,
  Tabs,
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

//custom file import
import AthleteSidebar from '../../components/AthleteSidebar/AthleteSidebar';

class AthleteHomepage extends Component {
  //sends user to the message board
  messageBoard = (e) => {
    this.props.history.push('/message');
  };

  //sends user to the tips & tricks page
  tipsAndTricks = (e) => {
    this.props.history.push('/tips');
  };

  handleDetails = (e) => {
    this.props.history.push('/athlete/workout/details');
  };
  render() {
    return (
      <Container>
        <Grid container spacing={4}>
          <Grid item>
            <AthleteSidebar />
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(AthleteHomepage));
