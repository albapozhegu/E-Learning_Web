import React from "react";
import EditWord from "./../components/WordAdmin/EditWord";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
  root: {
    margin: "3.2rem 0",
  },
}));
function EditWordPage() {
  const classes = useStyle();
  return (
    <div className="container">
      <div className={classes.root}>
        <div className="ani-fade">
          <EditWord />
        </div>
      </div>
    </div>
  );
}

export default EditWordPage;
