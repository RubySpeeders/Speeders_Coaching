import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

//Material-UI imports
import {
  Button,
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class MessageBoardItem extends Component {
  handleLikes = (e) => {
    console.log('like button clicked!');
  };

  handleDelete = (e) => {
    console.log(this.props.messages.id);
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
          <Typography>Runner: {this.props.messages.first_name}</Typography>
          {this.props.store.user.role_id === 1 ? (
            <Button onClick={this.handleDelete}>Delete</Button>
          ) : (
            <></>
          )}
          <FavoriteBorderIcon onClick={this.handleLikes}></FavoriteBorderIcon>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(MessageBoardItem));
