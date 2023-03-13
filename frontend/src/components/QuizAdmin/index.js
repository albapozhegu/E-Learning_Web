import LoopIcon from '@material-ui/icons/Loop';
import AutoSearchInput from 'components/UI/AutoSearchInput';
import InfiniteScroll from 'components/UI/InfiniteScroll';
import SortTypeModal from 'components/UI/SortType';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import useStyle from './style';
import ListenItem from './ListeningItem/index';
import GrammarItem from './GrammarItem/index';
import WordPackSetting from './WordPackSetting';
import WordSkeleton from './WordSkeleton';
import AddIcon from '@material-ui/icons/Add';
import { ROUTES } from 'constants/index';
import { useHistory } from 'react-router-dom';
import useTitle from 'hooks/useTitle'

function QuizAdmin({
  listen,
  grammar,
  loading,
  onLoadData,
  more,
  isFirstLoad,
  onSettingWordPack,
  // onSortTypeChange,
  onSearchWord,
}) {
  useTitle('Quiz Admin')
  const classes = useStyle();
  const history = useHistory();
  
  return (
    <div className={`${classes.root} english-container`}>
      {/* title - menu */}
      <div className="flex-center-between">
        <h1 className="english-title">Manage quiz</h1>
        <div>
          
          <WordPackSetting
              onChoose={onSettingWordPack}
              classNameIcon="english-setting-icon"
          />
        </div>
      </div>
      <div className="english-break"></div>

      {/* list content */}
      <div className={classes.contentWrap}>
        {/* <AutoSearchInput disabled={loading} onSearch={onSearchWord} /> */}

        <div className={`${classes.listWrap} w-100`}>
          <ul id="dictionaryId" className={`${classes.list} flex-col w-100`}>
            <>
              {isFirstLoad ? (
                <WordSkeleton className={classes.skeleton} />
              ) : (
                <>
                  {listen && grammar ? (
                    <>
                      {/* render list */}
                      {listen.length >0 && listen.map((item, index) => (
                        <li className={classes.listItem} key={index}>
                          <ListenItem {...item} />
                        </li>
                      ))}

                      {grammar.length >0 && grammar.map((item, index) => (
                        <li className={classes.listItem} key={index}>
                          <GrammarItem {...item} />
                        </li>
                      ))}

                      {/* infinite scrolling */}
                      {!loading && more && (
                        <InfiniteScroll
                          onTouchAnchor={onLoadData}
                          threshold={1}>
                          <div className="w-100 t-center">
                            <LoopIcon className="ani-spin" />
                          </div>
                        </InfiniteScroll>
                      )}
                    </>
                  ) : (
                    // empty list
                    <h3 className="notfound-title h-100 flex-center t-center">
                      No result.
                    </h3>
                  )}
                </>
              )}
            </>
          </ul>
        </div>
      </div>
    </div>
  );
}

QuizAdmin.propTypes = {
  isFirstLoad: PropTypes.bool,
  listen: PropTypes.array,
  grammar: PropTypes.array,
  loading: PropTypes.bool,
  more: PropTypes.bool,
  onLoadData: PropTypes.func,
  onSearchWord: PropTypes.func,
  onSettingWordPack: PropTypes.func,
  onSortTypeChange: PropTypes.func,
};

QuizAdmin.defaultProps = {
  listen: [],
  grammar: [],
  loading: false,
  more: true,
  isFirstLoad: true,
  onLoadData: function () {},
  onSearchWord: function () {},
  onSettingWordPack: function () {},
  onSortTypeChange: function () {},
};

export default QuizAdmin;
