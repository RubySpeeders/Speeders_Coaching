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

class AthleteNotesTab extends Component {
  componentDidMount() {
    console.log(this.props.store);
  }
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
              <CakeIcon /> {this.props.store.athletes.athleteDetails.dob}
            </Typography>
            <Typography>
              Average weekly mileage:{' '}
              {this.props.store.athletes.athleteDetails.avg_weekly_mileage}
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

export default connect(mapStoreToProps)(AthleteNotesTab);
