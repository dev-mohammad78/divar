import api from "../configs/api";

const getProfile = () => api.get("/user/whoami").then((res) => res || false);

const getPosts = (params) =>
  api.get("/post/my", { params }).then((res) => res.data);

export { getProfile, getPosts };
