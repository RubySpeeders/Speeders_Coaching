import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI
import { Grid, Card } from '@material-ui/core';

//custom file import
import MessageBoardItem from '../../components/MessageBoardItem/MessageBoardItem';

class MessageBoard extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_MESSAGES',
    });
  }
  render() {
    return (
      <div>
        <h3>Message Board</h3>
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
