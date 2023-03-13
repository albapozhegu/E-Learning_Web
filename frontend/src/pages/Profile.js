import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import InputCustom from "components/UI/InputCustom";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import userApi from "./../apis/userApi";
import useTitle from "hooks/useTitle";
import { setMessage } from "redux/actions/messageAction";
import { useDispatch } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { formatDate } from "helper";

const useStyle = makeStyles(() => ({
  wrap: {
    minHeight: "calc(100vh - 7.2rem)",
  },

  root: {
    backgroundColor: "var(--bg-color-sec)",
    padding: "1.5rem 2.5rem",
    borderRadius: "var(--border-radius)",
    textAlign: "center",
    boxShadow: "var(--box-shadow)",
  },

  avtWrap: {
    width: "15rem",
    height: "15rem",
    position: "relative",
  },

  avt: {
    borderRadius: "50%",
    border: "2px solid var(--primary-color)",
  },

  cameraIconWrap: {
    position: "absolute",
    right: 0,
    bottom: 0,

    width: "4.2rem",
    height: "4.2rem",
    padding: "1.2rem",

    backgroundColor: "var(--primary-color)",
    borderRadius: "50%",
    cursor: "pointer",
    border: "solid 5px var(--bg-color-sec)",

    "&:hover, &:active": {
      opacity: 0.85,
    },
  },

  cameraIcon: {
    color: "var(--text-color)",
    fontSize: "2rem",
  },

  fileInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    opacity: 0,
    cursor: "pointer",
  },

  name: {
    fontSize: "2.4rem",
    lineHeight: 1.5,
    letterSpacing: "0.75px",
  },

  role: {
    fontSize: "1.5rem",
    fontWeight: 400,
    color: "var(--label-color)",
    letterSpacing: "0.75px",
    textTransform: "capitalize",
  },

  info: {
    margin: "2.4rem 0",

    "& p": {
      lineHeight: 2,
      fontSize: "1.6rem",
      letterSpacing: "0.75px",
      color: "var(--text-color)",
    },
  },

  coin: {
    color: "var(--label-color)",
    fontWeight: "bold",
    fontSize: "2rem",
  },
  icon: {
    fontSize: "1.8rem",
    color: "var(--grey)",
    cursor: "pointer",
  },

  visiblePw: {
    color: "var(--primary-color)",
  },
  visibleConfirmPw: {
    color: "var(--primary-color)",
  },
  editBtn: {
    padding: "5px 10px",
  },
  textError: {
    marginTop: "4px",
    color: "var(--error-color)",
    fontSize: "1.2rem",
    textAlign: "left",
  },
}));

