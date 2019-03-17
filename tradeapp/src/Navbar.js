import React, { Component } from 'react';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import { withStyles } from "@material-ui/core/styles/";
import Dashboard from './dashboard';
import Holdings from './holdings';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
      tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
      },
      tabsIndicator: {
        backgroundColor: '#1890ff',
      },
      tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
          color: '#40a9ff',
          opacity: 1,
        },
        '&$tabSelected': {
          color: '#1890ff',
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          color: '#40a9ff',
        },
      },
      tabSelected: {},
});

const TabContainer = (props) => {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }

class NavBar extends Component {
    state = {
    value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
        <div className={classes.root}>
            <Tabs classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }} value={value} onChange={this.handleChange}>
                <Tab disableRipple label="Dashboard" classes={{ root: classes.tabRoot, selected: classes.tabSelected }}>
                    <Dashboard />
                </Tab>
                <Tab disableRipple label="Holdings" classes={{ root: classes.tabRoot, selected: classes.tabSelected }}>
                    <Holdings />
                </Tab>
            </Tabs>
            <div>
                {value === 0 && <TabContainer><Dashboard /></TabContainer>}
                {value === 1 && <TabContainer><Holdings /></TabContainer>}
            </div>
        </div>
        );
    }
};
  
export default withStyles(styles)(NavBar);