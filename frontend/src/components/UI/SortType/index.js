import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpIcon from '@material-ui/icons/ArrowUpward';
import FilterIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useStyle from './style';

function SortTypeModal({ classNameIcon, onSelect }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyle();

  const handleOpenModal = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (v) => {
    setAnchorEl(null);
    if (typeof v === 'string') {
      onSelect(v);
    }
  };

  return (
    <>
      <FilterIcon className={classNameIcon} onClick={handleOpenModal} />
      <Menu
        classes={{ paper: classes.menu }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem
          className={classes.menuItem}
          onClick={() => handleClose('Newest')}>
          Newest&nbsp;
          <ArrowDownIcon />
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={() => handleClose('Oldest')}>
          Oldest&nbsp;
          <ArrowUpIcon />
        </MenuItem>
      </Menu>
    </>
  );
}

SortTypeModal.propTypes = {
  classNameIcon: PropTypes.string,
  onSelect: PropTypes.func,
};

SortTypeModal.defaultProps = {
  classNameIcon: '',
  onSelect: () => {},
};

export default SortTypeModal;
