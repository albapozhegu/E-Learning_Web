import React, { useState } from "react";
import CreateListeningData from "components/ListeningAdmin/CreateListen/data";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
  root: {
    margin: "3.2rem 0",
  },
}));

function CreateListeningPage() {
  const classes = useStyle();

  return (
    <div className="container">
      <div className={classes.root}>
        <div className="ani-fade">
          <CreateListeningData />
        </div>
      </div>
    </div>
  );
}

export default CreateListeningPage;
