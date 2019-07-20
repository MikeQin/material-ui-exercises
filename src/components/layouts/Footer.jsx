import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const Footer = ({ muscles, category, onSelect }) => {
  const classes = useStyles();

  const index = category
    ? muscles.findIndex(group => group === category) + 1
    : 0;

  const handleChange = (event, newIndex) => {
    onSelect(newIndex === 0 ? "" : muscles[newIndex - 1]);
    console.log(newIndex - 1, muscles[newIndex - 1]);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={index}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="All" />
        {muscles.map((muscle, i) => (
          <Tab key={i} label={muscle} />
        ))}
      </Tabs>
    </Paper>
  );
};

export default Footer;
