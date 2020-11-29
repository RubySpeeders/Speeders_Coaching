import React, { Component } from 'react';
import { connect } from 'react-redux';

//Material-UI
import { Box, Grid, Button, Typography, TextField } from '@material-ui/core';

class AddNewTip extends Component {
  state = {
    title: '',
    article_link: '',
    video_link: '',
    comments: '',
  };

  //capture inputs for adding a new tip
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  postTip = (e) => {
    e.preventDefault();
    this.props.dispatch({ type: 'POST_TIP', payload: this.state });
    this.setState({
      title: '',
      article_link: '',
      video_link: '',
      comments: '',
    });
  };

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">Add a new tip</Typography>
        </Grid>
        <form onSubmit={this.postTip}>
          <Grid item xs={12}>
            <TextField
              placeholder="title"
              type="text"
              name="title"
              value={this.state.title}
              required
              variant="outlined"
              onChange={this.handleInputChangeFor('title')}
            />
          </Grid>
          <TextField
            placeholder="article link"
            type="text"
            name="article_link"
            value={this.state.article_link}
            required
            variant="outlined"
            onChange={this.handleInputChangeFor('article_link')}
          />
          <TextField
            placeholder="video link"
            type="text"
            name="video_link"
            value={this.state.video_link}
            required
            variant="outlined"
            onChange={this.handleInputChangeFor('video_link')}
          />
          <TextField
            placeholder="additional comments"
            type="text"
            name="comments"
            value={this.state.comments}
            required
            variant="outlined"
            onChange={this.handleInputChangeFor('comments')}
          />
          <Button type="submit" variant="outlined">
            Add
          </Button>
        </form>
      </Grid>
    );
  }
}

export default connect()(AddNewTip);
