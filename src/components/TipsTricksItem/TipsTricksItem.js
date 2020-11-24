import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TipsTricksItem extends Component {
  render() {
    return (
      <div>
        <p>{this.props.tips.comments}</p>
        <p>User: {this.props.tips.first_name}</p>
      </div>
    );
  }
}

export default withRouter(connect()(TipsTricksItem));
