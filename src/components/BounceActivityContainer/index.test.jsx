import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import BounceActivityContainer from ".";
import { Selectors } from "./selectors";
import { mockActivityLog } from "../../mocks/index";

const {
  csvButton,
  activityFilter,
  activityTable,
  emptyRulesWarning,
  pagination,
  detailsModal,
} = Selectors;

describe("Bounce Activity Page", () => {
  let props;
  let mountedBounceActivityPage;
  const BounceActivityPage = () => {
    if (!mountedBounceActivityPage) {
      mountedBounceActivityPage = shallow(
        <BounceActivityContainer {...props} />
      );
    }
    return mountedBounceActivityPage;
  };

  beforeEach(() => {
    props = {
      activityLog: mockActivityLog,
      filteredActivityLog: mockActivityLog,
      filterOptions: [],
      isFetching: false,
    };
    mountedBounceActivityPage = undefined;
  });

  it("should render correctly", () => {
    const tree = renderer
      .create(
        <Router>
          <BounceActivityContainer {...props} />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("When a user visits the activity log page", () => {
    it("should render default state", () => {
      expect(BounceActivityPage().find(".page-tab")).toHaveLength(1);
      expect(BounceActivityPage().find(csvButton)).toHaveLength(1);
      expect(BounceActivityPage().find(activityFilter)).toHaveLength(1);
      expect(BounceActivityPage().find(activityTable)).toHaveLength(1);
      expect(BounceActivityPage().find(pagination)).toHaveLength(1);
    });
  });

  describe("When there are no rules", () => {
    beforeEach(() => {
      BounceActivityPage().setProps({ activityLog: [] });
    });

    it("should not render pagination", () => {
      expect(BounceActivityPage().find(pagination)).toHaveLength(0);
    });

    it("should render warning", () => {
      expect(BounceActivityPage().find(emptyRulesWarning)).toHaveLength(1);
    });
  });

  describe("When a user clicks the 'view' action", () => {
    it("should render a details modal", () => {
      BounceActivityPage().setProps({ isActivityModalOpen: true });
      expect(BounceActivityPage().find(detailsModal)).toHaveLength(1);
    });
  });
});
