import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Material-UI imports
import { Card, CardContent, Typography } from '@material-ui/core';

class MessageBoardItem extends Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography>{this.props.athlete.first_name}</Typography>
          <Typography>{this.props.athlete.last_name}</Typography>
          <Typography>{this.props.athlete.gender}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(connect()(MessageBoardItem));
