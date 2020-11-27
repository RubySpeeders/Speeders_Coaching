import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Material-UI
import { Grid, Tabs, Tab, Typography, TextField } from '@material-ui/core';

class TipsTricksItem extends Component {
  render() {
    return (
      <Grid container>
        <Typography component="h4">{this.props.tips.title}</Typography>
        <iframe src={this.props.tips.video_link} />
        <Typography component="p">{this.props.article_link}</Typography>
        <Typography component="p">{this.props.tips.comments}</Typography>
        <Typography component="p">
          Posted by: {this.props.tips.first_name}
        </Typography>
      </Grid>
    );
  }
}

export default withRouter(connect()(TipsTricksItem));
