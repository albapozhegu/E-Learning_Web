import React, { useState } from "react";
import CreateGrammarData from "components/GrammarAdmin/CreateGrammar/data";
//import CreateListeningData from "components/ListeningAdmin/CreateListen/data";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
  root: {
    margin: "3.2rem 0",
  },
}));

function CreateGrammarPage() {
  const classes = useStyle();

  return (
    <div className="container">
      <div className={classes.root}>
        <div className="ani-fade">
          <CreateGrammarData />
        </div>
      </div>
    </div>
  );
}

export default CreateGrammarPage;
