import React, { Component, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI
import { Grid, Tabs, Tab, Typography } from '@material-ui/core';

//custom file import
import TipsTricksItem from '../../components/TipsTricksItem/TipsTricksItem';
import AddNewTip from '../../components/AddNewTip/AddNewTip';
import CoachSidebar from '../../components/CoachSidebar/CoachSidebar';
import AthleteSidebar from '../../components/AthleteSidebar/AthleteSidebar';
import PreRunTab from '../../components/PreRunTab/PreRunTab';
import PostRunTab from '../../components/PostRunTab/PostRunTab';
import StridesTab from '../../components/StridesTab/StridesTab';
import StretchingTab from '../../components/StretchingTab/StretchingTab';
import FuelTab from '../../components/FuelTab/FuelTab';

function TipsTricks(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch to get all tips to render on page load
    dispatch({
      type: 'GET_TIPS',
    });
  }, [dispatch]);

  //config for tabs
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Typography gutterBottom variant="h4" component="h3">
        Tips &amp; Tricks
      </Typography>
      {props.store.user.role_id === 1 ? <CoachSidebar /> : <AthleteSidebar />}
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Pre-run" />
        <Tab label="Post-run" />
        <Tab label="Strides" />
        <Tab label="Stretching" />
        <Tab label="Fuel" />
        {/* display add a new tip tab if coach */}
        {props.store.user.role_id === 1 ? <Tab label="Add a new tip" /> : <></>}
      </Tabs>

      {selectedTab === 0 && <PreRunTab />}
      {selectedTab === 1 && <PostRunTab />}
      {selectedTab === 2 && <StridesTab />}
      {selectedTab === 3 && <StretchingTab />}
      {selectedTab === 4 && <FuelTab />}
      {selectedTab === 5 && <AddNewTip />}
    </div>
  );
}

export default connect(mapStoreToProps)(TipsTricks);
