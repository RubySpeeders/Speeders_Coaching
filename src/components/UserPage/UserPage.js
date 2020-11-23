import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

//custom component imports
import CoachHomepage from '../CoachHomepage/CoachHomepage';
import AthleteHomepage from '../AthleteHomepage/AthleteHomepage';

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        {this.props.store.user.role_id === 1 ? (
          <CoachHomepage />
        ) : (
          <div>
            <AthleteHomepage />
          </div>
        )}
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
