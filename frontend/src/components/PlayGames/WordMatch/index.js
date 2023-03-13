import Tooltip from '@material-ui/core/Tooltip';
import WrongIcon from '@material-ui/icons/Cancel';
import RightIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import incorrectAudio from 'assets/audios/incorrect.mp3';
import logoGame from 'assets/icons/games/word-match.png';
import TooltipCustom from 'components/UI/TooltipCustom';
import { UX } from 'constants/index';
import { onPlayAudio, playSoundAnswer } from 'helper/speakerHelper';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CorrectWordResult from '../Result';
import SplitWord from './SplitWord';
import useStyle from './style';

function WordMatchGame({ list }) {
  const { voice, speed, volume } = useSelector((state) => state.voiceReducer);
  const classes = useStyle();
  const nQuestion = list.length;
  const [state, setState] = useState({
    current: 0,
    nRight: 0,
    nWrong: 0,
    resetFlag: -1,
  });
  const [isDelay, setIsDelay] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { current, nRight, nWrong, resetFlag } = state;
 // const nRightConsecutive = useRef({ top: 0, n: 0 });


  const handleDone = () => {
    setIsDone(true);
  };

  const handleCorrect = () => {
    playSoundAnswer(list[current].word, true, voice, volume, speed);
    setIsDelay(true);
    // nRightConsecutive.current.n++;
    // if (nRightConsecutive.current.n > nRightConsecutive.current.top) {
    //   nRightConsecutive.current.top = nRightConsecutive.current.n;
    // }

    setTimeout(() => {
      if (current+1 >= nQuestion) {       
       
        setState({
       //   current: current + 1,
          nRight: nRight + 1,
         // resetFlag: current,
          nWrong,
        });
        handleDone();
      } else {
        setIsDelay(false);
        setState({
          current: current + 1,
          nRight: nRight + 1,
          resetFlag: current,
          nWrong,
        });
      }
    }, UX.DELAY_ANSWER);
  };

  const handleWrong = () => {
   // nRightConsecutive.current.n = 0;
    onPlayAudio(incorrectAudio);
   // setState({ ...state, nWrong: nWrong + 1 });
  };

  const handleNext = () => {
    onPlayAudio(incorrectAudio);
    if (current + 1 >= nQuestion) {
      setState({ ...state, nWrong: nWrong + 1 });
      handleDone();
    } else {
      setState({
        ...state,
        current: current + 1,
        nWrong: nWrong + 1,
        resetFlag: current,
      });
      console.log(current)
    }
  };


  const handleReplay = () => {
    setIsDone(false);
    setState({
      current: 0,
      nRight: 0,
      nWrong: 0,
      resetFlag: -1,
    });
   // nRightConsecutive.current = { top: 0, n: 0 };
  };
  console.log(current)
  console.log(nQuestion)
  return (
    <div className="flex-center-col h-100vh">
      <div className={`${classes.root} container english-game-box position-rel`}>
        {/* title */}
        <div className="english-game-title">
          <img src={logoGame} alt="game photo" />
          <h1 className="flex-center--ver">
            <span>Translate from</span>
            <TooltipCustom title="Select the characters to form a word that has the correct meaning for the given Vietnamese word">
              <HelpIcon className="ml-5" />
            </TooltipCustom>
          </h1>
        </div>

        {!isDone ? (
          <>
            {/* summary */}
            <div className={`${classes.summary} flex-center-between`}>
              <div className="flex-center--ver">
                Sentences&nbsp;<b>{current + 1}</b>
                &nbsp;/&nbsp;
                <b>{nQuestion}</b>
              </div>

              <div className="flex-center--ver">
                <b>{nRight}</b>&nbsp;Right
                <RightIcon className={`${classes.summaryIcon} right`} />
                &nbsp;-&nbsp;
                <b>{nWrong}</b>&nbsp;Wrong
                <WrongIcon className={`${classes.summaryIcon} wrong`} />
              </div>
            </div>

            {list && list.length > 0 && current+1 <= nQuestion? (
              <SplitWord
                mean={list[current].mean}
                word={list[current].word}
                onCorrect={handleCorrect}
                onWrong={handleWrong}
                resetFlag={resetFlag}
              />
            ) : (
              <h3 className="flex-center notfound-title">
                The vocabulary pack is currently unavailable, please try again later. Cold
                thanks!
              </h3>
            )}

            {current < nQuestion && (
              <Tooltip
                title={current < nQuestion - 1 ? 'Through the next sentence' : 'End'}>
                <div
                  className={`nav-arrow next ${isDelay ? 'disabled' : ''}`}
                  onClick={handleNext}
                />
              </Tooltip>
            )}
          </>
        ) : (
          <CorrectWordResult
            onReplay={handleReplay}
            nRight={nRight}
            nWrong={nWrong}
            nameGame="word-match"
          />
        )}
      </div>
    </div>
  );
}

WordMatchGame.propTypes = {
  list: PropTypes.array,
};

WordMatchGame.defaultProps = {
  list: [],
};

export default WordMatchGame;
