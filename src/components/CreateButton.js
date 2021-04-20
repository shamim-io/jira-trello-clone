import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import "./CreateButton.css";
import axios from "../axios";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "800px",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginTop: "100px",
    marginBottom: "50px",
  },
  button: {
    marginLeft: "20px",
  },
  modalStyle1: {
    position: "absolute",
    overflow: "scroll",
    height: "100%",
    display: "block",
  },
}));

export default function CreateButton() {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [project, setProject] = useState("");
  const [type, setType] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    try {
      axios.post("/", {
        project: project,
        type: type,
        summary: summary,
        description: description,
      });
    } catch (error) {
      console.log("error is >>>>>>", error);
      alert("error is >>>>>>", error);
    }

    setOpen(false);
    setProject("");
    setType("");
    setSummary("");
    setDescription("");
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 style={{ margin: "20px" }}>Create issue</h2>
      <form>
        <div className="modal__row">
          <label>Project</label>
          <select
            className="project__select"
            id="project"
            onChange={(option) =>
              setProject(option.target.value || "Project 1")
            }
          >
            <option value="Project 1">Project 1</option>
            <option value="Project 2">Project 2</option>
            <option value="Project 3">Project 3</option>
            <option value="Project 4">Project 4</option>
          </select>
        </div>

        <div className="modal__row">
          <label>Type</label>
          <select
            className="project__select"
            id="type"
            onChange={(option) => setType(option.target.value)}
          >
            <option value="Planned Tasks">Planned Tasks</option>
            <option value="Work in Progress">Work in Progress</option>
            <option value="Blocked">Blocked</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="modal__row">
          <label>Summary</label>
          <input
            className="project__input"
            type="text"
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div className="modal__row">
          <label>Description</label>
          <textarea
            className="project__textarea"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="modal__row">
          <label>Assignee</label>
          <select className="project__select" id="project_assignee">
            <option value="volvo">Shamim</option>
            <option value="saab">Ahmed</option>
            <option value="mercedes">Epic</option>
            <option value="audi">Other</option>
          </select>
        </div>

        <div className="modal__row">
          <label>Labels</label>
          <select className="project__select" id="project_labels">
            <option value="volvo">Shamim</option>
            <option value="saab">Ahmed</option>
            <option value="mercedes">Epic</option>
            <option value="audi">Other</option>
          </select>
        </div>
      </form>
      <Button
        variant="contained"
        style={{ margin: "20px" }}
        color="primary"
        onClick={handleSubmit}
        type="submit"
      >
        Submit
      </Button>
    </div>
  );

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        onClick={handleOpen}
      >
        CREATE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modalStyle1}
      >
        {body}
      </Modal>
    </div>
  );
}
