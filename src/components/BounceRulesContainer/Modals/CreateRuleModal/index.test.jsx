import React from "react";
import { shallow } from "enzyme";
import CreateRuleModal from ".";
import { Selectors } from "../../selectors";

describe("Create Rule Modal", () => {
  let props;
  let mountedCreateRuleModal;
  const {
    invalidInput,
    priority,
    bounceAction,
    responseCode,
    description,
    enhancedCode,
    regex,
    cancelCreateRuleButton,
    submitButton,
  } = Selectors;
  const CreateRuleModalComponent = () => {
    if (!mountedCreateRuleModal) {
      mountedCreateRuleModal = shallow(<CreateRuleModal {...props} />);
    }
    return mountedCreateRuleModal;
  };

  beforeEach(() => {
    props = {
      handleRuleUpdate: () => {},
      handleCreateSubmit: () => {},
      handleDropdownSelect: () => {},
      newRule: {},
      isInvalidInput: false,
      handleModalClose: () => {},
      handleRuleUpdateInt: () => {},
    };
    mountedCreateRuleModal = undefined;
  });

  describe("When the user opens the Create Rule Modal", () => {
    it("should render a priority field", () => {
      expect(CreateRuleModalComponent().find(priority)).toHaveLength(1);
    });
    it("should render a bounce action field", () => {
      expect(CreateRuleModalComponent().find(bounceAction)).toHaveLength(1);
    });
    it("should render a response code field", () => {
      expect(CreateRuleModalComponent().find(responseCode)).toHaveLength(1);
    });
    it("should render a description field", () => {
      expect(CreateRuleModalComponent().find(description)).toHaveLength(1);
    });
    it("should render a enhance code field", () => {
      expect(CreateRuleModalComponent().find(enhancedCode)).toHaveLength(1);
    });
    it("should render a regex field", () => {
      expect(CreateRuleModalComponent().find(regex)).toHaveLength(1);
    });
    it("should render a cancel button", () => {
      expect(
        CreateRuleModalComponent().find(cancelCreateRuleButton)
      ).toHaveLength(1);
    });
    it("should render a  button", () => {
      expect(CreateRuleModalComponent().find(submitButton)).toHaveLength(1);
    });
  });

  describe("When the user attempts to create a rule", () => {
    it("should alert if field is left empty", () => {
      CreateRuleModalComponent().setProps({ isInvalidInput: true });
      expect(CreateRuleModalComponent().find(invalidInput)).toHaveLength(1);
    });
  });
});
