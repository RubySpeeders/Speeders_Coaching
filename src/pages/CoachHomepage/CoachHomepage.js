import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI imports
import {
  AppBar,
  Tabs,
  Container,
  Button,
  Grid,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

class CoachHomepage extends Component {
  render() {
    return (
      <div>
        <h3>Coach PAGE</h3>
        <Drawer>
          <List>
            <ListItem>
              <ListItemText primary="test" />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CoachHomepage);
