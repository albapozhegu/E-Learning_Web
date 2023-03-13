import Tooltip from '@material-ui/core/Tooltip';
import CarouselIcon from '@material-ui/icons/ViewCarousel';
import CollectionsIcon from '@material-ui/icons/ViewQuilt';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import GalleryList from './GalleryList';
import SlideShow from './SlideShow';
import useStyle from './style';

const perPage = 7;
const tutorial =
  'There are 2 view modes: gallery and slide. Click on the eye icon to toggle the meaning of the word.';

function Vocabulary({
  list,
  total,
}) {
  const classes = useStyle();
  const [mode, setMode] = useState(0); // 0 - gallery, 1 - slide show
  const currentSlide = useRef(0);
 
  
  return (
    <div className="container my-10">
      <div className="flex-center-between">
        <h1 className="english-title">Vocabulary</h1>
        <div className={classes.iconWrap}>
          <Tooltip title="Collection" placement="bottom">
            <CollectionsIcon
              onClick={() => setMode(0)}
              className={`${classes.icon} ${mode === 0 ? 'active' : ''}`}
            />
          </Tooltip>

          <Tooltip title="Item" placement="bottom">
            <CarouselIcon
              onClick={() => setMode(1)}
              className={`${classes.icon} ${mode === 1 ? 'active' : ''}`}
            />
          </Tooltip>

          {/* <Tooltip title="Xem nghĩa của từ" placement="bottom">
            {isShowMean ? (
              <VisibilityOffIcon
                className={classes.icon}
                onClick={() => setIsShowMean(false)}
              />
            ) : (
              <VisibilityIcon
                className={classes.icon}
                onClick={() => setIsShowMean(true)}
              />
            )}
          </Tooltip>

          <Tooltip title="Cài đặt gói từ vựng" placement="bottom">
            <SettingsIcon
              className={classes.icon}
              onClick={() => setOpenWordPack(true)}
            />
          </Tooltip>

          <TooltipCustom title={tutorial} placement="bottom">
            <HelpIcon className={classes.icon} />
          </TooltipCustom>

             */}
        </div>
      </div>
      <div className="english-break" />
{/* 
      {openWordPack && (
        <WordPack
          open={true}
          topicMultiples={true}
          onCancel={() => setOpenWordPack(false)}
          cancelBtnText="Đóng"
          onChoose={(packInfo) => {
            onWordPackChange(packInfo);
            setOpenWordPack(false);
          }}
        />
      )} */}
    

      {mode === 0 ? (
        <GalleryList
          list={list}
          total={Math.ceil(total / perPage)}
        />
      ) : (
        <SlideShow
          list={list}
          total={total}
          currentSlide={currentSlide.current}
          onSaveCurrentSlide={(v) => (currentSlide.current = v)}
          totalCurrentSlide={currentSlide.current}
        />
      )}
    </div>
  );
}

Vocabulary.propTypes = {
  list: PropTypes.array,
  total: PropTypes.number,
};

Vocabulary.defaultProps = {
  list: [],
  total: 0,
};

export default Vocabulary;
