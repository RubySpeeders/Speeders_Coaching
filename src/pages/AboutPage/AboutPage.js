import React from 'react';

//MATERIAL-UI imports
import { Typography } from '@material-ui/core';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div className="container">
    <div>
      <Typography>
        Are you ready to start your running journey? Welcome to Speeders
        Coaching!
      </Typography>
    </div>
  </div>
);

export default AboutPage;
