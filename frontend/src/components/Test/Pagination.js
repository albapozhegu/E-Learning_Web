import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import submitTestApi from "apis/submitTestApi";

const useStyles = makeStyles(() => ({
  button: {
    padding: "10px 25px",
    fontWeight: "600",
    backgroundColor: "#68c2e8",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#56bde8",
      boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.25)",
    },
  },
}));

export default function Pagination({
  type = "question",
  pages,
  setCurrentPage,
  submitId,
  submitAnswers1,
  submitAnswers2,
  submitAnswers3,
  submitAnswers4,
  submitAnswers5,
  submitAnswers6,
  submitAnswers7
}) {

  const classes = useStyles();
  const [selected, setSelected] = useState(1);
 

  useEffect(() => {
    setCurrentPage(selected);
  }, [selected]);

  const updateAnswerSubmitPrev = async (value) =>{  
    if(selected === 1){ 
      await submitTestApi.putAnswerSubmit(submitId, {Part : selected, AnswerTests: submitAnswers1});   
      setSelected(value);
      return;
    }
    if(selected === 2){ 
      await submitTestApi.putAnswerSubmit(submitId, {Part : selected, AnswerTests: submitAnswers2});   
      setSelected(value);
      return;
    }
    if(selected === 3 ){ 
      await submitTestApi.putAnswerSubmit(submitId, {Part : selected, AnswerTests: submitAnswers3});   
      setSelected(value);
      return;
    }
   
    if(selected === 4 ){ 
      await submitTestApi.putAnswerSubmit(submitId, {Part : selected, AnswerTests: submitAnswers4});   
      setSelected(value);
      return;
    }
   
    if(selected === 5){ 
      await submitTestApi.putAnswerSubmit(submitId, {Part : selected, AnswerTests: submitAnswers5});   
      setSelected(value);
      return;
    }
    if(selected === 6){ 
      await submitTestApi.putAnswerSubmit(submitId, {Part : selected, AnswerTests: submitAnswers6});   
      setSelected(value);
      return;
    }
   
    if(selected === 7 ){ 
      await submitTestApi.putAnswerSubmit(submitId, {Part : selected, AnswerTests: submitAnswers7});   
      setSelected(value);
      return;
    }
  
   setSelected(value);
  };

  const updateAnswerSubmitNext = async (value) =>{

    if(selected === 1){ 
      await submitTestApi.putAnswerSubmit(submitId, {Part : selected, AnswerTests: submitAnswers1});   
      setSelected(value);
      return;
    }
    if(selected === 2){ 
      await submitTestApi.putAnswerSubmit(submitId, {Part : selected, AnswerTests: submitAnswers2});   
      setSelected(value);
      return;
    }
    if(selected === 3){ 
      await submitTestApi.putAnswerSubmit(submitId, {Part : selected, AnswerTests: submitAnswers3});   
      setSelected(value);
      return;
    }
    if(selected === 4){ 
      await submitTestApi.putAnswerSubmit(submitId, {Part : selected, AnswerTests: submitAnswers4});   
      setSelected(value);
      return;
    }
    if(selected === 5){ 
      await submitTestApi.putAnswerSubmit(submitId, {Part : selected, AnswerTests: submitAnswers5});   
      setSelected(value);
      return;
    }
    if(selected === 6){ 
      await submitTestApi.putAnswerSubmit(submitId, {Part : selected, AnswerTests: submitAnswers6});   
      setSelected(value);
      return;
    }
  
    if(selected === 7 ){ 
      await submitTestApi.putAnswerSubmit(submitId, {Part : selected, AnswerTests: submitAnswers7});   
      setSelected(value);
      return;
    }
 
    setSelected(value);

  };

  console.log(selected)
  return (
    <div>
      {pages > 1 && (
        <div
          className={`d-flex jus-content-${
            type === "part" ? "between" : "around"
          } align-items-center my-5`}
        >
          <Button
            className={classes.button}
            disabled={selected === 1 ? true : false}
            onClick={() => updateAnswerSubmitPrev((prev) => (prev <= 1 ? prev : prev - 1))}
          >
            {type === "part" ? "Prev Part" : "Prev"}
          </Button>
          <Button
            className={classes.button}
            disabled={selected === pages ? true : false}
            onClick={() =>
              updateAnswerSubmitNext((prev) => (prev >= pages ? prev : prev + 1))
            }
          >
            {type === "part" ? "Next Part" : "Next"}
          </Button>
        </div>
      )}
    </div>
  );
}
