import React, { Component } from 'react';

//MATERIAL-UI imports
import { Container, Typography, Grid } from '@material-ui/core';
import CoachSidebar from '../../components/CoachSidebar/CoachSidebar';

class AddAthleteSuccess extends Component {
  render() {
    return (
      <div>
        <CoachSidebar />
        <Typography>You successfully added an athlete!</Typography>
      </div>
    );
  }
}

export default AddAthleteSuccess;
