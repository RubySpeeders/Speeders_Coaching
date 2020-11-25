import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI
import { Grid, Card, TextField, Button, Typography } from '@material-ui/core';

//custom file import
import MessageBoardItem from '../../components/MessageBoardItem/MessageBoardItem';

class MessageBoard extends Component {
  state = {
    message: '',
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_MESSAGES',
    });
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      message: e.target.value,
    });
  };

  postMessage = (e) => {
    e.preventDefault();
    this.props.dispatch({ type: 'POST_MESSAGE', payload: this.state });
  };
  render() {
    return (
      <div>
        <Typography gutterBottom>Message Board</Typography>
        <form onSubmit={this.postMessage}>
          <TextField
            placeholder="write a message!"
            variant="outlined"
            onChange={this.handleChange}
          />
          <Button type="submit" variant="contained">
            Post
          </Button>
        </form>
        <Grid container>
          {this.props.store.messages.map((item, index) => (
            <Grid item>
              <MessageBoardItem key={index} messages={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MessageBoard);
