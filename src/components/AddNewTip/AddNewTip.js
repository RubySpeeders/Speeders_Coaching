import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
//Material-UI
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';

class AddNewTip extends Component {
  componentDidMount() {
    //dispatch to get types of tips for the dropdown
    this.props.dispatch({ type: 'GET_TIP_TYPES' });
  }

  state = {
    title: '',
    type: '',
    article_link: '',
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
      comments: '',
      type: '',
    });
  };

  render() {
    const types = this.props.store.tipTypes.map((item, index) => {
      return (
        <MenuItem value={item.id} key={index}>
          {item.type}
        </MenuItem>
      );
    });
    return (
      <Container>
        <Typography variant="h6">Add a new tip</Typography>
        <Card>
          <CardContent>
            <form onSubmit={this.postTip}>
              <Grid container spacing={2} justify="space-evenly">
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="title"
                    type="text"
                    name="title"
                    value={this.state.title}
                    required
                    variant="outlined"
                    onChange={this.handleInputChangeFor('title')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="tip-type">Type of tip</InputLabel>
                    <Select
                      fullWidth
                      labelId="tip-type"
                      value={this.state.type}
                      onChange={this.handleInputChangeFor('type')}
                      label="tip-type"
                    >
                      <MenuItem value="">
                        <em>Select type</em>
                      </MenuItem>
                      {types}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    placeholder="article link"
                    type="text"
                    name="article_link"
                    value={this.state.article_link}
                    required
                    variant="outlined"
                    onChange={this.handleInputChangeFor('article_link')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="additional comments"
                    type="text"
                    name="comments"
                    value={this.state.comments}
                    required
                    variant="outlined"
                    onChange={this.handleInputChangeFor('comments')}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                justify="space-evenly"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Button color="primary" type="submit" variant="outlined">
                    Add
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AddNewTip);
