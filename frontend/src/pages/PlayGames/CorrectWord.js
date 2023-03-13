
import CorrectWordData from 'components/PlayGames/CorrectWord/data';
import useCloseNavigation from 'hooks/useCloseNavigation';
import useTitle from 'hooks/useTitle';
import React from 'react';

function CorrectWordPage() {
  useTitle("Game (Let's choose the correct word)");
   useCloseNavigation();

  return <CorrectWordData />;
}

export default CorrectWordPage;
