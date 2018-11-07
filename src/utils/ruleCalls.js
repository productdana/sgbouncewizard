import axios from "axios";

const listRules = async () => {
  const response = await axios.get(`${process.env.API_URL}/bounce_rules`);
  if (response.status === 200 && !response.data.error) {
    return response;
  }
  throw new Error("Error retrieving all rules");
};

export default listRules;
