import axios from "axios";

const UNAUTHORIZED = 401;
axios.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response;
    if (status === UNAUTHORIZED) {
      return error.response;
    }
    return Promise.reject(error);
  }
);

const authenticateUser = async credentials => {
  const response = await axios({
    method: "post",
    url: `${process.env.API_URL}/user`,
    data: credentials,
  });
  return response;
};

export default authenticateUser;
