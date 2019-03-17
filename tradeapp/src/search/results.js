import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '../../node_modules/@material-ui/core';
import Result from './result';
import '../App.css';

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
    content: {
        fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;",
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      }
  });


class Results extends Component {
   
    render() {
       
        const { classes, results, onBuy } = this.props;
        if(!results || results.length === 0) {
            return (<div>
                <Typography variant="subtitle1" className={classes.content}>
                    No results
                </Typography>
                </div>)
        }
        return (
           <div className="ResultsBox">
               {results.map((r,i)=>{
                   console.log(r,i)
                   return <Result object={r} onBuy={onBuy} />
               })
               }
            </div>
        )
    }
}

Results.propTypes = {
    classes: PropTypes.object.isRequired,
    results: PropTypes.object.isRequired,
    onBuy: PropTypes.object.isRequired, 
};

export default withStyles(styles)(Results);