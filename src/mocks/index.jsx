const mockChangelog = [
  {
    id: 173,
    response_code: 421,
    enhanced_code: "",
    regex: "",
    priority: 0,
    description: "RFC5321Servicenotavailable",
    bounce_action: "retry",
    user_id: 1,
    created_at: 1,
    comment: "Inital Setup",
    operation: "Create",
  },
  {
    id: 174,
    response_code: 450,
    enhanced_code: "",
    regex: "",
    priority: 0,
    description: "RFC5321Mailboxunavailable",
    bounce_action: "retry",
    user_id: 1,
    created_at: 2,
    comment: "Inital Setup",
    operation: "Create",
  },
  {
    id: 175,
    response_code: 451,
    enhanced_code: "",
    regex: "",
    priority: 0,
    description: "RFC5321Localerrorinprocessing",
    bounce_action: "retry",
    user_id: 1,
    created_at: 3,
    comment: "Inital Setup",
    operation: "Create",
  },
  {
    id: 176,
    response_code: 452,
    enhanced_code: "",
    regex: "",
    priority: 0,
    description: "RFC5321Insufficientsystemstorage",
    bounce_action: "retry",
    user_id: 1,
    created_at: 4,
    comment: "Inital Setup",
    operation: "Create",
  },
  {
    id: 177,
    response_code: 454,
    enhanced_code: "",
    regex: "",
    priority: 0,
    description: "RFC3207TLSnotavailable",
    bounce_action: "retry",
    user_id: 1,
    created_at: 5,
    comment: "Inital Setup",
    operation: "Create",
  },
  {
    id: 178,
    response_code: 455,
    enhanced_code: "",
    regex: "",
    priority: 0,
    description: "RFC5321Serverunabletoaccomodateparameters",
    bounce_action: "retry",
    user_id: 1,
    created_at: 6,
    comment: "Inital Setup",
    operation: "Create",
  },
  {
    id: 179,
    response_code: 500,
    enhanced_code: "",
    regex: "",
    priority: 0,
    description: "RFC5321Syntaxerrorcommandunrecognized",
    bounce_action: "no_action",
    user_id: 1,
    created_at: 7,
    comment: "Inital Setup",
    operation: "Create",
  },
  {
    id: 180,
    response_code: 501,
    enhanced_code: "",
    regex: "",
    priority: 0,
    description: "RFC5321Syntaxerrorinparametersorarguments",
    bounce_action: "no_action",
    user_id: 1,
    created_at: 8,
    comment: "Inital Setup",
    operation: "Create",
  },
  {
    id: 181,
    response_code: 502,
    enhanced_code: "",
    regex: "",
    priority: 0,
    description: "RFC5321Commandnotimplemented",
    bounce_action: "no_action",
    user_id: 1,
    created_at: 9,
    comment: "Inital Setup",
    operation: "Create",
  },
];

export const mockBounceRules = [
  {
    id: 504,
    response_code: 551,
    enhanced_code: "",
    regex: "no MX record for domain",
    priority: 0,
    description: "new rule",
    bounce_action: "no_action",
  },
  {
    id: 173,
    response_code: 421,
    enhanced_code: "",
    regex: "",
    priority: 0,
    description: "RFC5321Servicenotavailable",
    bounce_action: "retry",
    user_id: 1,
    created_at: 1,
    comment: "Inital Setup",
    operation: "New",
  },
  {
    id: 505,
    response_code: 550,
    enhanced_code: "",
    regex: "no MX record for domain",
    priority: 0,
    description:
      "bWFpbmx5IGxpYmVydHkgZG9tYWluIGJsb2NrIHNlZWluZyB+NTAlIG9mIGFkZHJlc3NlcyBlbmdhZ2luZyBTRyB3aWRl",
    bounce_action: "no_action",
  },
];

export default mockChangelog;
