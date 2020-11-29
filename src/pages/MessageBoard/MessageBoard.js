import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';

//custom file import
import MessageBoardItem from '../../components/MessageBoardItem/MessageBoardItem';
import CoachSidebar from '../../components/CoachSidebar/CoachSidebar';

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
        <Grid container>
          <Grid item xs={3}>
            <CoachSidebar />
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <form onSubmit={this.postMessage}>
                  <TextField
                    placeholder="write a message!"
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange}
                    value={this.state.message}
                  />

                  <Button type="submit" variant="contained">
                    Post
                  </Button>
                </form>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              {this.props.store.messages.map((item, index) => (
                <Grid item key={index} xs={12}>
                  <MessageBoardItem key={index} messages={item} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(MessageBoard);
