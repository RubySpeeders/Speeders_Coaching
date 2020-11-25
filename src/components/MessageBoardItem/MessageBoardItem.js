import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Material-UI imports
import {
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';

class MessageBoardItem extends Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography>{this.props.messages.message}</Typography>
          <Typography>Runner: {this.props.messages.first_name}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(connect()(MessageBoardItem));
