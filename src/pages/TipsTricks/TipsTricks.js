import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI
import { Grid } from '@material-ui/core';

//custom file import
import TipsTricksItem from '../../components/TipsTricksItem/TipsTricksItem';

class TipsTricks extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_TIPS',
    });
  }
  render() {
    return (
      <div>
        <h3>Tips &amp; Tricks</h3>
        <Grid container>
          {this.props.store.tips.map((item, index) => (
            <Grid item>
              <TipsTricksItem key={index} tips={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TipsTricks);
