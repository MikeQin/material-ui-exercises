import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CreateDialog from "../exercises/dialogs/Create";
import AlertDialog from "../exercises/dialogs/Alert";
import Search from "./Search";
import SimpleMenu from "./Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header = ({ muscles, onCreate, onSearch, onMenuSelect }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <div>
        <h1>React with Material UI</h1>
      </div>
      <AppBar position="static">
        <Toolbar>
          <SimpleMenu onMenuSelect={onMenuSelect} />
          <Typography variant="h6" className={classes.title}>
            Gym Exercise App
          </Typography>
          <Search onSearch={onSearch} />
          <CreateDialog muscles={muscles} onCreate={onCreate} />
        </Toolbar>
      </AppBar>
      <AlertDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Header;
