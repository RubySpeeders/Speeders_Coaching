import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

//material-ui imports
import { Typography, Box, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
          <StyledTypography component="h2" variant="h3">
            coaching
          </StyledTypography>
        </div>
      </Container>

      <div className="nav-right">
        {/* <Link className="nav-link" to="/home">
          Home
        </Link> */}
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            <Link className="nav-link" to="/info">
              Info Page
            </Link>
            <LogOutButton className="nav-link" />
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        {/* <Link className="nav-link" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
