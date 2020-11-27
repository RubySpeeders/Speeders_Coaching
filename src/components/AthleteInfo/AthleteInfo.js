import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Material-UI imports
import { Button, Card, CardContent, Typography } from '@material-ui/core';

class MessageBoardItem extends Component {
  deleteAthlete = (e) => {
    console.log(this.props.match.params);
    //this.props.dispatch({ type: 'DELETE_ATHLETE', payload: this.props.match.params.id });
  };
  render() {
    return (
      <Card>
        <CardContent>
          <Typography>{this.props.athlete.first_name}</Typography>
          <Typography>{this.props.athlete.last_name}</Typography>
          <Typography>{this.props.athlete.gender}</Typography>
          <Button variant="outlined" onClick={this.deleteAthlete}>
            Delete
          </Button>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(connect()(MessageBoardItem));
