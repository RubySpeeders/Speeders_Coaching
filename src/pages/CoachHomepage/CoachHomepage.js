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

//file imoprts
import AthleteInfo from '../../components/AthleteInfo/AthleteInfo';

class CoachHomepage extends Component {
  componentDidMount() {
    //get all athletes on page load
    this.props.dispatch({ type: 'GET_ATHLETES' });
  }
  //sends user to the message board
  messageBoard = (e) => {
    this.props.history.push('/message');
  };

  //sends user to the tips & tricks page
  tipsAndTricks = (e) => {
    this.props.history.push('/tips');
  };

  //sends coach to add athlete registration
  addAthlete = (e) => {
    this.props.history.push('/register/athlete');
  };

  render() {
    return (
      <Container>
        <Typography variant="h3" component="h3">
          Coach PAGE
        </Typography>
        <div onClick={this.messageBoard}>Messages</div>
        <div onClick={this.tipsAndTricks}>Tips/Tricks</div>
        <Grid container spacing={4}>
          {this.props.store.athletes.map((item, index) => (
            <Grid key={index} item xs={12}>
              <AthleteInfo key={index} athlete={item} />
            </Grid>
          ))}
        </Grid>
        <Button variant="outlined" onClick={this.addAthlete}>
          Add an Athlete
        </Button>
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
