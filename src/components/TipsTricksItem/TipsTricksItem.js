import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

//Material-UI
//MATERIAL-UI imports
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

const StyledTypography = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
  },
  subtitle1: {
    fontSize: '1.25rem',
    // fontWeight: 'bold',
  },
}))(Typography);

class TipsTricksItem extends Component {
  state = {
    is_editable: false,
    new_title: '',
    new_article: '',
    new_comments: '',
  };

  handleDelete = (e) => {
    console.log(this.props.item.id);
    this.props.dispatch({
      type: 'DELETE_TIP',
      payload: this.props.item.id,
    });
  };

  handleEditButton = (e) => {
    this.setState({
      is_editable: true,
    });
  };

  //capture inputs for editing tip
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleSave = (e) => {
    this.props.dispatch({
      type: 'UPDATE_TIP',
      payload: {
        new_tip: this.state,
        tip_id: this.props.item.id,
      },
    });
    this.setState({
      is_editable: false,
    });
  };

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Card>
            <CardContent value={this.props.item.id}>
              {this.state.is_editable ? (
                <div>
                  <TextField
                    fullWidth
                    placeholder={this.props.item.title}
                    type="text"
                    name="new_title"
                    value={this.state.new_title}
                    required
                    variant="outlined"
                    onChange={this.handleInputChangeFor('new_title')}
                  />
                </div>
              ) : (
                <StyledTypography variant="subtitle1">
                  {this.props.item.title}{' '}
                </StyledTypography>
              )}

              <Typography>Article link: </Typography>
              {this.state.is_editable ? (
                <div>
                  <TextField
                    fullWidth
                    placeholder={this.props.item.article_link}
                    type="text"
                    name="new_article"
                    value={this.state.new_article}
                    required
                    variant="outlined"
                    onChange={this.handleInputChangeFor('new_article')}
                  />
                </div>
              ) : (
                <div>
                  <a href={this.props.item.article_link} target="_blank">
                    {this.props.item.article_link}
                  </a>
                </div>
              )}

              {this.state.is_editable ? (
                <div>
                  <Typography>Comments: </Typography>
                  <TextField
                    fullWidth
                    placeholder={this.props.item.comments}
                    type="text"
                    name="new_comments"
                    value={this.state.new_comments}
                    required
                    variant="outlined"
                    onChange={this.handleInputChangeFor('new_comments')}
                  />
                </div>
              ) : (
                <Typography>Comments: {this.props.item.comments}</Typography>
              )}

              <Typography>
                Posted by Coach {this.props.item.first_name}
              </Typography>
            </CardContent>
            <CardActions>
              {this.props.store.user.role_id === 1 && (
                <div>
                  {this.state.is_editable ? (
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={this.handleSave}
                    >
                      <SaveAltIcon />
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={this.handleEditButton}
                    >
                      <EditIcon />
                    </Button>
                  )}
                  &nbsp;
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleDelete}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(TipsTricksItem));
