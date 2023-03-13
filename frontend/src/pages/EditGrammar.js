import React from "react";
import EditGrammar from "../components/GrammarAdmin/EditGrammar/index";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
  root: {
    margin: "3.2rem 0",
  },
}));
function EditGrammarPage() {
  const classes = useStyle();
  return (
    <div className="container">
      <div className={classes.root}>
        <div className="ani-fade">
          <EditGrammar />
        </div>
      </div>
    </div>
  );
}

export default EditGrammarPage;
