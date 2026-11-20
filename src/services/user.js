import api from "../configs/api";

const getProfile = () => api.get("/user/whoami");

const getPosts = (params) =>
  api.get("/post/my", { params }).then((res) => res.data);

const deletePost = (id) =>
  api.delete(`/post/delete/${id}`).then((res) => res.data);

export { getProfile, getPosts, deletePost };
