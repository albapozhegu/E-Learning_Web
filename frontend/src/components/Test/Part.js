import { Container } from "@material-ui/core";
import React from "react";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import Part4 from "./Part4";
import Part5 from "./Part5";
import Part6 from "./Part6";
import Part7 from "./Part7";

function Part({
  part,
  testId,
  submitId,
  setSubmitAnswers1,
  setSubmitAnswers2,
  setSubmitAnswers3,
  setSubmitAnswers4,
  setSubmitAnswers5,
  setSubmitAnswers6,
  setSubmitAnswers7,
}) {
  const renderPart = (part) => {
    if (part === 1)
      return (
        <Part1
          part={part}
          testId={testId}
          submitId={submitId}
          setSubmitAnswers1={setSubmitAnswers1}
        />
      );
    else if (part === 2)
      return (
        <Part2
          part={part}
          testId={testId}
          submitId={submitId}
          setSubmitAnswers2={setSubmitAnswers2}
        />
      );
    else if (part === 3)
      return (
        <Part3
          part={part}
          testId={testId}
          submitId={submitId}
          setSubmitAnswers3={setSubmitAnswers3}
        />
      );
    else if (part === 4)
      return (
        <Part4
          part={part}
          testId={testId}
          submitId={submitId}
          setSubmitAnswers4={setSubmitAnswers4}
        />
      );
    else if (part === 5)
      return (
        <Part5
          part={part}
          testId={testId}
          submitId={submitId}
          setSubmitAnswers5={setSubmitAnswers5}
        />
      );
    else if (part === 6)
      return (
        <Part6
          part={part}
          testId={testId}
          submitId={submitId}
          setSubmitAnswers6={setSubmitAnswers6}
        />
      );
    else
      return (
        <Part7
          part={part}
          testId={testId}
          submitId={submitId}
          setSubmitAnswers7={setSubmitAnswers7}
        />
      );
  };
  return <Container>{renderPart(part)}</Container>;
}
export default React.memo(Part);
