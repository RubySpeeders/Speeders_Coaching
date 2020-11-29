import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';

class AthleteDetails extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ATHLETE_DETAILS',
      payload: this.props.match.params.id,
    });
    console.log(this.props.store);
  }
  handleBack = (e) => {
    this.props.history.push('/home');
  };
  render() {
    return (
      <div>
        <Typography variant="h4">Athlete Details LOL</Typography>
        <Typography>
          {this.props.store.athletes.athleteDetails.first_name}
        </Typography>
        <Button onClick={this.handleBack}>Back</Button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AthleteDetails);
