import axios from "axios";
import { baseUrl } from "../constant/baseUrl";
import { getCookie } from "../utils/cookies";

const getNewTokens = async () => {
  const refreshToken = getCookie("refreshToken");

  if (!refreshToken) return;

  try {
    const response = await axios.post(
      `${baseUrl}/auth/check-refresh-token`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return { response };
  } catch (error) {
    return { error };
  }
};

export { getNewTokens };
