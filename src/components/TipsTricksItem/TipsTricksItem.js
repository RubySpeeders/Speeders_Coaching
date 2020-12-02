import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

//Material-UI
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

class TipsTricksItem extends Component {
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardContent value={this.props.item.id}>
              <Typography>{this.props.item.title} </Typography>
              <a href={this.props.item.article_link} target="_blank">
                {this.props.item.article_link}
              </a>
              <Typography>Comments: {this.props.item.comments}</Typography>
              <Typography>
                Posted by Coach {this.props.item.first_name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="primary" variant="outlined">
                Edit
              </Button>
              {this.props.store.user.role_id === 1 ? (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleDelete}
                >
                  Delete
                </Button>
              ) : (
                <></>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(TipsTricksItem));
