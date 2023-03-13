import Tooltip from '@material-ui/core/Tooltip';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SlideItem from '../SlideItem';
import useStyle from './style';

function SlideShow({
  list,
  total,
  currentSlide,
  onSaveCurrentSlide,
  totalCurrentSlide,
}) {
  const classes = useStyle();
  const [current, setCurrent] = useState(currentSlide);
  const count = current;

  const onPrev = () => {
      onSaveCurrentSlide(current - 1);
      setCurrent(current - 1);
  };

  const onNext = () => {
      onSaveCurrentSlide(current + 1);
      setCurrent(current + 1);
  };


  return (
    <div className={`${classes.wrapper} flex-center--ver position-rel`}>
      {list && list.length > 0 ? (
        <>
          <SlideItem
            {...list[current]}
            example={list[current]?.examples[0]}
            // showMean={showMean}
          />

          {/* navigation arrow */}
          {count > 0 && (
            <Tooltip title="Previous">
              <span className="nav-arrow prev" onClick={onPrev} />
            </Tooltip>
          )}
          {count + 1 < total && (
            <Tooltip title="Next">
              <span className="nav-arrow next" onClick={onNext} />
            </Tooltip>
          )}
        </>
      ) : (
        <Skeleton
          variant="rect"
          className={`${classes.skeleton} w-100`}
          animation="wave"
          style={{ height: '576px' }}
        />
      )}
    </div>
  );
}

SlideShow.propTypes = {
  list: PropTypes.array,
  onGetNewList: PropTypes.func,
  onGetOldList: PropTypes.func,
  onSaveCurrentSlide: PropTypes.func,
 // showMean: PropTypes.bool,
  total: PropTypes.number,
  currentSlide: PropTypes.number,
  totalCurrentSlide: PropTypes.number,
};

SlideShow.defaultProps = {
  list: [],
  total: 0,
  currentSlide: 0,
};

export default SlideShow;
