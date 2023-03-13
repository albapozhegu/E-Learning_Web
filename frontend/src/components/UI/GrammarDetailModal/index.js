import Popover from '@material-ui/core/Popover';
import CloseIcon from '@material-ui/icons/Close';
import Skeleton from '@material-ui/lab/Skeleton';
import { WORD_SPECIALTY } from 'constants/index';
import { GRAMMAR_LEVEL } from 'constants/grammarLevels';
import { cloudinaryImgOptimize } from 'helper';
import PropTypes from 'prop-types';
import React from 'react';
import Tag from '../Tag';
import useStyle from './style';

function sliceTopics(levels) {
  let res = [];
  levels.forEach((level) => {
    res.push(GRAMMAR_LEVEL.find((i) => i.value === level));
  });
  return res;
}

function GrammarDetailModal(props) {
  const {
    _id,
    Image,
    Title,
    Level,
    Content,
    open,
    onClose,
    loading,
  } = props;

  const classes = useStyle();

  return (
    <Popover
      classes={{
        root: `${classes.root} flex-center`,
        paper: `${classes.paper} container`,
      }}
      open={open}
      onClose={onClose}
      anchorReference={'none'}>
      <div className="flex-center-between">
        <h2 className={classes.title}>
          Details from<span className={classes.wordTitle}>{`"${Title}"`}</span>
        </h2>
        <CloseIcon
          className={`${classes.closeIcon} cur-pointer`}
          onClick={onClose}
        />
      </div>

      <div className="english-break"></div>

      {loading ? (
        <Skeleton
          style={{ width: '100%', height: '35vh' }}
          variant="rect"
          animation="wave"
        />
      ) : (
        <div className={classes.content}>
          <div className="flex-center--ver my-4">
            {Image && Image !== '' && (
              <img
                src={cloudinaryImgOptimize(Image, 56, 56, true)}
                alt="Photo"
                className={`${classes.picture} mr-8`}
              />
            )}
            <div>
              <p className={classes.word}>
                {Title}&nbsp;
               
                <span className={classes.mean}> {Content}</span>
              </p>
              {Boolean(Level) && (
                <p className={`${classes.phonetic} mt-4`}>Level: {Level}</p>
              )}
            </div>
          </div>

          {/* {level !== '0' && (
            <p className={classes.level}>
              <b className={classes.label}>Cấp độ:</b>&nbsp;&nbsp;
              {level}
            </p>
          )} */}
         
        </div>
      )}
    </Popover>
  );
}

GrammarDetailModal.propTypes = {
  loading: PropTypes.bool,
  Content: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  Level: PropTypes.string,
  Image: PropTypes.string,
  Title: PropTypes.string,
  _id: PropTypes.string,
};

GrammarDetailModal.defaultProps = {
  loading: true,
  Content: '',
  onClose: function () {},
  open: false,
  Level: '',
  Image: '',
  Title: '',
  _id: '',
};

export default GrammarDetailModal;
