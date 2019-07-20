import React, { useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Edit from "./dialogs/Edit";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flexbox"
  },
  paper: {
    padding: 20,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    overflowY: "auto",
    height: 500,
    backgroundColor: theme.palette.background.paper
  }
}));

const Exercises = ({
  exercises,
  category,
  onSelect,
  exercise: {
    id,
    title = "Welcome!",
    description = "Please select an exercise from the list on the left."
  },
  onDelete,
  onSelectEdit,
  onEdit,
  editMode,
  muscles,
  exSelected
}) => {
  const classes = useStyles();

  useEffect(() => {
    console.log("exercises", exercises);
    console.log("category", category);
    // exercises.map(([group, exercise]) => {
    //   return console.log("group", group);
    // });
  }, [exercises, category]);

  return (
    <Grid container className={classes.root}>
      <Grid item sm style={{ flexGrow: 1 }}>
        <Paper className={classes.paper}>
          {exercises.map(([group, exercises], i) =>
            !category || category === group ? (
              <Fragment key={group}>
                <Typography
                  key={group}
                  variant="h6"
                  style={{ textTransform: "capitalize" }}
                >
                  {group}
                </Typography>
                <List component="ul">
                  {exercises.map(({ id, title }, index) => (
                    <ListItem button key={index} onClick={() => onSelect(id)}>
                      <ListItemText primary={title} />
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={() => onSelectEdit(id)}
                          edge="end"
                          aria-label="Edit"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => onDelete(id)}
                          edge="end"
                          aria-label="Delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Fragment>
            ) : null
          )}
        </Paper>
      </Grid>
      <Grid item sm style={{ flexGrow: 2 }}>
        <Paper className={classes.paper}>
          {editMode ? (
            <Edit
              exSelected={exSelected}
              categories={muscles}
              onEdit={onEdit}
            />
          ) : (
            <>
              <Typography key="header" variant="h4">
                {title}
              </Typography>
              <Typography key="body" variant="body1" style={{ marginTop: 20 }}>
                {description}
              </Typography>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Exercises;
