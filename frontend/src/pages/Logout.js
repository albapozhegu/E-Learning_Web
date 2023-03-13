import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GlobalLoading from '../components/UI/GlobalLoading';
import { setMessage } from './../redux/actions/messageAction';
import userApi from './../apis/userApi';
import { logout } from './../redux/actions/authAction';
import { UX } from "../constants";

function LogoutPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.authReducer);

  useEffect(() => {

    (async function () {
      try {
        // const apiRes = await userApi.logout();
        // if (apiRes.status === 200) {
          dispatch(logout());
          dispatch(setMessage('Logout successfully.', 'success'))
          window.location.replace('/home');
          // setTimeout(() => {
          
          // }, UX.DELAY_TIME);
      //  }
      } catch (error) {
        dispatch(setMessage(error.response.data.message, 'error'));
      }
    })();

    return () => {};
  }, []);

  return <>{isAuth && <GlobalLoading title="Logging out ..." />}</>;
}

export default LogoutPage;
