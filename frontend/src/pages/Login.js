import "./style/login-signup.scss";
import { ROUTES } from "../constants";
import useTitle from "./../hooks/useTitle";
import useCloseNavigation from "./../hooks/useCloseNavigation";
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputCustom from "../components/UI/InputCustom";
import { formStyle } from "../components/UI/style";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import userApi from "../apis/userApi";
import { UX } from "../constants";
import LoopIcon from "@material-ui/icons/Loop";
import { setMessage } from "./../redux/actions/messageAction";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
  email: yup.string().required("Email is empty").email("Invalid email"),
  password: yup
    .string()
    .required("Password is blank")
    .min(6, `Password minimum 6 characters`),
});

function LoginPage() {
  useTitle("Login");
  useCloseNavigation();

  const { isAuth, role } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = makeStyles(formStyle)();
  const [visiblePw, setVisiblePw] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async (e) => {
    try {
      setLoading(true);
      const res = await userApi.login(user.email, user.password);
      dispatch(setMessage(res.data.message, "success"));
      setTimeout(() => {
        window.location.replace("/home");
      }, UX.DELAY_TIME);
    } catch (error) {
      dispatch(setMessage(error.response?.data?.message, "error"));
      setLoading(false);
    }
  };

  return (
    <div className="pos-rel w-100vw h-100vh">
      <div className="transform-center">
        <form
          className={`${classes.root} flex-col`}
          onSubmit={handleSubmit(handleLogin)}
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
            <h1 className={`${classes.title} t-center`}>Log in</h1>
          </div>

          <div className="flex-col">
            <InputCustom
              label="Email"
              size="small"
              placeholder="Enter email"
              onChange={handleChange}
              error={Boolean(errors.email)}
              inputProps={{
                name: "email",
                autoFocus: true,
                ...register("email"),
              }}
            />
            {errors.email && (
              <p className="text-error">{errors.email?.message}</p>
            )}
          </div>

          <div className="flex-col">
            <InputCustom
              label="Password"
              size="small"
              placeholder="Enter password"
              onChange={handleChange}
              error={Boolean(errors.password)}
              inputProps={{
                name: "password",
                type: visiblePw ? "text" : "password",
                ...register("password"),
              }}
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

          <Link className={classes.forgotPw} to={ROUTES.FORGOT_PASSWORD}>
            Quên mật khẩu ?
          </Link>

          <Button
            className="_btn _btn-primary"
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            endIcon={loading && <LoopIcon className="ani-spin" />}
            size="large"
          >
            Log in
          </Button>

          <div className="or-option w-100 t-center">HOẶC</div>
        </form>

        <div className="has-account">
        Do not have an account?&nbsp;
          <Link to={ROUTES.REGISTER} className="account-link">
          Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
