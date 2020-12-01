import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import {
  Box,
  Container,
  Button,
  Grid,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from '@material-ui/core';

class AddWorkout extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_STEPS' });
  }
  state = {
    coach_id: '',
    athlete_id: '',
    date: '',
    description: '',
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    const steps = this.props.store.steps.map((item, index) => {
      return (
        <Grid key={index} container spacing={2}>
          <Grid item>
            <TextField
              key={index}
              placeholder={item.step}
              type="text"
              name={item.step}
              value={this.state.step}
              required
              variant="outlined"
              onChange={this.handleInputChangeFor()}
            />
          </Grid>
        </Grid>
      );
    });
    return (
      <Container>
        <Typography variant="h4" component="h2">
          Add a workout!
        </Typography>
        <Box m={2}>
          <TextField
            id="date"
            label="dob"
            type="date"
            value={this.state.date}
            onChange={this.handleInputChangeFor('date')}
            variant="outlined"
          />
        </Box>
        <Box m={2}>
          <TextField
            placeholder="description"
            type="text"
            name="description"
            value={this.state.description}
            required
            variant="outlined"
            onChange={this.handleInputChangeFor('description')}
          />
        </Box>
        <Box m={2}>{steps}</Box>
        <Button>Assign</Button>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AddWorkout);
