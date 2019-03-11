import axios from "axios";

export const listRules = async () =>
  axios.get(`${process.env.API_URL}/bounce_rules`).catch(err => err.response);

export const listFilteredRules = async ({ limit, offset, filterBy, option }) =>
  axios
    .get(
      `${
        process.env.API_URL
      }/bounce_rules/?limit=${limit}&offset=${offset}&filterby=${filterBy}&option=${option}`
    )
    .catch(err => err.response);

export const postRule = async data =>
  axios
    .post(`${process.env.API_URL}/bounce_rules`, data)
    .catch(err => err.response);

export const getRule = async ruleId =>
  axios
    .get(`${process.env.API_URL}/bounce_rules/${ruleId}`)
    .catch(err => err.response);

export const deleteRule = async ruleToDelete => {
  const { id } = ruleToDelete;
  return axios
    .delete(`${process.env.API_URL}/bounce_rules/${id}`, { data: ruleToDelete })
    .catch(err => err.response);
};

export const getChangelog = async ruleId =>
  axios
    .get(`${process.env.API_URL}/change_logs/${ruleId}`)
    .catch(err => err.response);

export const getActivityLog = async () =>
  axios.get(`${process.env.API_URL}/change_logs/`).catch(err => err.response);

export const getFilteredActivityLog = async ({
  limit,
  offset,
  filterBy,
  option,
}) =>
  axios
    .get(
      `${
        process.env.API_URL
      }/change_logs/?limit=${limit}&offset=${offset}&filterby=${filterBy}&option=${option}`
    )
    .catch(err => err.response);

export const putRule = async (ruleId, data) =>
  axios
    .put(`${process.env.API_URL}/bounce_rules/${ruleId}`, data)
    .catch(err => err.response);
