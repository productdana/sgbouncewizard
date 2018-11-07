import axios from "axios";

const authenticateUser = async credentials => {
  const response = await axios({
    method: "post",
    url: `${process.env.API_URL}/user`,
    data: credentials,
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
  }).catch(() => {
    throw new Error("Network Error");
  });

  if (response.status === 200) {
    if (response.data && response.data.error) {
      throw new Error("User authenication failed");
    }
    return response;
  }
  throw new Error("User authenication failed");
};

export default authenticateUser;
