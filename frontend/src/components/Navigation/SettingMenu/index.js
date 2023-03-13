import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FaceIcon from "@material-ui/icons/Face";
import SettingsIcon from "@material-ui/icons/Settings";
import SettingModal from "../Settings/Modal";
import { ROUTES } from "../../../constants";
import PropTypes from "prop-types";
import React, { useState } from "react";
import useStyle from "./style";
import { useSelector } from "react-redux";
import HomeIcon from '@material-ui/icons/Home'
import { Link } from "react-router-dom";
function SettingMenu({ anchorEl, onClose }) {
  const classes = useStyle();
  const { isAuth, role } = useSelector((state) => state.authReducer);
  const [open, setOpen] = useState(false);

  return (
    <>
      {isAuth ? (
        <Menu
          classes={{ paper: classes.root }}
          anchorEl={anchorEl}
          disableScrollLock={true}
          getContentAnchorEl={null}
          onClose={onClose}
          open={Boolean(anchorEl)}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
        >
          <Link to={ROUTES.PROFILE}>
            <MenuItem className={classes.menuItem}>
              <AccountCircleIcon className={classes.icon} fontSize="small" />
              <p className={classes.text}>Personal information</p>
            </MenuItem>
          </Link>
          {window.location.href.includes('admin') ? (
           <a href={ROUTES.HOME}>
              <MenuItem className={classes.menuItem}>
                <HomeIcon className={classes.icon} fontSize="small" />
                <p className={classes.text}>Home page</p>
              </MenuItem>
            </a>
          ) : (
            <a href={ROUTES.ADMIN}>
              <MenuItem className={classes.menuItem}>
                <FaceIcon className={classes.icon} fontSize="small" />
                <p className={classes.text}>Admin</p>
              </MenuItem>
            </a>
          )}
          <MenuItem onClick={() => setOpen(true)} className={classes.menuItem}>
            <SettingsIcon className={classes.icon} fontSize="small" />
            <p className={classes.text}>Settings</p>
          </MenuItem>
          
          <a href={ROUTES.LOGOUT}>
            <MenuItem className={classes.menuItem}>
              <ExitToAppIcon className={classes.icon} fontSize="small" />
              <p className={classes.text}>Log out</p>
            </MenuItem>
          </a>
          {open && <SettingModal open={open} onClose={() => setOpen(false)} />}
        </Menu>
      ) : (
        ""
      )}
    </>
  );
}

SettingMenu.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
};

SettingMenu.defaultProps = {
  anchorEl: null,
  onClose: function () {},
};

export default SettingMenu;
