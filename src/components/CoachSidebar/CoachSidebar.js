import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Material-UI imports
import { Grid, Typography } from '@material-ui/core';

class CoachSidebar extends Component {
  //sends coach to the main all athletes page
  allAthletes = (e) => {
    this.props.history.push('/home');
  };

  //sends coach to the message board
  messageBoard = (e) => {
    this.props.history.push('/message');
  };

  //sends coach to the tips & tricks page
  tipsAndTricks = (e) => {
    this.props.history.push('/tips');
  };

  //sends coach to add athlete registration
  addAthlete = (e) => {
    this.props.history.push('/register/add/athlete');
  };

  render() {
    return (
      <Grid item>
        <Typography onClick={this.allAthletes}>All Athletes</Typography>
        <Typography onClick={this.messageBoard}>Messages</Typography>
        <Typography onClick={this.tipsAndTricks}>Tips/Tricks</Typography>
        <Typography onClick={this.addAthlete}>Add an Athlete</Typography>
      </Grid>
    );
  }
}

export default withRouter(connect()(CoachSidebar));
