import axios from "axios";

export const listRules = async () => {
  const response = await axios.get(`${process.env.API_URL}/bounce_rules`, {});
  if (response.status === 200) {
    return response;
  }
  throw new Error("Error retrieving all rules");
};

export const postRule = async data => {
  const response = await axios.post(
    `${process.env.API_URL}/bounce_rules`,
    data
  );
  return response;
};

export const getRule = async ruleId => {
  const response = await axios.get(
    `${process.env.API_URL}/bounce_rules/${ruleId}`
  );
  if (response.status === 200) {
    return response;
  }
  throw new Error("Error retrieving rules");
};

export const deleteRule = async ruleId => {
  const response = await axios.delete(
    `${process.env.API_URL}/bounce_rules/${ruleId}`,
    {
      params: { id: ruleId },
      crossdomain: true,
    }
  );
  if (response.status === 200) {
    return response;
  }
  throw new Error("Error deleting bounce rule");
};

export const getChangelog = async ruleId => {
  const response = await axios.get(
    `${process.env.API_URL}/change_logs/${ruleId}`
  );
  if (response.status === 200) {
    return response;
  }
  throw new Error(`Error retrieving changelog ${ruleId}`);
};

export const getActivityLog = async () => {
  const response = await axios.get(`${process.env.API_URL}/change_logs/`);
  if (response.status === 200) {
    return response;
  }
  throw new Error("Error retrieving activity log");
};

export const putRule = async (ruleId, data) => {
  const response = await axios.put(
    `${process.env.API_URL}/bounce_rules/${ruleId}`,
    data
  );
  if (response.status === 200) {
    return response;
  }
  throw new Error("Error updating bounce rule");
};
