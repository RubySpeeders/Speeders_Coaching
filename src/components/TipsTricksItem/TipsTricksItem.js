import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

//Material-UI
import { Grid, Typography } from '@material-ui/core';

class TipsTricksItem extends Component {
  render() {
    return (
      <Grid container>
        {this.props.store.tips.map((item, index) => (
          <Grid item key={index}>
            <Grid container>
              <Typography component="h4">{this.props.tips.title}</Typography>
              <Typography component="p">
                {this.props.tips.article_link}
              </Typography>
              <Typography component="p">{this.props.tips.comments}</Typography>
              <Typography component="p">
                Posted by: {this.props.tips.first_name}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(TipsTricksItem));
