import Grid from "@material-ui/core/Grid";
import communicateIcon from "../assets/icons/communicate.png";
import flashcardIcon from "../assets/icons/flashcard.png";
import friendsIcon from "../assets/icons/friends.png";
import grammarIcon from "../assets/icons/grammar.png";
import toeicIcon from "../assets/icons/toeic.png";
import { ROUTES } from "../constants";
import useTitle from "../hooks/useTitle";
import React, { useState, useEffect } from "react";
import StatBox from "components/StatBox";
import statisticsApi from "./../apis/statisticsApi";
import { useSelector } from "react-redux";

function AdminPage() {
  useTitle("Admin");
  const [count, setCount] = useState({
    user: 0,
    word: 0,
    listen: 0,
    quiz: 0,
    grammar: 0,
  });

  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    (async function () {
      const numUsers = await statisticsApi.countUser();
      const numWords = await statisticsApi.countWord();
      const numListens = await statisticsApi.countListening();
      const numQuizzes = await statisticsApi.countQuiz();
      const numGrammars = await statisticsApi.countGrammar();
      setCount({
        ...count,
        user: numUsers.data.count,
        word: numWords.data.count,
        listen: numListens.data.count,
        quiz: numQuizzes.data.count,
        grammar: numGrammars.data.count,
      });
    })();
    return () => {};
  }, [count]);

  return (
    <div className="container my-10">
      <Grid container spacing={3}>
        {user.roleType === "admin" && (
          <Grid item xs={12} md={6} lg={4}>
            <StatBox icon={friendsIcon} title="User" count={count.user} />
          </Grid>
        )}
        <Grid item xs={12} md={6} lg={4}>
          <StatBox icon={flashcardIcon} title="Vocabulary" count={count.word} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatBox
            icon={communicateIcon}
            title="Listening"
            count={count.listen}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatBox icon={toeicIcon} title="Quiz" count={count.quiz} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatBox icon={grammarIcon} title="Grammar" count={count.grammar} />
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminPage;
