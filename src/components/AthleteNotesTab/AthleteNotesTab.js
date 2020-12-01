import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AthleteNotesTab extends Component {
  componentDidMount() {
    console.log(this.props.store);
  }
  render() {
    return (
      <div>
        <p>Athlete Notes</p>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AthleteNotesTab);
