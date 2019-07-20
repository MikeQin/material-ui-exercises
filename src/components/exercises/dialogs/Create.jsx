import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import convertStr from "../../utils";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120
  },
  fab: {
    margin: theme.spacing(1)
  },
  msg: {
    color: "black"
  },
  error: {
    color: "red"
  }
}));

const initEx = {
  title: "",
  description: "",
  muscles: ""
};

const initMsg = "Please fill out the form below.";

const Create = ({ muscles: categories, onCreate }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [exercise, setExercise] = useState(initEx);
  const { title, description, muscles } = exercise;
  const [msg, setMsg] = useState(initMsg);
  const [css, setCss] = useState({ root: classes.msg });
  const [titleErr, setTitleErr] = useState(false);
  const [descErr, setDescErr] = useState(false);

  const initializeStates = () => {
    setMsg(initMsg);
    setCss({ root: classes.msg });
    setTitleErr(false);
    setDescErr(false);
  };

  const handleClose = () => {
    setOpen(false);
    initializeStates();
  };

  const handleOpen = () => {
    setOpen(true);
    initializeStates();
  };

  const handleChange = name => ({ target: { value } }) => {
    setExercise(prev => ({ ...prev, [name]: value }));
    console.log(name + ":" + value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!exercise.muscles) {
      setCss({ root: classes.error });
      setMsg("Please select 'Muscles'");
      return;
    }
    if (title.length <= 5) {
      setTitleErr(true);
      setCss({ root: classes.error });
      setMsg("'Title' must be great than 5 characters.");
      return;
    }
    if (description.length <= 10) {
      setDescErr(true);
      setCss({ root: classes.error });
      setTitleErr(false);
      setMsg("'Description' must be great than 10 characters.");
      return;
    }

    convertStr(title, description).then(([t, desc]) => {
      console.log(t, desc);
      exercise.title = t;
      exercise.description = desc;

      onCreate({
        ...exercise,
        id: exercise.title.toLocaleLowerCase().replace(/ /g, "-")
      });

      console.log("exercise created", exercise);
      handleClose();
      setExercise(initEx);
    });
  };

  return (
    <Fragment key="create-dialog">
      <Fab
        variant="extended"
        aria-label="Add"
        className={classes.fab}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form autoComplete="off" onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">
            Create a New Exercise
          </DialogTitle>

          <DialogContent>
            <DialogContentText classes={css}>{msg}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              value={title}
              onChange={handleChange("title")}
              required
              error={titleErr}
              className={classes.formControl}
              fullWidth
            />
            <FormControl className={classes.formControl} fullWidth required>
              <InputLabel htmlFor="muscles">Muscles</InputLabel>
              <Select value={muscles} onChange={handleChange("muscles")}>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              multiline
              rows="5"
              margin="dense"
              label="Description"
              value={description}
              onChange={handleChange("description")}
              required
              error={descErr}
              className={classes.formControl}
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button type="submit" color="primary" variant="outlined">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default Create;
