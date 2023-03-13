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


const schema = yup.object().shape({
  email: yup.string().required("Email is empty").email("Invalid email"),
});

function ForgotPasswordPage() {
  useTitle("Forgot password");
  useCloseNavigation();
  
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = makeStyles(formStyle)();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [user, setUser] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleForgotPassword = async (e) => {
    try {
      setLoading(true);
      const res = await userApi.forgotPassword(user.email);
      dispatch(setMessage(res.data.message, "success"));
      setLoading(false);
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
          onSubmit={handleSubmit(handleForgotPassword)}
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
            <h1 className={`${classes.title} t-center`}>Forgot password</h1>
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

          <Button
            className="_btn _btn-primary"
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            endIcon={loading && <LoopIcon className="ani-spin" />}
            size="large"
          >
            Send email
          </Button>
        </form>

        <div className="has-account">
          Quay lại trang&nbsp;
          <Link to={ROUTES.LOGIN} className="account-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
