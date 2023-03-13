
import { cloudinaryImgOptimize } from "helper";
import PropTypes from "prop-types";
import React, { useState } from "react";
import useStyle from "./style";
import WordDetailModal from "components/UI/WordDetailModal";
import { useDispatch } from "react-redux";
import { setMessage } from "redux/actions/messageAction";
import { DEFAULTS } from '../../../constants/index';
import { deleteListen } from "redux/actions/listeningAction";
import { useHistory } from "react-router-dom";

function ListeningItem({ _id, Name, Image, Topic, CreateDate }) {
  const classes = useStyle();
  const imgSrc = cloudinaryImgOptimize(
    Image ? Image : DEFAULTS.IMAGE_SRC,
    50,
    50,
    true,
    true
  );

  const history = useHistory();
  function handleClick(id) {
    history.push(`/admin/quiz/details/${id}`);
  }
  const [modal, setModal] = useState({ loading: false, open: false });
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
       dispatch(deleteListen(id));
       dispatch(setMessage("Delete successfully", "success"));
     window.location.reload();
    }
  };

  return (
    <>
      <div className={`${classes.root} flex-center-between`}>
        <div 
          className="w-100 flex-center--ver"
          onClick={() => handleClick(_id)}
        >
          <img className={classes.picture} src={imgSrc} alt="" />
          <div className="ml-8 flex-grow-1">
            <h3 className={classes.word}>
              {Name}
              
            </h3>
          
              <p className={`${classes.phonetic} phonetic`}> Topic: {Topic} </p>
           
            <p className={classes.mean}>Create Date: {CreateDate}</p>
          </div>
        </div>
        <div className="flex-center--ver">
      </div>
      </div>
      {modal.open && (
        <WordDetailModal
          {...modal}
          onClose={() => setModal({ open: false, loading: false })}
        />
      )}
    </>
  );
}

ListeningItem.propTypes = {
  CreateDate: PropTypes.string,
  onShowDetail: PropTypes.func,
  Topic: PropTypes.string,
  Image: PropTypes.string,
  Name: PropTypes.string,
  _id: PropTypes.string,
};

ListeningItem.defaultProps = {
  onShowDetail: function () {},
};

export default ListeningItem;
