import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import useTitle from "../hooks/useTitle";
import { VideoCard } from "material-ui-player";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getListening } from "../redux/actions/listeningAction";
import { useParams } from "react-router-dom";
import incorrectIcon from "assets/icons/checkAnswer/incorrect.gif";
import correctIcon from "assets/icons/checkAnswer/correct.gif";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  tabcontents: {
    border: "1px solid #2eb8b8",
    padding: "10px",
    backgroundColor: "#FFF",
    borderRadius: "0 3px 3px 3px",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ListeningPage() {
  useTitle("Listening");
  const classes = useStyle();
  const [value, setValue] = useState(1);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const listenId = useParams().id;
  const { listen, questions } = useSelector((state) => state.listeningReducer);

  const dispatch = useDispatch();
  useEffect(() => dispatch(getListening(listenId), [dispatch]));

  // window.localStorage.setItem(listenId, listen.Name);
  // console.log(window.localStorage)

  const [answers, setAnswers] = useState([]);
  const [isCorrect, setisCorrect] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const handleClickShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleClickReset = () => {
    if (window.confirm("Do you want reload page again?")) {
      window.location.reload();
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheck = (index, i) => {
    if (answers[index]) {
      if (answers[index].includes(i)) {
        for (var j = 0; j < answers[index].length; j++) {
          if (answers[index][j] == i) {
            answers[index].splice(j, 1);
          }
        }
      } else {
        answers[index].push(i);
      }
    } else {
      let ar = [];
      answers[index] = ar;
      answers[index].push(i);
    }
  };

  const handleClickCheckAnswer = () => {
    if (answers.length > 0) {
      for (var i = 0; i < answers.length; i++) {
        if (answers[i]) {
          if (answers[i].length > 0) {
            let numberCorrect = 0;
            for (let j = 0; j < questions[i].Answers.length; j++) {
              if (questions[i].Answers[j].isCorrect == true) {
                numberCorrect += 1;
              }
              console.log(answers[i]);
            }
            if (numberCorrect == answers[i].length) {
              isCorrect[i] = true;
              for (let k = 0; k < answers[i].length; k++) {
                if (questions[i].Answers[answers[i][k]].isCorrect == false) {
                  isCorrect[i] = false;
                }
              }
            } else {
              isCorrect[i] = false;
            }

            // if(answers[i].length>1) {isCorrect[i]=false;}
            // else{
            //   if(questions[i].Answers[answers[i][0]].isCorrect==true) {isCorrect[i]=true;}
            //   if(questions[i].Answers[answers[i][0]].isCorrect==false) {isCorrect[i]=false;}
          } else {
            if (window.confirm("Select the answer to all questions.")) {
              window.close();
            }
          }
        } else {
          if (window.confirm("Select the answer to all questions.")) {
            window.close();
          }
        }
      }
    } else {
      if (window.confirm("Select the answer to all questions.")) {
        window.close();
      }
    }
    setCheckAnswer(true);
    setShowAnswer(true);
  };

  return (
    <>
      <Container>
        <Typography variant="h6" align="center">
          {listen.Name}
        </Typography>

        <Typography>{listen.Description}</Typography>

        {listen.Video && (
          <div>
            <VideoCard
              src={isPlaying === true && listen.Video}
              onEnded={() => setIsPlaying(false)}
            ></VideoCard>
          </div>
        )}

        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "#2eb8b8",
              color: "white",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              indicatorColor="primary"
            >
              <Tab label="Script" {...a11yProps(0)} />
              <Tab label="Quiz" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <div className={classes.tabcontents}>
            <TabPanel value={value} index={0}>
              <td dangerouslySetInnerHTML={{ __html: listen.Script }} />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Typography variant="h6">
                Answer the following questions about the interview.
              </Typography>

              {questions &&
                questions.map((question, index) => (
                  <>
                    <Typography variant="body2">
                      {index + 1}) {question.Content}
                      {checkAnswer && isCorrect[index] == true && (
                        <span>
                          <img src={correctIcon} alt="Correct!" />
                        </span>
                      )}
                      {checkAnswer && isCorrect[index] == false && (
                        <span>
                          <img src={incorrectIcon} alt="Correct!" />
                        </span>
                      )}
                    </Typography>
                    <FormGroup>
                      {question.Answers.map((item, i) =>
                        showAnswer && item.isCorrect == true ? (
                          <FormControlLabel
                            key={i}
                            control={
                              <Checkbox
                                color="primary"
                                id={`${item}-${i}`}
                                onClick={() => handleCheck(index, i)}
                              />
                            }
                            label={
                              <Typography style={{ color: "#008000" }}>
                                <strong>{item.content}</strong>
                              </Typography>
                            }
                          ></FormControlLabel>
                        ) : (
                          <FormControlLabel
                            key={i}
                            control={
                              <Checkbox
                                color="primary"
                                id={`${item}-${i}`}
                                onClick={() => handleCheck(index, i)}
                              />
                            }
                            label={item.content}
                          ></FormControlLabel>
                        )
                      )}
                    </FormGroup>
                  </>
                ))}

              <Button color="primary" onClick={() => handleClickCheckAnswer()}>
                Check Answers
              </Button>
              <Button color="primary" onClick={() => handleClickReset()}>
                Reset Quiz
              </Button>
              <Button color="primary" onClick={() => handleClickShowAnswer()}>
                Show Answers
              </Button>
            </TabPanel>
          </div>
        </Box>
      </Container>
    </>
  );
}
