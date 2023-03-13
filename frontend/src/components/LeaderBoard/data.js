import highscoreApi from 'apis/highScoreApi';
import userApi from 'apis/userApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import LeaderBoard from '.';

function LeaderBoardData({ color, title, unit, tooltip, nameGame }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSub = true;

    (async function () {
      try {
        if(nameGame === "top-coin"){
        const apiRes = await userApi.getTopCoin(nameGame);
        if (apiRes.status === 200) {
          if(apiRes.data.length > 5)
          {
            setList(apiRes.data.slice(0,5))
          }
          else
          {
            setList(apiRes.data)
          }
          setLoading(false);
        }
      }
      else{
        const apiRes2 = await highscoreApi.getLeaderboard(nameGame);
        if (apiRes2.status === 200) {
          console.log(apiRes2.data)
          if(apiRes2.data.length > 5)
          {
            setList(apiRes2.data.list.slice(0,5))
          }
          else
          {
            setList(apiRes2.data.list)
          }
          setLoading(false);
        }
      }
      } catch (error) {}
    })();

    return () => (isSub = false);
  }, []);

  return (
    <LeaderBoard
      list={list}
      loading={loading}
      color={color}
      title={title}
      unit={unit}
      tooltip={tooltip}
    />
  );
}

LeaderBoardData.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  nameId: PropTypes.string,
  unit: PropTypes.string,
  tooltip: PropTypes.string,
};

export default LeaderBoardData;
