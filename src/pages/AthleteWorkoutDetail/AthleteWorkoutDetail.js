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
  CircularProgress,
} from '@material-ui/core';

//import for date/time config
import { DateTime } from 'luxon';

import AthleteWorkoutDetailItem from '../../components/AthleteWorkoutDetailItem/AthleteWorkoutDetailItem';

class AthleteWorkoutDetail extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_WORKOUT_DETAIL',
      payload: this.props.match.params.id,
    });
    console.log(this.props.store);
  }

  handleBack = (e) => {
    this.props.history.push('/home');
  };

  handleComplete = (e) => {
    this.props.dispatch({
      type: 'MARK_WORKOUT_COMPLETE',
      payload: this.props.match.params.id,
    });
  };

  render() {
    return (
      <Container>
        <Typography variant="h4">
          {this.props.store.user.first_name} {this.props.store.user.last_name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="opacity">
              <Card>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    Workout Details
                  </Typography>
                  {this.props.store.workouts[0] != null ? (
                    <div>
                      <Typography variant="h6" gutterBottom>
                        {this.props.store.workouts[0].description}
                      </Typography>
                      {/* <Typography>{humanDate}</Typography> */}
                    </div>
                  ) : (
                    <CircularProgress color="secondary" />
                  )}
                  {this.props.store.workouts.map((item, index) => {
                    return (
                      <Grid container spacing={2} key={index}>
                        <AthleteWorkoutDetailItem workouts={item} />
                      </Grid>
                    );
                  })}
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={this.handleComplete}
                  >
                    Mark Complete
                  </Button>
                  &nbsp;
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={this.handleBack}
                  >
                    Back to Calendar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AthleteWorkoutDetail);
