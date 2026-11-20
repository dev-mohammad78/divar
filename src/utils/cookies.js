const setCookie = (tokens) => {
  document.cookie = `accessToken=${tokens.accessToken}; max-age=86400; path=/; SameSite=Lax`;
  document.cookie = `refreshToken=${tokens.refreshToken}; max-age=2592000; path=/; SameSite=Lax`;
};

const getCookie = (name) => {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? cookie.substring(name.length + 1) : undefined;
};

const removeCookie = () => {
  document.cookie = "accessToken=; max-age=0; path=/";
  document.cookie = "refreshToken=; max-age=0; path=/";
};

export { setCookie, getCookie, removeCookie };
