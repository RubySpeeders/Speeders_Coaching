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
    date: '',
    description: '',
    workout: [],
    // step: '',
    // repetitions: '',
    // pace: '',
    // distance: '',
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState(
      {
        [propertyName]: event.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'POST_WORKOUT',
      payload: {
        workout: this.state,
        athlete_id: this.props.match.params.id,
      },
    });
  };

  render() {
    const steps = this.props.store.workouts.map((item, index) => {
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
              onChange={this.handleInputChangeFor(item.step)}
            />
          </Grid>
        </Grid>
      );
    });
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <Box m={2}>
            <TextField
              id="date"
              label="workout date"
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
          <Box>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="repetitions">
                How many repetitions of interval?
              </InputLabel>
              <Select
                labelId="repetitions"
                value={this.state.speed_work}
                onChange={this.handleInputChangeFor('repetitions')}
                label="repetitions"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'1'}>1</MenuItem>
                <MenuItem value={'2'}>2</MenuItem>
                <MenuItem value={'3'}>3</MenuItem>
                <MenuItem value={'4'}>4</MenuItem>
                <MenuItem value={'5'}>5</MenuItem>
                <MenuItem value={'6'}>6</MenuItem>
                <MenuItem value={'7'}>7</MenuItem>
                <MenuItem value={'8'}>8</MenuItem>
                <MenuItem value={'9'}>9</MenuItem>
                <MenuItem value={'10'}>10</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button color="primary">Assign</Button>
        </form>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AddWorkout);
