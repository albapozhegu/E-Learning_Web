import React, { useState } from "react";
import WordContributionData from "components/WordAdmin/AddWord/data";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
  root: {
    margin: "3.2rem 0",
  },
}));

function AddWordPage() {
  const classes = useStyle();

  return (
    <div className="container">
      <div className={classes.root}>
        <div className="ani-fade">
          <WordContributionData />
        </div>
      </div>
    </div>
  );
}

export default AddWordPage;
