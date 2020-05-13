import React from "react";
import PropTypes from "prop-types";

import { Paper, ThemeProvider } from "@material-ui/core";

import themeCreator from "../../../helpers/themeCreator";

import "./ObjectsBar.scss";

const ObjectsBar = props => {
  const theme = themeCreator("#ffffff", "#212121");

  return (
    <ThemeProvider theme={theme}>
      <div className="objects-bar">
        <Paper classes={{ root: "custom-paper" }} elevation={3}></Paper>
      </div>
    </ThemeProvider>
  );
};

ObjectsBar.propTypes = {};

export default ObjectsBar;
