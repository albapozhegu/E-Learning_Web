import React from 'react';
import { Link } from 'react-router-dom';
import useStyle from './style';

function TopicBox({ to = '', icon = '', title = '' }) {
  const classes = useStyle();
  return (
    <Link to={to} className={`${classes.root} flex-center--ver w-100`}>
      <img className={classes.icon} src={icon} alt="Icon" />
      <h3 className={classes.title}>{title}</h3>
    </Link>
  );
}

export default TopicBox;
