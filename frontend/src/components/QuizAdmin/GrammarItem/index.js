
import { cloudinaryImgOptimize } from "helper";
import PropTypes from "prop-types";
import React, { useState } from "react";
import useStyle from "./style";
import WordDetailModal from "components/UI/WordDetailModal";
import { useDispatch } from "react-redux";
import { setMessage } from "redux/actions/messageAction";
import { DEFAULTS } from '../../../constants/index';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete'
import { deleteGrammar } from "redux/actions/grammarAction";
import { useHistory } from "react-router-dom";

function GrammarItem({ _id, Title, Image, Level, Content }) {
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


  return (
    <>
      <div className={`${classes.root} flex-center-between`}>
        <div 
          className="w-100 flex-center--ver"
          onClick={() => handleClick(_id)}
        >
          <img className={classes.picture} src={imgSrc} alt="photo" />
          <div className="ml-8 flex-grow-1">
            <h3 className={classes.word}>
              {Title}
              
            </h3>
          
              <p className={`${classes.phonetic} phonetic`}> Level: {Level} </p>
           
            <p className={classes.mean}>{Content}</p>
          </div>
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

GrammarItem.propTypes = {
  CreateDate: PropTypes.string,
  onShowDetail: PropTypes.func,
  Topic: PropTypes.string,
  Image: PropTypes.string,
  Name: PropTypes.string,
  _id: PropTypes.string,
};

GrammarItem.defaultProps = {
  onShowDetail: function () {},
};

export default GrammarItem;
