import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LoopIcon from "@material-ui/icons/Loop";
import ResetIcon from "@material-ui/icons/RotateLeft";
import SaveIcon from "@material-ui/icons/Save";
import InputCustom from "components/UI/InputCustom";
import SelectCustom from "components/UI/SelectCustom";
import { ROUTES, ROLE_TYPE } from "constants/index";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setMessage } from "redux/actions/messageAction";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import { convertImageToBase64 } from "helper/index";
import useTitle from "hooks/useTitle";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import userApi from 'apis/userApi';

const nameRegex = /^[^\d~`!@#$%^&*\(\)\\\|\.,\?\/\-\+\=\_]+$/gi;
const schema = yup.object().shape({
  email: yup.string().trim().required("Nhập email").email("Email không hợp lệ"),
  name: yup
    .string()
    .trim()
    .required("Enter your first and last name")
    .matches(nameRegex, "Full name without numbers and special characters"),
});

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

function AddUserPage() {
  useTitle("Add user");
  const classes = useStyle();
  const defaultImg =
    "https://res.cloudinary.com/phongvn2611/image/upload/v1634179173/english/avatar/avatar-default_tx5lsb.png";
  const [submitting, setSubmitting] = useState(false);
  const [avatar, setAvatar] = useState(defaultImg);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: ""
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleChangeAvatar = (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) {
        dispatch(setMessage("No files were uploaded", "errors"));
      }
      if (file.size / 1024 ** 2 > 2) {
        dispatch(setMessage("Size too large", "errors"));
      }
      convertImageToBase64(file).then((res) => {
        setAvatar(res);
      });
    } catch (err) {
      throw err;
    }
  };
  
  const handleAddUser = async () => {
    try {
      setSubmitting(true);
      const dataSend = {
        name: user.name,
        email: user.email,
        avatar,
        role: user.role
      }
      const res = await userApi.addUser(dataSend);
      if (res) {
        dispatch(setMessage(res.data.message, 'success'));
        setSubmitting(false);
        history.replace(ROUTES.USER_ADMIN);
      }
    }
    catch (error) {
      dispatch(setMessage(error.response.data.message, 'error'));
      setSubmitting(false);
    }
  }

  return (
    <div className={`${classes.wrap} container flex-center`}>
      <div className={classes.root}>
        <form autoComplete="off" onSubmit={handleSubmit(handleAddUser)}>
          <div className="flex-center w-100 h-100">
            <div className={classes.avtWrap}>
              <img
                src={avatar ? avatar : defaultImg}
                alt=""
                className={`${classes.avt} w-100 h-100`}
              />
              <div className={`${classes.cameraIconWrap} flex-center`}>
                <CameraIcon className={classes.cameraIcon} />
                <input
                  type="file"
                  className={classes.fileInput}
                  accept="image/*"
                  onChange={handleChangeAvatar}
                />
              </div>
            </div>
          </div>
          <div className="flex-col mt-10">
            <InputCustom
              label="Email"
              size="small"
              placeholder="Nhập email"
              error={Boolean(errors.email)}
              inputProps={{
                name: "email",
                autoFocus: true,
                ...register("email"),
              }}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-error">{errors.email?.message}</p>
            )}
            <InputCustom
              label="Full name"
              size="small"
              placeholder="Enter your first and last name"
              className="mt-10"
              error={Boolean(errors.name)}
              inputProps={{
                name: "name",
                ...register("name"),
              }}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-error">{errors.name?.message}</p>
            )}
            
            <SelectCustom
              className="mt-10"
              label="Quyền"
              options={ROLE_TYPE}
              index={0}
              inputProps={{
                name: "role",
              }}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex-center flex-center-col mt-10">
            <Button
              className={`${classes.editBtn} _btn _btn-outlined-accent mb-4 w-100`}
            >
              Quay lại
            </Button>
            <Button
              type="submit"
              className={`${classes.editBtn} _btn _btn-primary w-100`}
              disabled={submitting}
              endIcon={
                submitting ? <LoopIcon className="ani-spin" /> : <SaveIcon />
              }
              variant="contained"
            >
              Thêm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserPage;
