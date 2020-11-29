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
  handleBack = (e) => {
    this.props.history.push('/home');
  };
  render() {
    return (
      <div>
        <Typography variant="h4">Athlete Details LOL</Typography>
        <Typography>{this.props.athlete.first_name}</Typography>
        <Button onClick={this.handleBack}>Back</Button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AthleteDetails);
