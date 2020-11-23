import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class CoachHomepage extends Component {
  render() {
    return (
      <div>
        <h3>Coach PAGE</h3>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CoachHomepage);
