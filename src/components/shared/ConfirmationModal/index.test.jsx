import React from "react";
import { mount } from "enzyme";
import ConfirmationModal from ".";
import { mockBounceRules } from "../../../mocks";
import {
  Selectors as BounceDetailSelectors,
  WriteSelectors,
} from "../../BounceDetailsContainer/selectors";

const [mockRule] = mockBounceRules;

describe("Confirmation Modal", () => {
  let props;
  let mountedConfirmationModal;
  const { commitInput, confirmSubmit } = BounceDetailSelectors;
  const ConfirmationModalComponent = () => {
    if (!mountedConfirmationModal) {
      mountedConfirmationModal = mount(
        <ConfirmationModal {...props} selectors={WriteSelectors} />
      );
    }
    return mountedConfirmationModal;
  };

  beforeEach(() => {
    props = {
      toggleId: 0,
      handleOnChange: () => {},
      isCommitValid: () => {},
      selectedRule: {},
      handleModalClose: () => {},
      handleConfirm: () => {},
      isUpdateError: false,
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
            selectedRule: mockRule,
            isCommitValid: true,
          })
          .find(confirmSubmit)
          .first()
          .prop("disabled")
      ).toBeFalsy();
    });
  });
});
