import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI
import {
  Box,
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
import Sidebar from '../../components/Sidebar/Sidebar';

function AthleteDetails(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(props.match.params.id);
    // DISPATCH TO GET ALL ATHLETE DETAILS
    dispatch({
      type: 'GET_ATHLETE_DETAILS',
      payload: props.match.params.id,
    });
  }, [dispatch, props.match.params.id]);

  const handleBack = (e) => {
    props.history.push('/home');
  };

  //config for tabs
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container>
      <Sidebar />
      <Typography variant="h4" gutterBottom>
        Athlete Details
      </Typography>
      <Box ml={10}>
        <Typography>
          {props.store.athletes.athleteDetails.first_name}{' '}
          {props.store.athletes.athleteDetails.last_name}
        </Typography>
      </Box>
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
      {selectedTab === 4 && <AddWorkoutTab athlete={props.match.params.id} />}
      <Button color="primary" onClick={handleBack}>
        Back
      </Button>
    </Container>
  );
}

export default connect(mapStoreToProps)(AthleteDetails);