export default function ProfilePage() {
  useTitle("Profile");
  const dispatch = useDispatch();
  const classes = useStyle();
  const { user } = useSelector((state) => state.authReducer);
  const [data, setData] = useState({
    name: user.name,
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState(false);
  const [visiblePw, setVisiblePw] = useState(false);
  const [visibleConfirmPw, setVisibleConfirmPw] = useState(false);
  const [error, setError] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState("");
  let avtRes;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleUpdateAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) {
        dispatch(setMessage("No files were uploaded", "error"));
      }
      if (file.size / 1024 ** 2 > 2) {
        dispatch(setMessage("Size too large", "error"));
      }
      setAvatar(URL.createObjectURL(file));
      let formImage = new FormData();
      formImage.append("file", file);
      setImage(formImage);
    } catch (err) {
      throw err;
    }
  };

  const handleUpdateInfo = async () => {
    if (data.name === "") {
      return setError({
        ...error,
        name: "Enter your name",
        password: "",
        confirmPassword: "",
      });
    }
    try {
      
      if (image !== '') {
        avtRes = await userApi.updateAvatar(image);
      }
      const res = await userApi.updateProfile(
        data.name ? data.name : user.name,
        avatar ? avtRes.data.url : user.avatar
      );
      dispatch(setMessage(res.data.message, "success"));
      window.location.reload();
    } catch (err) {}
  };

  const handleUpdatePassword = async () => {
    if (data.password.length < 6 || data.confirmPassword.length < 6) {
      return setError({
        ...error,
        name: "",
        password: "Password must be at least 6 characters",
        confirmPassword: "Confirm password must be at least 6 characters",
      });
    }
    if (data.confirmPassword !== data.password) {
      return setError({
        ...error,
        name: "",
        password: "",
        confirmPassword: "Confirm password does not match",
      });
    }
    try {
      const res = await userApi.updatePassword(data.password);
      if (res) {
        dispatch(setMessage(res.data.message, "success"));
        setData({ ...data, password: "", confirmPassword: "" });
        window.location.reload();
      }
    } catch (err) {
      dispatch(setMessage(err.response.data.message, "error"));
    }
  };

  const handleUpdate = () => {
    if (data.name || avatar) {
      handleUpdateInfo();
    }
    if (data.password && data.confirmPassword) {
      handleUpdatePassword();
    }
  };

  return (
    <div className={`${classes.wrap} container flex-center`}>
      <div className={classes.root}>
        <div className="flex-center w-100 h-100">
          <div className={classes.avtWrap}>
            <img
              src={avatar ? avatar : user.avatar}
              alt=""
              className={`${classes.avt} w-100 h-100`}
            />
            {editMode && (
              <div className={`${classes.cameraIconWrap} flex-center`}>
                <CameraIcon className={classes.cameraIcon} />
                <input
                  type="file"
                  className={classes.fileInput}
                  onChange={handleUpdateAvatar}
                  accept="image/*"
                />
              </div>
            )}
          </div>
        </div>
        {!editMode ? (
          <div className="mt-10">
            <h2 className={classes.name}>{user.name}</h2>
            <h4 className={classes.role}>{user.roleType}</h4>
          </div>
        ) : (
          <div className="flex-col mt-10">
            <InputCustom
              label="Full name"
              autoComplete="off"
              size="small"
              error={error.name}
              defaultValue={user.name}
              placeholder="Enter your first and last name"
              inputProps={{
                name: "name",
              }}
              onChange={handleChange}
            />
            {error.name !== "" && (
              <p className={classes.textError}>{error.name}</p>
            )}
            <InputCustom
              label="Password"
              autoComplete="off"
              className="mt-10"
              size="small"
              placeholder="Enter password"
              error={error.password}
              inputProps={{
                name: "password",
                type: visiblePw ? "text" : "password",
              }}
              onChange={handleChange}
              endAdornment={
                visiblePw ? (
                  <VisibilityIcon
                    className={`${classes.icon} ${classes.visiblePw}`}
                    onClick={() => setVisiblePw(false)}
                  />
                ) : (
                  <VisibilityOffIcon
                    className={classes.icon}
                    onClick={() => setVisiblePw(true)}
                  />
                )
              }
            />
            {error.password !== "" && (
              <p className={classes.textError}>{error.password}</p>
            )}
            <InputCustom
              label="Confirm password"
              autoComplete="off"
              size="small"
              className="mt-10"
              placeholder="Enter the password"
              error={error.confirmPassword}
              inputProps={{
                name: "confirmPassword",
                type: visibleConfirmPw ? "text" : "password",
              }}
              onChange={handleChange}
              endAdornment={
                visibleConfirmPw ? (
                  <VisibilityIcon
                    className={`${classes.icon} ${classes.visibleConfirmPw}`}
                    onClick={() => setVisibleConfirmPw(false)}
                  />
                ) : (
                  <VisibilityOffIcon
                    className={classes.icon}
                    onClick={() => setVisibleConfirmPw(true)}
                  />
                )
              }
            />
            {error.confirmPassword !== "" && (
              <p className={classes.textError}>{error.confirmPassword}</p>
            )}
          </div>
        )}

        <div className={classes.info}>
          {!editMode && <p>{user.email}</p>}
          <p>Have joined in {formatDate(user.createdAt)}</p>
          <p>
          Current number of coins: <span className={classes.coin}>{user.coin}</span>
          </p>
        </div>

        {!editMode ? (
          <Button
            onClick={() => setEditMode(true)}
            className={`${classes.editBtn} _btn _btn-primary w-100`}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        ) : (
          <div className="d-flex w-100">
            <Button
              onClick={() => setEditMode(false)}
              className={`${classes.editBtn} _btn _btn-outlined-accent w-50 mr-2`}
            >
              Cancel
            </Button>
            <Button
              className={`${classes.editBtn} _btn _btn-primary w-50`}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
