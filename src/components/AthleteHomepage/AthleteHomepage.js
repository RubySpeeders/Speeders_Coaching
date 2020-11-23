import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AthleteHomepage extends Component {
  render() {
    return (
      <div>
        <h3>Athlete PAGE</h3>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AthleteHomepage);
