import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ROUTES } from "../../constants";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SettingMenu from "./SettingMenu";
import useStyle from "./style";
import { cloudinaryImgOptimize } from "helper";

import { useHistory } from "react-router-dom";

function Navigation() {
  const classes = useStyle();
  const theme = useTheme();
  const isXsDevice = useMediaQuery(theme.breakpoints.up("xs"));
  const { isAuth, user } = useSelector((state) => state.authReducer);
  const avtSrc = cloudinaryImgOptimize(user.avatar, 48, 48);
  const [showInput, setShowInput] = useState(isXsDevice);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const history = useHistory();
  const onOpenMenu = (e) => setAnchorMenu(e.currentTarget);
  const onCloseMenu = () => setAnchorMenu(null);

  return (
    <div className={`${classes.navWrapper} w-100vw`} id="englishNav">
      <div className={`${classes.nav} w-100`}>
        <div className="container h-100 flex-center--ver">
          {(isXsDevice || !showInput) && (
            <>
              <a href={ROUTES.HOME}>
                <img
                  className={`${classes.imgSize} ${classes.logo}`}
                  src={
                    "https://res.cloudinary.com/phongvn2611/image/upload/v1637319049/english/avatar/logo-horizon_vmirgt.png"
                  }
                  alt="Logo"
                />
              </a>

              <div className={classes.bgp}>
                {!window.location.href.includes("admin") && (
                  <div>
                    <Button
                      className={classes.bbcleNavButton}
                      onClick={() => history.push(ROUTES.LISTENING_TOPICS)}
                    >
                      Listening
                    </Button>
                    <Button
                      className={classes.bbcleNavButton}
                      onClick={() => history.push(ROUTES.GRAMMAR_LEVELS)}
                    >
                      Grammar
                    </Button>
                    <Button
                      className={classes.bbcleNavButton}
                      onClick={() => history.push(ROUTES.WORD_TOPIC)}
                    >
                      Vocabulary
                    </Button>
                    <Button
                      className={classes.bbcleNavButton}
                      onClick={() => history.push(ROUTES.IPA_LIST)}
                    >
                      Pronunciation
                    </Button>
                    <Button
                      className={classes.bbcleNavButton}
                      onClick={() => history.push(ROUTES.TEST)}
                    >
                      Test
                    </Button>
                    <Button
                      className={classes.bbcleNavButton}
                      onClick={() => history.push(ROUTES.GAMES_HOME)}
                    >
                      Games
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}

          <div className={`${classes.control} flex-center--ver`}>
            {showInput && !isXsDevice && (
              <ArrowBackIosIcon
                className={`${classes.iconSize} mr-4 cur-pointer`}
                onClick={() => setShowInput(!showInput)}
              />
            )}

            {isAuth ? (
              <div className={classes.auth} onClick={onOpenMenu}>
                <Avatar
                  className={`${classes.imgSize} ${classes.avt} cur-pointer`}
                  alt="Username"
                  src={avtSrc}
                />
                <p className={classes.name}>{user.name}</p>
              </div>
            ) : (
              <div>
                {/* <Link to={ROUTES.REGISTER}> */}
                <Button
                  className="_btn _btn-primary"
                  classes={{
                    root: classes.registerBtn,
                    label: classes.registerLabel,
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => window.location.replace("/register")}
                >
                  Register
                </Button>
                {/* </Link> */}
                {/* <Link to={ROUTES.LOGIN}> */}
                <Button
                  className="_btn _btn-primary"
                  classes={{
                    root: classes.loginBtn,
                    label: classes.loginLabel,
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => window.location.replace("/login")}
                >
                  Log in
                </Button>
                {/* </Link> */}
              </div>
            )}

            <SettingMenu anchorEl={anchorMenu} onClose={onCloseMenu} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
