import React from "react";
import { makeStyles } from "@material-ui/styles";
import Background from "assets/images/background.jpg";

const useStyle = makeStyles(() => ({
  root: {
    background: `url(${Background})`,
    height: "350px",
    margin: "0px",
    width: "100%",
  },

  container: {
    color: "white",
    height: "224px",
    marginLeft: "100px",
    fontSize: "50px",
    fontWeight: "bold",
    paddingBottom: "0",
    paddingTop: "200px",
    zIndex: "99",
    whiteSpace: "nowrap",
  },
  letter: {
    backgroundColor: "#000"
  }
}));

export default function Banner() {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <span className={classes.letter}>L</span>
        <span className={classes.letter}>E</span>
        <span className={classes.letter}>A</span>
        <span className={classes.letter}>R</span>
        <span className={classes.letter}>N</span>
        <span className={classes.letter}>I</span>
        <span className={classes.letter}>N</span>
        <span className={classes.letter}>G</span>
        <span className={classes.letter}> </span>
        <span className={classes.letter}>E</span>
        <span className={classes.letter}>N</span>
        <span className={classes.letter}>G</span>
        <span className={classes.letter}>L</span>
        <span className={classes.letter}>I</span>
        <span className={classes.letter}>S</span>
        <span className={classes.letter}>H</span>

      </div>
    </div>
  );
}
