import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AthleteHomepage extends Component {
  //sends user to the message board
  messageBoard = (e) => {
    this.props.history.push('/message');
  };

  //sends user to the tips & tricks page
  tipsAndTricks = (e) => {
    this.props.history.push('/tips');
  };
  render() {
    return (
      <div>
        <h3>Athlete PAGE</h3>
        <div onClick={this.messageBoard}>Messages</div>
        <div onClick={this.tipsAndTricks}>Tips/Tricks</div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AthleteHomepage);
