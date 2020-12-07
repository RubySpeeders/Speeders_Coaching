import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import {
  Box,
  Card,
  CardContent,
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
    workout: [
      { step: 1, rep: '', distance: '', pace: '' },
      { step: 2, rep: '', distance: '', pace: '' },
      { step: 3, rep: '', distance: '', pace: '' },
      { step: 4, rep: '', distance: '', pace: '' },
    ],
  };

  handleInputChangeForWorkout = (propertyName, stepId) => (event) => {
    this.setState({
      workout: this.state.workout.map((item) => {
        if (item.step === stepId) {
          return { ...item, [propertyName]: event.target.value };
        }
        return item;
      }),
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'POST_WORKOUT',
      payload: {
        entire_workout: this.state,
        athlete_id: this.props.store.athletes.athleteDetails.id,
      },
    });
    this.props.history.push('/home');
  };

  render() {
    const steps = this.props.store.workouts.map((item, index) => {
      return (
        <Grid key={index} container spacing={2} alignItems="center">
          <Typography>{item.step}: </Typography>
          <Grid item xs={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="repetitions">How many repetitions?</InputLabel>
              <Select
                labelId="repetitions"
                value={this.state.workout.rep}
                onChange={this.handleInputChangeForWorkout('rep', item.id)}
              >
                <MenuItem value="">
                  <em>Select repetitions</em>
                </MenuItem>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              placeholder="distance"
              type="text"
              name="distance"
              value={this.state.workout.distance}
              variant="outlined"
              onChange={this.handleInputChangeForWorkout('distance', item.id)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              placeholder="pace"
              type="text"
              name="pace"
              value={this.state.workout.pace}
              variant="outlined"
              onChange={this.handleInputChangeForWorkout('pace', item.id)}
            />
          </Grid>
        </Grid>
      );
    });
    return (
      <Container>
        <Card>
          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <Box m={2}>
                <TextField
                  required
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
              <Button variant="outlined" type="submit" color="primary">
                Assign
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(AddWorkout));
