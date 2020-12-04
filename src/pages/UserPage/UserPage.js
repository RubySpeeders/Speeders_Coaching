import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../components/LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import { Typography } from '@material-ui/core';

//custom component imports
import CoachHomepage from '../CoachHomepage/CoachHomepage';
import AthleteHomepage from '../AthleteHomepage/AthleteHomepage';

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
        <Typography variant="h2" component="h1" id="welcome">
          Welcome, {this.props.store.user.first_name}!
        </Typography>
        {this.props.store.user.role_id === 1 ? (
          <CoachHomepage />
        ) : (
          <AthleteHomepage />
        )}
        {/* <LogOutButton className="log-in" /> */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
