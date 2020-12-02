import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

class AthleteDetailsTab extends Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography>
            {this.props.store.athletes.athleteDetails.first_name}{' '}
            {this.props.store.athletes.athleteDetails.last_name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button>Edit</Button>
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStoreToProps)(AthleteDetailsTab);
