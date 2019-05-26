import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@material-ui/core";
import Hamburger from "./Hamburger";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

const Nav = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Hamburger />
          <Typography variant="h6" color="inherit" className={classes.grow}>
            OneCloud ID
          </Typography>
          <NavLink
            style={{ textDecoration: "none", color: "#ffffff" }}
            to="/signup"
          >
            <Button color="inherit">Sign Up</Button>
          </NavLink>
          <NavLink
            style={{ textDecoration: "none", color: "#ffffff" }}
            to="/signin"
          >
            <Button color="inherit">Sign In</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Nav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Nav);
