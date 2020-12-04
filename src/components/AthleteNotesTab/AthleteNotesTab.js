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
import CakeIcon from '@material-ui/icons/Cake';

//import for date/time config
const { DateTime } = require('luxon');

class AthleteNotesTab extends Component {
  render() {
    const birthday = DateTime.fromISO(
      this.props.store.athletes.athleteDetails.dob
    );
    const humanBirthday = birthday.toLocaleString(DateTime.DATE_SHORT);
    return (
      <div>
        <Card>
          <CardContent>
            <Typography>
              {this.props.store.athletes.athleteDetails.first_name}{' '}
              {this.props.store.athletes.athleteDetails.last_name}
            </Typography>

            <Typography>
              <CakeIcon /> {humanBirthday}
            </Typography>
            <Typography>
              Average weekly mileage:{' '}
              {this.props.store.athletes.athleteDetails.avg_weekly_mileage}
            </Typography>
            <Typography>
              What life is like outside of running:{' '}
              {this.props.store.athletes.athleteDetails.life_outside_running}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" color="primary">
              Edit
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AthleteNotesTab);
