import axios from "axios";

export const listRules = async () => {
  const response = await axios.get(`${process.env.API_URL}/bounce_rules`);
  if (response.status === 200) {
    return response;
  }
  throw new Error("Error retrieving all rules");
};

export const getRule = async ruleId => {
  const response = await axios.get(
    `${process.env.API_URL}/bounce_rules/${ruleId}`,
    {
      headers: { contentType: "application/json; charset=UTF-8" },
    }
  );
  if (response.status === 200) {
    return response;
  }
  throw new Error("Error retrieving all rules");
};

export const deleteRule = async ruleId => {
  const response = await axios.delete(
    `${process.env.API_URL}/bounce_rules/${ruleId}`,
    {
      headers: { contentType: "application/json; charset=UTF-8" },
      params: { id: ruleId },
    }
  );
  if (response.status === 200) {
    return response;
  }
  throw new Error("Error retrieving all rules");
};
