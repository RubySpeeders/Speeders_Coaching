import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

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
import AthleteNotesTab from '../../components/AthleteNotesTab/AthleteNotesTab';
import AddWorkoutTab from '../../components/AddWorkoutTab/AddWorkoutTab';
import AthleteContactTab from '../../components/AthleteContactTab/AthleteContactTab';
import AthleteCalendarTab from '../../components/AthleteCalendarTab/AthleteCalendarTab';

function AthleteDetails(props) {
  useEffect(() => {
    console.log(props);
    // Update the document title using the browser API
    // props.dispatch({
    //   type: 'GET_ATHLETES',
    // payload: this.props.match.params.id,
    // });
  });

  const handleBack = (e) => {
    props.history.push('/home');
  };

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container>
      <Typography variant="h4">Athlete Details</Typography>
      <Typography>
        {props.store.athletes.athleteDetails.first_name}{' '}
        {props.store.athletes.athleteDetails.last_name}
      </Typography>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Athlete Details" />
        <Tab label="Calendar Workouts" />
        <Tab label="Notes" />
        <Tab label="Contact" />
        <Tab label="Assign Workout" />
      </Tabs>

      {selectedTab === 0 && <AthleteDetailsTab />}
      {selectedTab === 1 && <AthleteCalendarTab />}
      {selectedTab === 2 && (
        <AthleteNotesTab athlete={props.store.athletes.athleteDetails} />
      )}
      {selectedTab === 3 && <AthleteContactTab />}
      {selectedTab === 4 && <AddWorkoutTab />}
      <Button color="primary" onClick={handleBack}>
        Back
      </Button>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    componentDidMount: () =>
      dispatch({
        type: 'GET_ATHLETES',
        // payload: this.props.match.params.id,
      }),
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(withRouter(AthleteDetails));
