import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import { Box, Grid, TextField, Typography } from '@material-ui/core';

//custom file imports
import TipsTricksItem from '../TipsTricksItem/TipsTricksItem';

class PreRunTab extends Component {
  render() {
    const tips = this.props.store.tips.map((item, index) => {
      if (item.type === 1) {
        return <TipsTricksItem key={index} item={item} />;
      }
    });
    return (
      <div>
        <Typography variant="h6">Before running tips!</Typography>
        {tips}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PreRunTab);
