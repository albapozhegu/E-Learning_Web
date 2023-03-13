import React, { useState, useEffect } from "react";
import {
  FormControl,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import Pagination from "./Pagination";
import fileTestApi from "apis/fileTestApi";
import submitTestApi from "apis/submitTestApi";
import { AudioCard } from 'material-ui-player';

export default function Part2({ part, testId, submitId, setSubmitAnswers2}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [partQuestions, setPartQuestions] = useState([]);
  const [submitList, setSubmitList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);

  const addAnswers = (answer) =>{
    let checkExisted = submitList.some(item =>
      answer.QuestionTestId === item.QuestionTestId
    );

    let newList = [];
    if(checkExisted === true){
      newList = submitList.filter(item => item.QuestionTestId !== answer.QuestionTestId);     
    }
    else{
      newList = submitList;      
    }
    
    newList.push(answer);
    setSubmitList(newList);
    setSubmitAnswers2(newList);    
}

const IsCheckedAnswer = (answerId) =>{
  let checkedAnswer = submitList.some(item =>
    answerId === item._id
  );
  return checkedAnswer;    
}

  useEffect(() => {
    (async function () {
      const res = await fileTestApi.getAllQuestionsOfFile(testId, part, currentPage);
      setPartQuestions(res.data);
      
    })();
    return () => {};
  }, [testId, part]);

  useEffect(() => {
    (async function () {
      const res = await submitTestApi.getSubmitById(submitId);
      setSubmitList(res.data.AnswerTests2);
      setSubmitAnswers2(res.data.AnswerTests2);
    })();
    return () => {};
  }, [testId, part]);

  return (
    <div>
      <Typography variant="h5">Part 2</Typography>
      {partQuestions.Audio && (
        <div>
        <div>
          <AudioCard src={isPlaying === true && partQuestions.Audio} onEnded={() => setIsPlaying(false)}></AudioCard>
        </div>
        </div>
      )}
      {partQuestions.Questions &&
        partQuestions.Questions.map((question, index) => {
          return (
            <div key={index}>
              <Typography>{question.Sentence}. Mark your answer on your answer sheet.</Typography>
              <div>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    {question.Answers &&
                      question.Answers.map((answer, index) => {
                        return (
                          <FormControlLabel
                            key={index}
                            value={answer.Sentence}
                            control={<Radio 
                              checked = {IsCheckedAnswer(answer._id)}
                              onClick={()=>addAnswers(answer)}
                             
                              />}
                            label={`(${answer.Sentence})`}
                          />
                        );
                      })}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          );
        })}
      <Pagination pages={1} setCurrentPage={setCurrentPage} ></Pagination>
    </div>
  );
}
