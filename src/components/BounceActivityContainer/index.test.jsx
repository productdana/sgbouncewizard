import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import BounceActivityContainer from ".";
import { Selectors } from "./selectors";
import mockChangelog from "../../mocks/index";

const {
  csvButton,
  activityFilter,
  activityTable,
  emptyRulesWarning,
  pagination,
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
      activityLog: mockChangelog,
      filteredActivityLog: mockChangelog,
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

  it("should render a export to csv button", () => {
    expect(BounceActivityPage().find(csvButton)).toHaveLength(1);
  });

  it("should render a filter component", () => {
    expect(BounceActivityPage().find(activityFilter)).toHaveLength(1);
  });

  it("should render a activity table component", () => {
    expect(BounceActivityPage().find(activityTable)).toHaveLength(1);
  });

  it("should render paginiation", () => {
    expect(BounceActivityPage().find(pagination)).toHaveLength(1);
  });

  it("should render warning when no rules available", () => {
    BounceActivityPage().setProps({ activityLog: [] });
    expect(BounceActivityPage().find(emptyRulesWarning)).toHaveLength(1);
  });
});
