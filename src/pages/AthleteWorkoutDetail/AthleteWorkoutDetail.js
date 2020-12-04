import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI imports
import {
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import Sidebar from '../../components/Sidebar/Sidebar';

class AthleteWorkoutDetail extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_WORKOUT_DETAIL',
      payload: '',
    });
  }

  handleBack = (e) => {
    this.props.history.push('/home');
  };
  render() {
    return (
      <Container>
        <Typography variant="h4">
          {this.props.store.user.first_name} {this.props.store.user.last_name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Sidebar />
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="h4">Workout Details</Typography>
              </CardContent>
            </Card>
            {/* <Button color="primary" onClick={this.handleBack}>
            Back to Calendar
          </Button> */}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AthleteWorkoutDetail);
