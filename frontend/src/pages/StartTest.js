import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { ROUTES } from "../constants";
import Part from "components/Test/Part";
import useTitle from "hooks/useTitle";
import Pagination from "components/Test/Pagination";
import Timer from "components/Test/Timer";
import testApi from "apis/testApi";
import submitTestApi from "apis/submitTestApi";
import { green } from "@material-ui/core/colors";
import { text } from "@fortawesome/fontawesome-svg-core";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "80vh",
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
  title: {
    marginBottom: "10px",
    fontWeight: 600,
    color: "#68c2e8",
  },
  timeTotal: {
    marginBottom: "15px",
    fontWeight: 500,
  },
  timeDetail: {
    marginBottom: "20px",
  },
  control: {
    margin: "5px 0",
    justifyContent: "center",
  },
}));

export default function StartTestPage() {
  const classes = useStyles();
  const [state, setState] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [test, setTest] = useState('');
  const history = useHistory();
  const { id } = useParams();
  const [submitAnswers1, setSubmitAnswers1] = useState([]);
  const [submitAnswers2, setSubmitAnswers2] = useState([]);
  const [submitAnswers3, setSubmitAnswers3] = useState([]);
  const [submitAnswers4, setSubmitAnswers4] = useState([]);
  const [submitAnswers5, setSubmitAnswers5] = useState([]);
  const [submitAnswers6, setSubmitAnswers6] = useState([]);
  const [submitAnswers7, setSubmitAnswers7] = useState([]);
  const [submitId, setSubmitId] = useState('');
  const [submitItem, setSubmitItem] = useState(null);
  //const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    (async function () {
      const res = await testApi.getTestById(id);
      setTest(res.data);
    })();
    return () => {};
  }, [id]);

  useEffect(() => {
    localStorage.setItem('page', JSON.stringify(currentPage));
  }, [currentPage]);

  useEffect(() => {
  const items = JSON.parse(localStorage.getItem('page'));
  console.log(items)
  if (items) {
   setCurrentPage(items);
  }
}, []);

console.log(currentPage)

  const createSubmit = async () =>{   
    const resCheck = await submitTestApi.getSubmitByTest(id);
    
    if(resCheck.data === null){
      const resSubmit = await submitTestApi.postSubmit(id);
      setSubmitId(resSubmit.data._id);
      setState(1);
      return;
    }
    else{     
      setSubmitId(resCheck.data._id);
    }
    if(resCheck.data.IsFinish === true){
      setSubmitItem(resCheck.data);
      localStorage.clear();
      setState(2); 
    }
    else{
      setState(1); 
    }
  };

  const onSubmitTest = async () =>{  
    if(currentPage === 1) {
      await submitTestApi.putSubmit(submitId, currentPage, submitAnswers1);
    }

    if(currentPage === 2) {
      await submitTestApi.putSubmit(submitId, currentPage, submitAnswers2);
    }

    if(currentPage === 3) {
      await submitTestApi.putSubmit(submitId, currentPage, submitAnswers3);
    }

    if(currentPage === 4) {
    await submitTestApi.putSubmit(submitId, currentPage, submitAnswers4);      
    }

    if(currentPage === 5) {
     await submitTestApi.putSubmit(submitId, currentPage, submitAnswers5);
    }

    if(currentPage === 6) {
      await submitTestApi.putSubmit(submitId, currentPage, submitAnswers6);
    }

    if(currentPage === 7) {
     await submitTestApi.putSubmit(submitId, currentPage, submitAnswers7);
    }

    const res = await submitTestApi.getSubmitByTest(id);
    setSubmitItem(res.data);
    localStorage.clear();
    setState(2); 

  };

  const onPlayAgain = async () =>{  
   await submitTestApi.deleteSubmit(submitId);
   window.location.reload();
  };

  
  useTitle("Test");
  return (
    <>
      {state === 0 ? (
        <div className={classes.root}>
          <Container className={classes.container}>
            <Typography className={classes.title} variant="h2">
              {test.Name}
            </Typography>
            <Typography className={classes.timeTotal} variant="h5">
              Total time: {test.Duration} minutes
            </Typography>
            <Button onClick={() => createSubmit()} className={classes.button}>
              Start
            </Button>
          </Container>
        </div>
      ) : state === 1 ? (
        <Grid container>
          <Grid item lg={8} md={6} xs={12}>
            <Container>
              <Pagination
                type={"part"}
                pages={7}
                setCurrentPage={setCurrentPage}
                submitId={submitId}
                submitAnswers1 ={submitAnswers1}
                submitAnswers2 ={submitAnswers2}
                submitAnswers3 ={submitAnswers3}
                submitAnswers4 ={submitAnswers4}
                submitAnswers5 ={submitAnswers5}
                submitAnswers6 ={submitAnswers6}
                submitAnswers7 ={submitAnswers7}
             
              ></Pagination>
              <Part 
              part={currentPage}
              testId={id} 
              submitId={submitId}
              setSubmitAnswers1={setSubmitAnswers1} 
              setSubmitAnswers2={setSubmitAnswers2}
              setSubmitAnswers3={setSubmitAnswers3}
              setSubmitAnswers4={setSubmitAnswers4}
              setSubmitAnswers5={setSubmitAnswers5}
              setSubmitAnswers6={setSubmitAnswers6}
              setSubmitAnswers7={setSubmitAnswers7}
             
              />
              
              
            </Container>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <div className="my-5 d-flex jus-content-around">
              <Timer 
              value={test.Duration * 60} 
              onSubmitTest = {onSubmitTest }
          
              
              ></Timer>
              <Button className={classes.button} onClick={() => onSubmitTest()}>
                Submit
              </Button>
            </div>
         
          </Grid>
        </Grid>
      ) : (
        <div className={classes.root}>
          <Container className={classes.container}>
            <Typography className={classes.title} variant="h4">
              Congrats
            </Typography>
            <Typography className={classes.timeTotal} variant="h5">
              Total point: {submitItem?.Score} points
            </Typography>
            <Typography className={classes.timeDetail} variant="body2">
              Listening: {submitItem?.ListenScore} points ({submitItem?.ListenSentences} sentences are correct)
            </Typography>
            <Typography className={classes.timeDetail} variant="body2">
              Reading: {submitItem?.ReadScore} points ({submitItem?.ReadSentences} sentences are correct)
            </Typography>
            <Button
              onClick={() =>history.replace(ROUTES.TEST)}
              className={`${classes.button} mb-5`}
            >
              Return
            </Button>
            <Button
              onClick={() =>onPlayAgain()}
              className={classes.button}
             
            >
              Play again
            </Button>
          </Container>
        </div>
      )}
    </>
  );
}
