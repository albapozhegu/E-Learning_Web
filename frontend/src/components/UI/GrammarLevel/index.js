import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import SelectCustom from 'components/UI/SelectCustom';
// import { WORD_TYPES, WORD_SPECIALTY, WORD_LEVELS } from 'constants';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import TopicSelect from '../../UI/TopicSelect';
import useStyle from './style';
import {GRAMMAR_LEVEL } from '../../../constants/grammarLevels';

const formId = 'grammarLevelPackForm';

function addAllOption(optionList = []) {
  return [{ value: 'All', label: 'All' }, ...optionList];
}

function GrammarLevel(props) {
  const {
    onChoose,
    onCancel,
    open,
    title,
    okBtnText,
    cancelBtnText,
    okBtnProps,
    cancelBtnProps,
  } = props;

  const classes = useStyle();
  //const topics = useRef([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { target } = e;
    const level = target.level?.value || '-1'

    //console.log(topic);
    onChoose({
     level
    });
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      maxWidth="md"
      fullWidth
      disableBackdropClick
      open={open}>
      <DialogTitle classes={{ root: classes.title }}>{title}</DialogTitle>

      <DialogContent dividers classes={{ dividers: classes.breakLine }}>
        <form id={formId} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <SelectCustom
                label="Level"
                className="w-100"
                index={0}
                options={addAllOption(GRAMMAR_LEVEL)}
                inputProps={{ name: 'level' }}
              />
            </Grid>
           
          
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onCancel}
          className="_btn _btn-stand"
          variant="outlined"
          {...cancelBtnProps}>
          {cancelBtnText}
        </Button>
        <Button
          autoFocus
          disableFocusRipple
          component="button"
          type="submit"
          form={formId}
          className="_btn _btn-primary"
          variant="contained"
          {...okBtnProps}>
          {okBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

GrammarLevel.propTypes = {
  cancelBtnProps: PropTypes.object,
  cancelBtnText: PropTypes.string,
  okBtnProps: PropTypes.object,
  okBtnText: PropTypes.string,
  onCancel: PropTypes.func,
  onChoose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
 // topicMultiples: PropTypes.bool,
};

GrammarLevel.defaultProps = {
  onChoose: function () {},
  open: true,
 // topicMultiples: true,
  title: 'Gói từ vựng',
  okBtnText: 'Ok',
  cancelBtnText: 'Đóng',
  okBtnProps: {},
  cancelBtnProps: {},
};

export default GrammarLevel;
