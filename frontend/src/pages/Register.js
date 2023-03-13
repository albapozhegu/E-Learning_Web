import { ROUTES } from "../constants";
import useCloseNavigation from "../hooks/useCloseNavigation";
import useTitle from "../hooks/useTitle";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style/login-signup.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import LoopIcon from "@material-ui/icons/Loop";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import InputCustom from "../components/UI/InputCustom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { formStyle } from "../components/UI/style";
import { useDispatch } from "react-redux";
import userApi from "./../apis/userApi";
import { setMessage } from "./../redux/actions/messageAction";


const nameRegex = /^[^\d~`!@#$%^&*\(\)\\\|\.,\?\/\-\+\=\_]+$/gi;
const schema = yup.object().shape({
  email: yup.string().trim().required("Enter email").email("Invalid email"),
  name: yup
    .string()
    .trim()
    .required("Enter your first and last name")
    .matches(nameRegex, "Full name without numbers and special characters"),
  password: yup
    .string()
    .trim()
    .required("Enter password")
    .min(6, `Password must be at least 6 characters`),
  confirmPassword: yup
    .string()
    .trim()
    .required("Enter password confirmation")
    .min(6, `Confirm password at least 6 characters`)
    .oneOf([yup.ref("password")], "Enter confirmation password does not match"),
});

function RegisterPage() {
  useTitle("Register");
  useCloseNavigation();

  const classes = makeStyles(formStyle)();

  const [visiblePw, setVisiblePw] = useState(false);
  const [visibleConfirmPw, setVisibleConfirmPw] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const res = await userApi.register(user.name, user.email, user.password);
      if (res) {
        dispatch(setMessage(res.data.message, "success"));
        history.replace("/login");
      }
    } catch (error) {
      dispatch(setMessage(error.response.data.message, "error"));
      setLoading(false);
    }
  };

  return (
    <div className="pos-rel w-100vw h-100vh">
      <div className="transform-center">
        <form
          className={`${classes.root} flex-col`}
          onSubmit={handleSubmit(handleRegister)}
          autoComplete="off"
        >
          <div className="flex-col">
            <div className="t-center mt-5">
              <img
                className={classes.labelIcon}
                src="https://res.cloudinary.com/phongvn2611/image/upload/v1637079637/english/avatar/logo-tiny_seqkri.png"
                alt="logo"
              />
            </div>
            <h1 className={`${classes.title} t-center`}>Register</h1>
          </div>

          <div className="flex-col">
            <InputCustom
              label="Email"
              size="small"
              placeholder="Enter email"
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
          </div>

          <div className="flex-col">
            <InputCustom
              label="First name"
              size="small"
              placeholder="Enter your first and last name"
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
          </div>

          <div className="flex-col">
            <InputCustom
              label="Password"
              size="small"
              placeholder="Enter password"
              error={Boolean(errors.password)}
              inputProps={{
                name: "password",
                type: visiblePw ? "text" : "password",
                ...register("password"),
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
            {errors.password && (
              <p className="text-error">{errors.password?.message}</p>
            )}
          </div>

          <div className="flex-col">
            <InputCustom
              label="Confirm password"
              size="small"
              placeholder="Enter the password"
              error={Boolean(errors.confirmPassword)}
              inputProps={{
                name: "confirmPassword",
                type: visibleConfirmPw ? "text" : "password",
                ...register("confirmPassword"),
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
            {errors.confirmPassword && (
              <p className="text-error">{errors.confirmPassword?.message}</p>
            )}
          </div>

          <Button
            className="_btn _btn-primary"
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            endIcon={loading && <LoopIcon className="ani-spin" />}
          >
            Register
          </Button>

          <div className="or-option w-100 t-center">HOẶC</div>
        </form>

        <div className="has-account">
        Do you already have an account?&nbsp;
          <Link to={ROUTES.LOGIN} className="account-link">
          Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
