import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  render() {
    return (
      <Card>
        <CardContent>
          <Typography>{this.props.messages.message}</Typography>
          <Typography>Runner: {this.props.messages.first_name}</Typography>
          {/* {this.props.messages.user_id === this.props.store.user.id ? (
            <Button>Delete</Button>
          ) : (
            <div></div>
          )} */}
          <FavoriteBorderIcon onClick={this.handleLikes}></FavoriteBorderIcon>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(connect()(MessageBoardItem));
