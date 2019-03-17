import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const styles = theme => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 2,
      [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 6,
        padding: theme.spacing.unit * 3,
      },
    },
    content: {
        align: 'left',
        fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;",
    },
  });
  
  class Performance extends React.Component {
    state = {};
  
    handleNext = () => {
      this.setState(state => ({}));
    };
  
    handleBack = () => {
    };
  
  
    render() {
      const { classes } = this.props;

  
      return (
        <React.Fragment>
          <CssBaseline />
          <AppBar position="absolute" color="default" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap className={classes.content}>
                Performance
              </Typography>
            </Toolbar>
          </AppBar>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <React.Fragment>
                  <React.Fragment>
                    <Typography variant="subtitle1" align="left" className={classes.content}>
                       Total Portfolio Value:
                       Performance: (Portfolio value - money invested)
                    </Typography>
                  </React.Fragment>
              </React.Fragment>
            </Paper>
          </main>
        </React.Fragment>
      );
    }
  }
  
  Performance.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Performance);
