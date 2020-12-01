import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Material-UI imports
import { Grid, Typography } from '@material-ui/core';

class AthleteSidebar extends Component {
  //sends coach to the message board
  messageBoard = (e) => {
    this.props.history.push('/message');
  };

  //sends coach to the tips & tricks page
  tipsAndTricks = (e) => {
    this.props.history.push('/tips');
  };

  handleHome = (e) => {
    this.props.history.push('/home');
  };

  render() {
    return (
      <Grid item>
        <Typography onClick={this.handleHome}>Workouts</Typography>
        <Typography onClick={this.messageBoard}>Messages</Typography>
        <Typography onClick={this.tipsAndTricks}>Tips/Tricks</Typography>
      </Grid>
    );
  }
}

export default withRouter(connect()(AthleteSidebar));
