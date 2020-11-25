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
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Container,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

class CoachHomepage extends Component {
  messageBoard = (e) => {
    this.props.history.push('/message');
  };
  render() {
    return (
      <Container>
        <Typography variant="h3" component="h3">
          Coach PAGE
        </Typography>
        <button onClick={this.messageBoard}>Messages</button>
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
