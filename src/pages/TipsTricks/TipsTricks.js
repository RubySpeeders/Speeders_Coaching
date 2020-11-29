import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI
import { Grid, Tabs, Tab, Typography, TextField } from '@material-ui/core';

//custom file import
import TipsTricksItem from '../../components/TipsTricksItem/TipsTricksItem';
import AddNewTip from '../../components/AddNewTip/AddNewTip';

class TipsTricks extends Component {
  componentDidMount() {
    //dispatch to get all tips to render on page load
    this.props.dispatch({
      type: 'GET_TIPS',
    });
  }

  render() {
    return (
      <div>
        <Typography gutterBottom variant="h4" component="h3">
          Tips &amp; Tricks
        </Typography>
        <Tabs>
          <Tab label="Strides" index={0} />
          <Tab label="Add a new tip" index={1} />
        </Tabs>
        {this.props.store.user.role_id === 1 ? <AddNewTip /> : <></>}

        <Grid container>
          {this.props.store.tips.map((item, index) => (
            <Grid item key={index}>
              <TipsTricksItem tips={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TipsTricks);
