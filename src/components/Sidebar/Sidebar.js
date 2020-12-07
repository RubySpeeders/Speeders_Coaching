import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI imports
import { Grid, Button, Menu, MenuItem } from '@material-ui/core';

function Sidebar(props) {
  //sends coach to the main all athletes page
  const homePage = (e) => {
    props.history.push('/home');
  };

  //sends coach to the message board
  const messageBoard = (e) => {
    props.history.push('/message');
  };

  //sends coach to the tips & tricks page
  const tipsAndTricks = (e) => {
    props.history.push('/tips');
  };

  //sends coach to add athlete registration
  const addAthlete = (e) => {
    props.history.push('/register/add/athlete');
  };

  //MENU config
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item>
      <Button onClick={handleClick}>
        <img src="./running-stick-figure.png" alt="running stick figure" />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.store.user.role_id === 1 ? (
          <MenuItem onClick={homePage}>All Athletes</MenuItem>
        ) : (
          <MenuItem onClick={homePage}>All Workouts</MenuItem>
        )}
        <MenuItem onClick={messageBoard}>Messages</MenuItem>
        <MenuItem onClick={tipsAndTricks}>Tips/Tricks</MenuItem>
        {props.store.user.role_id === 1 && (
          <MenuItem onClick={addAthlete}>Add an Athlete</MenuItem>
        )}
      </Menu>
    </Grid>
  );
}

export default withRouter(connect(mapStoreToProps)(Sidebar));
