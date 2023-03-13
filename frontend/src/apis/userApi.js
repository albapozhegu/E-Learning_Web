import axios from "axios";
const URL = `/api/user`;
const userApi = {
  login: (email, password) => {
    return axios.post(`${URL}/login`, { email, password });
  },
  register: (name, email, password) => {
    return axios.post(`${URL}/register`, { name, email, password });
  },
  activationEmail: (activation_token) => {
    return axios.post(`${URL}/activation`, { activation_token });
  },
  forgotPassword: (email) => {
    return axios.post(`${URL}/forgot-password`, { email });
  },
  resetPassword: (password, access_token) => {
    return axios.post(`${URL}/reset-password`, { password, access_token });
  },
  getToken: () => {
    return axios.get(`${URL}/refresh-token`);
  },
  getUserInfo: () => {
    return axios.get(`${URL}/get-user-info`);
  },
  updateAvatar: (avatar) => {
    return axios.post(`${URL}/update-avatar`, avatar, {
      header: { "content-type": "multipart/form-data" },
    });
  },
  updateProfile: (name, avatar) => {
    return axios.patch(`${URL}/update-profile`, { name, avatar });
  },
  updatePassword: (password) => {
    return axios.post(`${URL}/update-password`, { password });
  },
  logout: () => {
    return axios.post(`${URL}/logout`);
  },
  getAllUsers: () => {
    return axios.get(`${URL}/get-all-users`);
  },
  getUserDetails: (user_id) => {
    return axios.get(`${URL}/get-user-details/${user_id}`);
  },
  lockUser: (user_id) => {
    return axios.patch(`${URL}/lock-user/${user_id}`);
  },
  unlockUser: (user_id) => {
    return axios.patch(`${URL}/unlock-user/${user_id}`);
  },
  deleteUser: (user_id) => {
    return axios.patch(`${URL}/delete-user/${user_id}`);
  },
  addUser: (user) => {
    return axios.post(
      `${URL}/add-user`,
      { ...user },
      {
        header: { "content-type": "multipart/form-data" },
      }
    );
  },
  editUser: (user_id, user) => {
    return axios.post(
      `${URL}/edit-user/${user_id}`,
      { ...user },
      {
        params: { user_id },
        header: { "content-type": "multipart/form-data" },
      }
    );
  },
  putUpdateUserCoin: (newCoin) => {
    return axios.put(`${URL}/update-coin`, { newCoin });
  },

  getTopCoin: () => {
    return axios.get(`${URL}/get-top-coin`);
  },

};

export default userApi;
