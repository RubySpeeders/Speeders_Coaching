import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI
import {
  Container,
  Grid,
  Card,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';

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
    this.setState({
      message: '',
    });
  };
  render() {
    return (
      <Container>
        <Typography gutterBottom variant="h4" component="h3">
          Message Board
        </Typography>
        <form onSubmit={this.postMessage}>
          <TextField
            placeholder="write a message!"
            variant="outlined"
            fullWidth
            onChange={this.handleChange}
            value={this.state.message}
          />
          <div>
            <Button type="submit" variant="contained">
              Post
            </Button>
          </div>
        </form>
        <Grid container spacing={4}>
          {this.props.store.messages.map((item, index) => (
            <Grid key={index} item xs={12}>
              <MessageBoardItem key={index} messages={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(MessageBoard);
