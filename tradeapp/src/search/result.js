import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '../../node_modules/@material-ui/core';
import '../App.css';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    content: {
        align: 'left',
        fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;",
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      }
  });

class Result extends Component {
    
    details(obj) {
        if(obj.price) {
            return `${obj.price} ${obj.change}`
        }
    }
    
    render() {
       
        const { classes, object, onBuy } = this.props;
        return (
           <div className="Result">
                <div className="ResultHalfBox">
                 <Typography variant="subtitle1" className={classes.content} color="textPrimary" gutterBottom={true} >
                    {object.symbol}
                </Typography>
                </div>
                <div className="ResultHalfBox">
                <Typography variant="p" className={classes.content} color="textSecondary" gutterBottom={true} >
                    {object.name} 
                </Typography>
                </div>
                <div className="ResultHalfBox">
                <Typography variant="p" className={classes.content} color="textSecondary" gutterBottom={true} >
                {this.details(object)}
                </Typography>
                </div>
                <div className="ResultHalfBox">
                    <Button onClick={()=>{
                        onBuy(object);
                    }}>Buy</Button>
                </div>
                </div>
        )
    }
}

Result.propTypes = {
    classes: PropTypes.object.isRequired,
    object: PropTypes.object.isRequired,
    onBuy: PropTypes.object.isRequired,
};

export default withStyles(styles)(Result);