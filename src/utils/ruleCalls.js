import axios from "axios";

export const listRules = async () => {
  const response = await axios.get(process.env.API_URL);
  if (response.status === 200) {
    return response;
  }
  throw new Error("Error retrieving all rules");
};

export const getRule = async ruleId => {
  const response = axios.get(`${process.env.API_URL}/${ruleId}`).catch(err => {
    throw new Error(err);
  });
  if (response.status === 200) {
    return response;
  }
  throw new Error("Error retrieving all rules");
};
