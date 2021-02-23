import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI imports
import { Typography } from '@material-ui/core';

//custom file imports
import TipsTricksItem from '../TipsTricksItem/TipsTricksItem';

class StridesTab extends Component {
  render() {
    const tips = this.props.store.tips.map((item, index) => {
      if (item.type === 3) {
        return <TipsTricksItem key={index} item={item} />;
      } else {
        return <></>;
      }
    });
    return (
      <div>
        <Typography variant="h6">All about strides!</Typography>
        {tips}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(StridesTab);
