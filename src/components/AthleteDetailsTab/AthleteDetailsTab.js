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
import EditIcon from '@material-ui/icons/Edit';

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

          {this.props.store.athletes.athleteDetails.gender && (
            <Typography>
              Gender: {this.props.store.athletes.athleteDetails.gender}
            </Typography>
          )}

          {this.props.store.athletes.athleteDetails.health_risk_comments && (
            <Typography>
              Health notes:{' '}
              {this.props.store.athletes.athleteDetails.health_risk_comments}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button variant="outlined" color="primary">
            <EditIcon />
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStoreToProps)(AthleteDetailsTab);
