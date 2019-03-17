import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import  Transact from './transact'
import Modal from '@material-ui/core/Modal';

import transaction from './transaction';

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
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit,
    },
  });
  
  class Funds extends React.Component {


    state = {
        cash: 0,
        openAdd: false,
        openWithdraw: false,
    };

    componentDidMount(){
        transaction.currentFunds('abc')
        .then((r)=>{
            this.setState(state => ({
                cash: r,
            }));
        })
    }
  
    handleAdd = () => {
        this.setState(state => ({
            openAdd: true,
        }));

    };

    handleAddClose = (deltaAmount) => {
        if(!deltaAmount) {
            this.setState(state => ({
                openAdd: false,
            }));
            return
        }
        // error handling later
        transaction.addFunds(deltaAmount, 'abc').then((r)=>{
            this.setState(state => ({
                openAdd: false,
                cash: r,
            }));
        })
        .catch((err)=>{
            console.log(err);
        })
        
    }
  
    handleWithdraw = () => {
        this.setState(state => ({
            openWithdraw: true,
        }));
    };

    handleWithdrawClose = (deltaAmount) => {
        if(!deltaAmount) {
            this.setState(state => ({
                openWithdraw: false,
            }));
            return
        }
        transaction.withdrawFunds(deltaAmount, 'abc').then((r)=>{
            this.setState(state => ({
                openWithdraw: false,
                cash: r,
            }));
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  
  
    render() {
      const { classes } = this.props;
      const { cash, openAdd, openWithdraw } = this.state
  
      return (
        <React.Fragment>
          <CssBaseline />
          <AppBar position="absolute" color="default" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap className={classes.content}>
                Funds
              </Typography>
            </Toolbar>
          </AppBar>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <React.Fragment>
                  <React.Fragment>
                    <Typography variant="subtitle1" align="left" className={classes.content}>
                        Cash Balance: {cash}$
                    </Typography>
                    <Modal open={openAdd} onClose={this.handleAddClose}>
                        <Transact operation={"add"} currentFunds={cash} okHandler={this.handleAddClose} cancelHandler={this.handleAddClose} />
                    </Modal>
                    <Button className={classes.button} onClick={this.handleAdd}>
                        Add
                    </Button>
                    <Modal open={openWithdraw} onClose={this.handleWithdrawClose}>
                        <Transact operation={"withdraw"}  currentFunds={cash} okHandler={this.handleWithdrawClose} cancelHandler={this.handleWithdrawClose} />
                    </Modal>
                    <Button className={classes.button} onClick={this.handleWithdraw}>
                         Withdraw
                    </Button>
                  </React.Fragment>
              </React.Fragment>
            </Paper>
          </main>
        </React.Fragment>
      );
    }
  }
  
  Funds.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Funds);
