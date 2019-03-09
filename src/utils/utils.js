import moment from "moment";

export const shouldDisplay = info => info || "N/A";

export const displayUnixAsTime = unixTime =>
  moment.unix(unixTime).format("MM/DD/YYYY LTS");

export const validateCommit = commit => commit.length !== 0;
