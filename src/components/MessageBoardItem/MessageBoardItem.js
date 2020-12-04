import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

//Material-UI imports
import { Button, Card, CardContent, Typography, Grid } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class MessageBoardItem extends Component {
  handleLikes = (e) => {
    console.log('like button clicked!');
  };

  handleDelete = (e) => {
    this.props.dispatch({
      type: 'DELETE_MESSAGE',
      payload: this.props.messages.id,
    });
  };

  render() {
    return (
      <Card>
        <CardContent>
          <Typography>{this.props.messages.message}</Typography>
          <Typography>Posted by: {this.props.messages.first_name}</Typography>
          <Grid container spacing={2}>
            <Grid item>
              <FavoriteBorderIcon
                onClick={this.handleLikes}
              ></FavoriteBorderIcon>
            </Grid>
            <Grid item>
              {this.props.store.user.role_id === 1 && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleDelete}
                >
                  Delete
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(MessageBoardItem));
