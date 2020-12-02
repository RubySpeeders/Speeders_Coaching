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

class PreRunTab extends Component {
  render() {
    return (
      <div>
        <Typography variant="h6">Before running tips!</Typography>
        <Card>
          <CardContent></CardContent>
          <CardActions>
            <Button>Edit</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PreRunTab);
