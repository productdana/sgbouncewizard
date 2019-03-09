import React from "react";
import { mount } from "enzyme";
import { ConfirmationModal } from ".";
import { mockBounceRules } from "../../../../mocks/index";
import { Selectors } from "../../selectors";

const [mockRule] = mockBounceRules;
describe("Details Confirmation Modal", () => {
  let props;
  let mountedConfirmationModal;
  const { confirmSubmit, commitInput } = Selectors;

  const ConfirmationModalComponent = () => {
    if (!mountedConfirmationModal) {
      mountedConfirmationModal = mount(<ConfirmationModal {...props} />);
    }
    return mountedConfirmationModal;
  };

  beforeEach(() => {
    props = {
      updatedRule: { ...mockRule, comment: "" },
      handleModalClose: () => {},
      handleSaveConfirmation: () => {},
      isUpdateError: false,
      isCommitValid: true,
      onEditRuleCommit: () => {},
    };
    mountedConfirmationModal = undefined;
  });

  describe("When a user is presented with a confirmation modal", () => {
    it("should render a commit field", () => {
      expect(
        ConfirmationModalComponent()
          .find(commitInput)
          .exists()
      ).toBeTruthy();
    });

    it("should render a disabled confirm button if commit is empty", () => {
      expect(
        ConfirmationModalComponent()
          .find(confirmSubmit)
          .first()
          .prop("disabled")
      ).toBeTruthy();
    });

    it("should render an enabled confirm button if commit is not empty", () => {
      expect(
        ConfirmationModalComponent()
          .setProps({
            updatedRule: mockRule,
            isCommitValid: true,
          })
          .find(confirmSubmit)
          .first()
          .prop("disabled")
      ).toBeFalsy();
    });
  });
});
