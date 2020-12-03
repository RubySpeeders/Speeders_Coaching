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
            {' '}
            Name: {this.props.store.athletes.athleteDetails.first_name}{' '}
            {this.props.store.athletes.athleteDetails.last_name}
          </Typography>
          <Typography>
            Gender: {this.props.store.athletes.athleteDetails.gender}
          </Typography>
          <Typography>Health notes: </Typography>
          {this.props.store.athletes.athleteDetails.health_risk_comments !==
          null ? (
            <Typography>
              {this.props.store.athletes.athleteDetails.health_risk_comments}
            </Typography>
          ) : (
            <Typography>n/a</Typography>
          )}
        </CardContent>
        <CardActions>
          <Button variant="outlined" color="primary">
            Edit
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStoreToProps)(AthleteDetailsTab);
