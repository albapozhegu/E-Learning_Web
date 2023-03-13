import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { dictionaryRoot } from "../components/UI/style";
import useTitle from "../hooks/useTitle";
import { Grid } from "@material-ui/core";
import TopicBox from "../components/TopicBox/index";
import toeicIcon from "../assets/icons/topics/toeic.png";
import testApi from "apis/testApi";

const useStyle = makeStyles((theme) => ({
  ...dictionaryRoot(theme),
}));

export default function TestListPage() {
  useTitle("Test");
  const classes = useStyle();
  const [tests, setTests] = useState([]);
  useEffect(() => {
    (async function () {
      const res = await testApi.getAllTest();
      setTests(res.data.tests);
    })();
    return () => {};
  }, []);

  return (
    <div className={`${classes.root} english-container`}>
      <div className="flex-center-between">
        <h1 className="english-title">Test</h1>
      </div>
      <div className="english-break"></div>
      <Grid container spacing={3}>
        {tests.map((test, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <TopicBox
              to={`/test/${test._id}`}
              title={test.Name}
              icon={toeicIcon}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
