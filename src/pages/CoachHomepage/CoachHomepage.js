import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

//Material-UI imports
import {
  AppBar,
  Tabs,
  Button,
  Grid,
  Container,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

class CoachHomepage extends Component {
  //sends user to the message board
  messageBoard = (e) => {
    this.props.history.push('/message');
  };

  //sends user to the tips & tricks page
  tipsAndTricks = (e) => {
    this.props.history.push('/tips');
  };

  render() {
    return (
      <Container>
        <Typography variant="h3" component="h3">
          Coach PAGE
        </Typography>
        <div onClick={this.messageBoard}>Messages</div>
        <div onClick={this.tipsAndTricks}>Tips/Tricks</div>
        <Drawer>
          <List>
            <ListItem>
              <ListItemText primary="test" />
            </ListItem>
          </List>
        </Drawer>
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(CoachHomepage));
