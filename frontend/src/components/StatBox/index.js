import React from "react";
import useStyle from "./style";
import CountUp from 'react-countup'

function StatBox({ count, icon, title }) {
  const classes = useStyle();
  return (
    <div className={`${classes.root} flex-center--ver w-100`}>
      <img className={classes.icon} src={icon} alt="Icon" />
      <div>
        <h6 className={classes.title}>{title}</h6>
        <h3 className={classes.count}><CountUp end={count || 0} duration={2} separator=' '></CountUp></h3>
      </div>
    </div>
  );
}

export default StatBox;
