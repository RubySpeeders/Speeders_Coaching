import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

//Material-UI imports
import {
  Grid,
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

//file imoprts
import AthleteInfo from '../../components/AthleteInfo/AthleteInfo';
import './CoachHomepage.css';

class CoachHomepage extends Component {
  componentDidMount() {
    //get all athletes on page load
    this.props.dispatch({ type: 'GET_ATHLETES' });
  }

  render() {
    return (
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <div className="opacity">
              <Typography variant="h4" component="h3">
                Your Athletes
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography>Athlete</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography>Actions</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.store.athletes.athletes.map((item, index) => (
                      <AthleteInfo key={index} athlete={item} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(CoachHomepage));
