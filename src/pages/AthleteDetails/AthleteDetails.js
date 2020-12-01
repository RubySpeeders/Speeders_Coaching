import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI
import {
  Tabs,
  Tab,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';

//custom file imports
import AthleteDetailsTab from '../../components/AthleteDetailsTab/AthleteDetailsTab';

class AthleteDetails extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ATHLETE_DETAILS',
      payload: this.props.match.params.id,
    });
    console.log(this.props.store);
  }
  handleBack = (e) => {
    this.props.history.push('/home');
  };

  handleAssignWorkout = (e) => {
    this.props.history.push('/assign/workout');
  };

  // handleTabChange = (event, newValue) => {
  //   this.setState({
  //     selectedTab: newValue,
  //   });
  // };

  render() {
    return (
      <Container>
        <Typography variant="h4">Athlete Details</Typography>
        <Typography>
          {this.props.store.athletes.athleteDetails.first_name}{' '}
          {this.props.store.athletes.athleteDetails.last_name}
        </Typography>
        <Tabs onChange={this.handleTabChange}>
          <Tab label="Athlete Details" children={AthleteDetailsTab} />
          <Tab label="Calendar Workouts" />
          <Tab label="Notes" />
          <Tab label="Contact" />
          <Tab label="Assign Workout" />
        </Tabs>

        <Button onClick={this.handleAssignWorkout}>Assign a Workout</Button>
        <Button onClick={this.handleBack}>Back</Button>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AthleteDetails);
