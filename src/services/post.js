import api from "../configs/api";

export const getLatestPosts = () =>
  api.get("/post", { params: { limit: 4 } }).then((res) => res.data);

export const getPosts = (params) =>
  api.get("/post", { params }).then((res) => res.data);
