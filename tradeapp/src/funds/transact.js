import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '../../node_modules/@material-ui/core';

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      }
  });


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

class Transact extends Component {
    state = {
        delta: 0,
    }

    handleChange = name => event => {
        const val = event.target.value;
        if(this.props.operation === "withdraw" && val > this.props.currentFunds) {
            this.setState({
                errorMessage: "Insufficient funds to withdraw",
                delta: 0,
            })
            return;
        } else {
            this.setState({
                errorMessage: null,
                delta: val,
            })
        }
    };

    
    render() {
        const { classes, operation, currentFunds, okHandler, cancelHandler } = this.props;
        const message = operation === "add" ? "Add Funds" : "Withdraw Funds"
        const {errorMessage} = this.state;
        return (
            <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              {message}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
                <Typography variant="subtitle1" align="left" className={classes.content}>
                        Current Balance: {currentFunds}$
                </Typography>
                <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="standard-number"
                    label="$"
                    value={this.state.delta}
                    onChange={this.handleChange('delta')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    />
                    
                </form>
                {errorMessage &&
                    <Typography color="error">
                    * {errorMessage}
                </Typography>
                }
                
                <Button onClick={()=>{ okHandler(this.state.delta)}}>
                        OK
                </Button>
                <Button onClick={()=>{ cancelHandler(null) }}>
                        Cancel
                </Button>
            </Typography>
            
            </div>
        )
    }
}

Transact.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Transact);