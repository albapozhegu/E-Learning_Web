import axios from "axios";
const URL = `/api/blog`;

const blogApi = {
  getBlog: (id) => {
    return axios.get(`${URL}/get-blog/${id}`)
  },

  getBlogById: (id) => {
    return axios.get(`${URL}/get-blog-by-id/${id}`)
  },

  getBlogByLevel: (level, token) => {
    return axios.get(`${URL}/get-blog-by-level/${level}`, {
      headers: {Authorization: token}
    })
  },

  getBlogLevels: (token) => {
    return axios.get(`${URL}/get-blog-levels`, {
      headers: {Authorization: token}
    })
  },

  getAllBlog: (token) => {
    return axios.get(`${URL}/get-all-blog`, {
      headers: {Authorization: token}
    })
  },

  postBlog: (formData) => {
    return axios.post(`${URL}/post-blog`, {...formData},
    {
      header: { "content-type": "multipart/form-data" },
    })
  },

  putBlog: (id, formData) => {
    return axios.put(`${URL}/put-blog/${id}`, { ...formData},
    {
      params: { id },
      header: { "content-type": "multipart/form-data" },
    });
  },

  deleteBlog: (id) => {
    return axios.patch(`${URL}/delete-blog/${id}`)
  },

  searchBlog: (title) => {
    return axios.get(`${URL}/search-blog`, {params: {title}})
  },
}

export default blogApi;
