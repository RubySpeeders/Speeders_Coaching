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

//custom file imports
import TipsTricksItem from '../TipsTricksItem/TipsTricksItem';

class StretchingTab extends Component {
  render() {
    const tips = this.props.store.tips.map((item, index) => {
      if (item.type === 4) {
        return (
          <Typography value={item.id} key={index}>
            {item.title}
            Article: {item.article_link}
            Comments: {item.comments}
          </Typography>
        );
      }
    });
    return (
      <div>
        <Typography variant="h6">Stretching tips!</Typography>
        <Card>
          <CardContent>{tips}</CardContent>
          <CardActions>
            <Button>Edit</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(StretchingTab);
