import React, { useEffect, useState } from "react";
import {
  FormControl,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import Pagination from "./Pagination";
import submitTestApi from "apis/submitTestApi";
import fileTestApi from "apis/fileTestApi";

export default function Part7({ part, testId, submitId, setSubmitAnswers7 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [partQuestions, setPartQuestions] = useState([]);
  const [submitList, setSubmitList] = useState([]);

  const addAnswers = (answer) => {
    let checkExisted = submitList.some(
      (item) => answer.QuestionTestId === item.QuestionTestId
    );

    let newList = [];
    if (checkExisted === true) {
      newList = submitList.filter(
        (item) => item.QuestionTestId !== answer.QuestionTestId
      );
    } else {
      newList = submitList;
    }

    newList.push(answer);
    setSubmitList(newList);
    setSubmitAnswers7(newList);
  };

  const IsCheckedAnswer = (answerId) => {
    let checkedAnswer = submitList.some((item) => answerId === item._id);
    return checkedAnswer;
  };

  useEffect(() => {
    (async function () {
      const res = await fileTestApi.getAllQuestionsOfFile(
        testId,
        part,
        currentPage
      );
      // const indexOfLast = currentPage;
      // const indexOfFirst = indexOfLast - 1;
      setPartQuestions(res.data);
    })();
    return () => {};
  }, [testId, part, currentPage]);

  useEffect(() => {
    (async function () {
      const res = await submitTestApi.getSubmitById(submitId);
      setSubmitList(res.data.AnswerTests7);
      setSubmitAnswers7(res.data.AnswerTests7);
    })();
    return () => {};
  }, [testId, part]);
  console.log(currentPage);
  return (
    <div>
      <Typography variant="h5">Part 7</Typography>
      <div>
        {partQuestions?.Image && (
          <img src={partQuestions.Image} alt="" width="500" height="300" />
        )}
        {partQuestions?.Image2 && (
          <img src={partQuestions.Image2} alt="" width="500" height="300" />
        )}
        {partQuestions?.Image3 && (
          <img src={partQuestions.Image3} alt="" width="500" height="300" />
        )}
      </div>
      <div>
        <FormControl>
          {partQuestions?.Questions &&
            partQuestions?.Questions.map((question, index) => {
              return (
                <div key={index}>
                  <Typography>
                    {question.Sentence}. {question.Content}
                  </Typography>
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
                            control={
                              <Radio
                                onClick={() => addAnswers(answer)}
                                checked={IsCheckedAnswer(answer._id)}
                              />
                            }
                            label={`(${answer.Sentence}) ${answer.Content}`}
                          />
                        );
                      })}
                  </RadioGroup>
                </div>
              );
            })}
        </FormControl>
      </div>
      <Pagination
        pages={15}
        setCurrentPage={setCurrentPage}
        submitAnswers7={submitList}
        submitId={submitId}
      ></Pagination>
    </div>
  );
}
