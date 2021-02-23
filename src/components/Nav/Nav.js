import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

//material-ui imports
import { Typography, Container, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Sidebar from '../Sidebar/Sidebar';

const StyledTypography = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
  },
  h2: {
    fontSize: '4rem',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
}))(Typography);

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  const goHome = (e) => {
    console.log(props.dispatch);
    props.history.push('/home');
  };

  return (
    <div className="nav">
      <Container>
        <div onClick={goHome}>
          <StyledTypography component="h2" variant="h2" fontStyle="italic">
            Speeders
          </StyledTypography>
          <Box ml={5}>
            <StyledTypography component="h2" variant="h3">
              coaching
            </StyledTypography>
          </Box>
        </div>
      </Container>

      <div className="nav-right">
        {/* <Link className="nav-link" to={loginLinkData.path}> */}
        {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
        {/* {loginLinkData.text}
        </Link> */}
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            {/* <Link className="nav-link" to="/info">
              Info Page
            </Link> */}
            {/* <LogOutButton className="nav-link" /> */}

            <Sidebar />
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(connect(mapStoreToProps)(Nav));
