import FastGameData from 'components/PlayGames/FastGame/data';
import useCloseNavigation from 'hooks/useCloseNavigation';
import useTitle from 'hooks/useTitle';
import React from 'react';


function FastGamePage() {
  useTitle('Game hands faster than brain');
  useCloseNavigation();

  return <FastGameData />;
}

export default FastGamePage;
