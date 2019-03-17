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

class BuyModal extends Component {
    
    state = {
        quantity: 0,
    }

    handleChange = name => event => {
        const val = event.target.value;
        if(val < 0) {
            this.setState({
                errorMessage: "Has to greater than 0",
                quantity: val,
            })
            return;
        }
        this.setState({
            errorMessage: null,
            quantity: val,
        })
    };

   
    render() {
        const { classes, symbol, price, okHandler, cancelHandler } = this.props;
        const {errorMessage} = this.state;
        return (
            <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Buy {symbol} @ {price} = {(price*this.state.quantity).toFixed(2)}$
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
                <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="standard-number"
                    label="How many?"
                    value={this.state.quantity}
                    onChange={this.handleChange('quantity')}
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
                
                <Button onClick={()=>{ okHandler(symbol, this.state.quantity)}}>
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

BuyModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BuyModal);