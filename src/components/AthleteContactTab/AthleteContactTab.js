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
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

class AthleteContactTab extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <Typography>
              {this.props.store.athletes.athleteDetails.first_name}{' '}
              {this.props.store.athletes.athleteDetails.last_name}
            </Typography>

            <Typography>
              <LocationCityIcon />{' '}
              {this.props.store.athletes.athleteDetails.city}
            </Typography>
            <Typography>
              <AlternateEmailIcon />
              {this.props.store.athletes.athleteDetails.email}
            </Typography>
            <Typography>
              Strava id: {this.props.store.athletes.athleteDetails.email}
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Edit</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AthleteContactTab);
