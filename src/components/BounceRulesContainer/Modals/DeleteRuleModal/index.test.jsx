import React from "react";
import { mount } from "enzyme";
import DeleteConfirmationModal from ".";
import { Selectors } from "../../selectors";

describe("Delete Rule Confirmation", () => {
  let props;
  let mountedDeleteRuleModal;
  const { deleteConfirmationConfirm, commitMessage } = Selectors;
  const DeleteRuleModalComponent = () => {
    if (!mountedDeleteRuleModal) {
      mountedDeleteRuleModal = mount(<DeleteConfirmationModal {...props} />);
    }
    return mountedDeleteRuleModal;
  };

  beforeEach(() => {
    props = {
      selectedRule: {},
      handleModalClose: () => {},
      handleDeleteConfirm: () => {},
      idToDelete: 1,
      handleDeleteCommit: () => {},
      isCommitValid: true,
    };
    mountedDeleteRuleModal = undefined;
  });

  describe("When a user is presented with a confirmation modal", () => {
    it("should render a commit field", () => {
      expect(
        DeleteRuleModalComponent()
          .find(commitMessage)
          .exists()
      ).toBeTruthy();
    });

    it("should render a disabled confirm button if commit is empty", () => {
      expect(
        DeleteRuleModalComponent()
          .find(deleteConfirmationConfirm)
          .first()
          .prop("disabled")
      ).toBeTruthy();
    });

    it("should render an enabled confirm button if commit is not empty", () => {
      DeleteRuleModalComponent().setProps({
        selectedRule: { comment: "a commit message" },
        isCommitValid: true,
      });
      expect(
        DeleteRuleModalComponent()
          .find(deleteConfirmationConfirm)
          .first()
          .prop("disabled")
      ).toBeFalsy();
    });
  });
});
