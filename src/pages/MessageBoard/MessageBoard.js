import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';

//custom file import
import MessageBoardItem from '../../components/MessageBoardItem/MessageBoardItem';
import Sidebar from '../../components/Sidebar/Sidebar';

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
        <Grid container justify="flex-start">
          <Grid item>
            <Typography gutterBottom variant="h4" component="h3">
              Message Board
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="space-evenly">
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={10}>
            <div className="opacity">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <form onSubmit={this.postMessage}>
                    <Grid container alignItems="center">
                      <Grid item xs={10}>
                        <TextField
                          required
                          placeholder="write a message!"
                          variant="outlined"
                          fullWidth
                          onChange={this.handleChange}
                          value={this.state.message}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Box m={2}>
                          <Button
                            color="primary"
                            type="submit"
                            variant="outlined"
                          >
                            Post
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                {this.props.store.messages.map((item, index) => (
                  <Grid item key={index} xs={12}>
                    <MessageBoardItem key={index} messages={item} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(MessageBoard);
