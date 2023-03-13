import Popover from '@material-ui/core/Popover';
import CloseIcon from '@material-ui/icons/Close';
import Skeleton from '@material-ui/lab/Skeleton';
import { WORD_SPECIALTY } from 'constants/index';
import { TOPICS } from 'constants/topics';
import { cloudinaryImgOptimize } from 'helper';
import PropTypes from 'prop-types';
import React from 'react';
import Tag from '../Tag';
import useStyle from './style';

function sliceTopics(topics) {
  let res = [];
  topics.forEach((topic) => {
    res.push(TOPICS.find((i) => i.key === topic));
  });
  return res;
}

function WordDetailModal(props) {
  const {
    _id,
    Image,
    Name,
    Topic,
    CreateDate,
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
          Details from <span className={classes.wordTitle}>{`"${Name}"`}</span>
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
                {Name}&nbsp;
               
                <span className={classes.mean}>Create Date :{` - ${CreateDate}`}</span>
              </p>
              {Boolean(Topic) && (
                <p className={`${classes.phonetic} mt-4`}>{Topic}</p>
              )}
            </div>
          </div>

          {/* {level !== '0' && (
            <p className={classes.level}>
              <b className={classes.label}>Create:</b>&nbsp;&nbsp;
              {level}
            </p>
          )} */}
         
        </div>
      )}
    </Popover>
  );
}

WordDetailModal.propTypes = {
  loading: PropTypes.bool,
  Description: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  Topic: PropTypes.string,
  Image: PropTypes.string,
  Name: PropTypes.string,
  _id: PropTypes.string,
};

WordDetailModal.defaultProps = {
  loading: true,
  Description: '',
  onClose: function () {},
  open: false,
  Topic: '',
  Image: '',
  Name: '',
  _id: '',
};

export default WordDetailModal;
