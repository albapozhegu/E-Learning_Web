import React from "react";
import { Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../constants';
import useCloseNavigation from './../hooks/useCloseNavigation';
import useTitle from 'hooks/useTitle';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    color: "white",
    position: "relative",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  logo: {
    width: "200px",
    height: "200px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "40px",
    color: "var(--primary-color)",
    marginBottom: "10px",
    fontWeight: "600",
  },
  desc: {
    fontSize: "25px",
    color: "#bcbdbc",
    marginBottom: "30px",
  },
  button: {
    padding: "10px 35px",
    fontWeight: "600",
    backgroundColor: "#68c2e8",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#56bde8",
      boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.25)",
    },
  },
}));

export default function WelcomePage() {
  useTitle("Welcome")
  useCloseNavigation();
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (e) => {
    history.push(ROUTES.HOME)
  }
  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <img
          src="https://res.cloudinary.com/phongvn2611/image/upload/v1634738823/english/avatar/website-logo-small_uqfxjx.png"
          alt="Logo"
          className={classes.logo}
        />
        <Typography className={classes.title} variant="h1">
        Welcome to the English Website
        </Typography>
        <Typography className={classes.desc} variant="body2">
        Where to start learning English from 0
        </Typography>
        <Button className={classes.button} onClick={handleClick}>Begin</Button>
      </Container>
    </div>
  );
}
