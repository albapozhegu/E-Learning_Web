import { Fade, Typography } from "@material-ui/core";
import { convertTime } from "helper";
import React, { useState } from "react";
import { useEffect } from "react";
import submitTestApi from "apis/submitTestApi";

export default function Timer({ 
  value,  
  onSubmitTest
}) {
  let initTime = convertTime(value);
  const [time, setTime] = useState({
    hours: initTime.hours,
    minutes: initTime.minutes,
    seconds: initTime.seconds,
  });
  const [timer, setTimer] = useState(null);

 
  useEffect(() => {
  const items = JSON.parse(localStorage.getItem('time'));
  console.log(items)
  if (items) {
   setTime(items);
  }
}, []);


  useEffect(() => {
    let myInterval = setInterval(() => {
      setTime((time) => {
        const updatedTime = { ...time };
        if (time.seconds > 0) {
          updatedTime.seconds--;
        }
        if (time.seconds === 0) {
          if (time.hours === 0 && time.minutes === 0) {
            clearInterval(myInterval);
            onSubmitTest();
          } else if (time.minutes > 0) {
            updatedTime.minutes--;
            updatedTime.seconds = 59;
          } else if (updatedTime.hours > 0) {
            updatedTime.hours--;
            updatedTime.minutes = 59;
            updatedTime.seconds = 59;
          }
        }
        localStorage.setItem('time', JSON.stringify(updatedTime));
        return updatedTime;
      });
    }, 1000);

    
    return () => {
      if (myInterval) clearInterval(myInterval);
    };
  }, [onSubmitTest]);

  return (
    <Typography variant="h6">
      {time.hours < 10 && time.hours !== 0
        ? `0${time.hours}:`
        : time.hours >= 10 && `${time.hours}:`}
      {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
      {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
    </Typography>
  );
}
