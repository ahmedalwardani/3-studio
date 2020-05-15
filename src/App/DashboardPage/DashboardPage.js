import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Container, Snackbar } from "@material-ui/core";

import ProjectCard from "./ProjectCard/ProjectCard";
import NewProject from "./NewProject/NewProject";
import Alert from "../UI/Alert/Alert";
import Loader from "../UI/Loader/Loader";

import * as actions from "../../store/actions/index";

import "./Dashboard.scss";

const DashboardPage = props => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarStatus, setSnackBarStatus] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");

  // ! Resets
  // General resets
  props.onModeSelect("EDIT");

  // Media resets
  props.onResetMediaState();
  props.onResetMediaControls();

  // Edit resets
  props.onResetLights();
  props.onResetEditState();
  props.onSetCameraMode("PERSPECTIVE");
  // !

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);

    // Must come after setting to false
    setSnackBarMessage("");
    setSnackBarStatus("");
  };

  const handleSnackBarOpen = (status, message) => {
    setSnackBarStatus(status);
    setSnackBarMessage(message);

    // Must come after setting status and message
    setSnackBarOpen(true);
  };

  const projectCards = props.allProjects.map(project => (
    <ProjectCard
      handleSnackBarClose={handleSnackBarClose}
      handleSnackBarOpen={handleSnackBarOpen}
      key={project.id}
      {...project}
    />
  ));

  const snackBar = (
    <Snackbar
      open={snackBarOpen}
      autoHideDuration={6000}
      onClose={handleSnackBarClose}
    >
      <Alert onClose={handleSnackBarClose} severity={snackBarStatus}>
        {snackBarMessage}
      </Alert>
    </Snackbar>
  );

  return (
    <div className="dashboard-page">
      <Container maxWidth="xl" classes={{ root: "container-padding" }}>
        <div className="project-area">
          <h1>Dashboard</h1>
          <NewProject />
        </div>
        {props.allProjects.length > 0 ? (
          <div className="projects">{projectCards}</div>
        ) : (
          <Fragment>
            {props.projectsLoading ? (
              <div className="loader-container">
                <Loader />
              </div>
            ) : (
              <h2>No projects yet ...</h2>
            )}
          </Fragment>
        )}
        {snackBarOpen && snackBar}
      </Container>
    </div>
  );
};

DashboardPage.propTypes = {
  allProjects: PropTypes.array,
  projectsLoading: PropTypes.bool.isRequired,
  onModeSelect: PropTypes.func.isRequired,
  onResetMediaState: PropTypes.func.isRequired,
  onResetMediaControls: PropTypes.func.isRequired,
  onResetEditState: PropTypes.func.isRequired,
  onResetLights: PropTypes.func.isRequired,
  onSetCameraMode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allProjects: state.projects.allProjects,
  projectsLoading: state.projects.projectsLoading
});

const mapDispatchToProps = dispatch => ({
  onModeSelect: mode => dispatch(actions.modeSelect(mode)),
  onResetMediaState: () => dispatch(actions.resetMediaState()),
  onResetMediaControls: () => dispatch(actions.resetMediaControls()),
  onResetEditState: () => dispatch(actions.resetEditState()),
  onResetLights: () => dispatch(actions.resetLights()),
  onSetCameraMode: mode => dispatch(actions.setCameraMode(mode))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
