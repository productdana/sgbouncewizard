import axios from "axios";

export const listRules = async () => {
  const response = await axios.get(process.env.API_URL);
  if (response.status === 200) {
    return await response;
  } else {
    throw new Error("Error retrieving all rules");
  }
};
