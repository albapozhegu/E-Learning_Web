import medalIcon from 'assets/icons/medal.png';
import LeaderBoardData from 'components/LeaderBoard/data';
import { HIGHSCORE_NAME } from 'constants/game';
import useTitle from 'hooks/useTitle';
import './style/leader-board.scss';
import React from 'react';

const COLORS = ['#847AD1', '#7AD18A', '#E06B96', '#36C0CE', '#DB883E'];

function LeaderBoardPage() {
  useTitle('Bảng xếp hạng');

  return (
    <div className="container">
      <div className="leaderboard">
        <h1 className="leaderboard-title flex-center">
          <img src={medalIcon} alt="Icon" className="leaderboard-icon" />
          CHARTS
        </h1>

        <div className="english-break"></div>

        <div className="leaderboard-grid">
          <LeaderBoardData
            title="Top users with the most Coins"
            color={COLORS[0]}
           // nameId={HIGHSCORE_NAME.TOP_COIN}
            unit="$"
            tooltip="Top users with the most coins"
            nameGame={HIGHSCORE_NAME.TOP_COIN}
          />
          <LeaderBoardData
            title="TTop Please choose the correct word"
            color={COLORS[1]}
          //  nameId={HIGHSCORE_NAME.CORRECT_GAME_RIGHT}
            unit="sentence"
            tooltip="Top users with the most correct sentences in the game Choose the correct word"
            nameGame={HIGHSCORE_NAME.CORRECT_WORD}
          />
          <LeaderBoardData
            title="Top Word Matching"
            color={COLORS[2]}
           // nameId={HIGHSCORE_NAME.CORRECT_GAME_RIGHT_CONSECUTIVE}
            unit="sentence"
            tooltip="Top users with the most correct sentences in the word Match game"
            nameGame={HIGHSCORE_NAME.WORD_MATCH}
          />
          <LeaderBoardData
            title="Top hand is faster than brain"
            color={COLORS[3]}
          //  nameId={HIGHSCORE_NAME.FAST_GAME}
            unit="the point"
            tooltip="Top users with the highest score in the game Tay is faster than the brain"
            nameGame={HIGHSCORE_NAME.FAST_GAME}
          />
        </div>
      </div>
    </div>
  );
}

export default LeaderBoardPage;
