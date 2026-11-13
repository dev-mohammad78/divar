import api from "../configs/api";

export const getLatestPosts = () => api.get("/post").then((res) => res.data);
