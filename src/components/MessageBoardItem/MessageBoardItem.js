import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class MessageBoardItem extends Component {
  render() {
    return (
      <div>
        <p>{this.props.messages.message}</p>
        <p>User: {this.props.messages.first_name}</p>
      </div>
    );
  }
}

export default withRouter(connect()(MessageBoardItem));
