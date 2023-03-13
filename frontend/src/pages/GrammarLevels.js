import React from 'react'
import {GRAMMAR_LEVEL  } from 'constants/grammarLevels';
import { makeStyles } from "@material-ui/styles";
import { dictionaryRoot } from "../components/UI/style";
import { Grid } from '@material-ui/core';
import useTitle from "../hooks/useTitle";
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
  ...dictionaryRoot(theme),
}));

export default function WordTopicPage() {
  useTitle("Grammar Level")
  const classes = useStyle();
  return (
    <div className={`${classes.root} english-container`}>
      <div className="flex-center-between">
        <h1 className="english-title">Grammar Levels</h1>
      </div>
      <div className="english-break"></div>
      <Grid container spacing={3}>
        {GRAMMAR_LEVEL.map((level, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Link
              to={`/grammar/level/${level.value}`}>
              <img  src={level.image} alt="photo" align="center" />
             
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

