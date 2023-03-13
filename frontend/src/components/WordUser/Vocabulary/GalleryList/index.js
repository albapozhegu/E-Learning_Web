import Tooltip from '@material-ui/core/Tooltip';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import GalleryItem from '../GalleryItem';
import useStyle from './style';

const perPage = 7;
function GalleryList({ list, total}) {
  const classes = useStyle();
  const [currentPage, setCurrentPage]= useState(1);

  const handleNextClick = () => {
    if (currentPage < total) {
      setCurrentPage(currentPage +1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
     setCurrentPage(currentPage-1)
    }
  };

  return (
    <div className={`${classes.root} english-container`}>
      {list && list.length > 0 &&(
        <>
          {/* gallery */}
          {list.slice((currentPage-1)*perPage, currentPage*perPage).map((item, index) => (
            <GalleryItem key={index} {...item}/>
          ))}

          {/* navigation arrow */}
          {currentPage > 1 && (
            <Tooltip title="Previous">
              <span className="nav-arrow prev" onClick={handlePrevClick} />
            </Tooltip>
          )}
          {currentPage < total && (
            <Tooltip title="Next">
              <span className="nav-arrow next" onClick={handleNextClick} />
            </Tooltip>
          )}
        </>
      //  ) : (
      //   <>
      //     {new Array(7).fill(0).map((_, index) => (
      //       <div key={index}>
      //         <Skeleton
      //           className="w-100 h-100"
      //           variant="rect"
      //           animation="wave"
      //         />
      //       </div>
      //     ))}
        // </>
      )}
    </div>
  );
}

GalleryList.propTypes = {
  current: PropTypes.number,
  list: PropTypes.array,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  total: PropTypes.number,
};

GalleryList.defaultProps = {
  list: [],
  onPrev: function () {},
  onNext: function () {},
  total: 1,
  current: 1,
};

export default GalleryList;
