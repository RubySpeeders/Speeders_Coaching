import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

//Material-UI imports
import {
  AppBar,
  Tabs,
  Button,
  Card,
  CardContent,
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
import Sidebar from '../../components/Sidebar/Sidebar';
import AthleteWorkoutTableItem from '../../components/AthleteWorkoutTableItem/AthleteWorkoutTableItem';

class AthleteHomepage extends Component {
  //get all workouts for athlete(user)
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_WORKOUTS',
      payload: this.props.store.user.id,
    });
  }

  //sends user to the message board
  messageBoard = (e) => {
    this.props.history.push('/message');
  };

  //sends user to the tips & tricks page
  tipsAndTricks = (e) => {
    this.props.history.push('/tips');
  };

  render() {
    return (
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={10}>
            <div className="opacity">
              <Card>
                <CardContent>
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
                          <TableCell>
                            <Typography>Actions</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.props.store.workouts.map((item, index) => {
                          return (
                            <AthleteWorkoutTableItem
                              workout={item}
                              key={index}
                            />
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(AthleteHomepage));
