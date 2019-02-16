import React from "react";
import { Redirect } from "react-router-dom";
import BounceActivityContainer from "../components/BounceActivityContainer";
import { getActivityLog } from "../utils/ruleCalls";

export default class BounceActivityPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchCategory: "Bounce Action",
      isBounceRulesTab: false,
      isActivityLogTab: true,
      searchToken: "",
      isRedirectingToDetail: false,
      selectedActivity: {},
      activityLog: [],
      currentActivityPageIndex: 1,
      rulesToShow: 10,
      pagesToDisplay: 5,
      filterOptions: [],
      isValidFilter: true,
      isFetching: true,
    };
    this.logout = this.logout.bind(this);
    this.updateSearchToken = this.updateSearchToken.bind(this);
    this.updateSearchCategory = this.updateSearchCategory.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleActivityTabClicked = this.handleActivityTabClicked.bind(this);
    this.handleBounceTabClicked = this.handleBounceTabClicked.bind(this);
    this.updatePageIndex = this.updatePageIndex.bind(this);
    this.handleActivityClicked = this.handleActivityClicked.bind(this);
    this.handlePrevClicked = this.handlePrevClicked.bind(this);
    this.handleNextClicked = this.handleNextClicked.bind(this);
  }

  async componentDidMount() {
    const { data: activities } = await getActivityLog();
    if (activities) {
      this.setState({
        isFetching: false,
        activityLog: activities.reverse(),
      });
    }
  }

  logout() {
    const { history } = this.props;
    localStorage.clear();
    history.push("/");
  }

  handleModalClose(e) {
    const { id } = e.currentTarget;
    this.setState({
      [id]: false,
      isInvalidInput: false,
      selectedRule: {},
    });
  }

  updateSearchToken(e) {
    this.setState({
      searchToken: e.target.value.toLowerCase(),
    });
  }

  updateSearchCategory(e) {
    this.setState({
      searchCategory: e.value.toLowerCase(),
    });
  }

  filterRules(rules) {
    const { searchToken } = this.state;
    return rules.filter(
      rule =>
        rule.bounce_action.toLowerCase().includes(searchToken) ||
        rule.description.toLowerCase().includes(searchToken)
    );
  }

  paginate(activityLog) {
    const { currentActivityPageIndex, rulesToShow } = this.state;
    const ruleStartIndex = (currentActivityPageIndex - 1) * rulesToShow;
    const ruleEndIndex =
      (currentActivityPageIndex - 1 * currentActivityPageIndex + rulesToShow) *
      currentActivityPageIndex;
    return activityLog.slice(ruleStartIndex, ruleEndIndex);
  }

  updatePageIndex(e) {
    const newIndex = parseInt(e.currentTarget.getAttribute("value"), 10);
    this.setState(prevState => {
      const isPageIndexUpdated =
        prevState.currentActivityPageIndex !== newIndex;
      return {
        currentActivityPageIndex: isPageIndexUpdated
          ? newIndex
          : prevState.currentActivityPageIndex,
      };
    });
  }

  handlePrevClicked() {
    this.setState(prevState => ({
      currentActivityPageIndex: prevState.currentActivityPageIndex - 1,
    }));
  }

  handleNextClicked() {
    this.setState(prevState => ({
      currentActivityPageIndex: prevState.currentActivityPageIndex + 1,
    }));
  }

  isDuplicate(searchCategory, searchToken) {
    let found = false;
    const { filterOptions } = this.state;
    filterOptions.filter(filter => {
      if (
        filter.searchCategory === searchCategory &&
        filter.searchToken === searchToken
      ) {
        found = true;
      }
      return false;
    });
    return found;
  }

  addFilter() {
    const { searchCategory, searchToken } = this.state;
    if (!searchCategory || !searchToken) {
      this.setState({
        isValidFilter: false,
      });
      return;
    }
    if (!this.isDuplicate(searchCategory, searchToken)) {
      this.setState(prevState => ({
        isValidFilter: true,
        filterOptions: [
          ...prevState.filterOptions,
          { searchCategory, searchToken },
        ],
        searchToken: "",
      }));
    } else {
      this.setState({
        isValidFilter: false,
      });
    }
  }

  removeFilter(filter) {
    const { filterOptions } = this.state;
    const newFilter = [...filterOptions];
    const index = newFilter.indexOf(filter);
    newFilter.splice(index, 1);
    this.setState({
      filterOptions: [...newFilter],
    });
  }

  handleBounceTabClicked() {
    this.setState({
      isActivityLogTab: false,
      isBounceRulesTab: true,
    });
  }

  handleActivityTabClicked() {
    this.setState({
      isActivityLogTab: false,
      isBounceRulesTab: true,
    });
  }

  handleActivityClicked(e) {
    const { activityLog } = this.state;
    const { id } = e.currentTarget;
    const ruleId = parseInt(e.currentTarget.getAttribute("rule-id"), 10);
    this.setState({
      [id]: true,
      selectedActivity: activityLog.find(activity => activity.id === ruleId),
    });
  }

  render() {
    const { activityLog } = this.state;
    const filteredActivityLog = this.filterRules(this.paginate(activityLog));
    const isAuthenticated = localStorage.getItem("isAuth");
    return (
      <React.Fragment>
        {!isAuthenticated && (
          <Redirect
            push
            to={{
              pathname: `/`,
            }}
          />
        )}
        {isAuthenticated && (
          <BounceActivityContainer
            logout={this.logout}
            updateSearchToken={this.updateSearchToken}
            updateSearchCategory={this.updateSearchCategory}
            addFilter={this.addFilter}
            removeFilter={this.removeFilter}
            filteredActivityLog={filteredActivityLog}
            handleModalClose={this.handleModalClose}
            handleTabClicked={this.handleTabClicked}
            handleActivityTabClicked={this.handleActivityTabClicked}
            handleBounceTabClicked={this.handleBounceTabClicked}
            updatePageIndex={this.updatePageIndex}
            handlePrevClicked={this.handlePrevClicked}
            handleNextClicked={this.handleNextClicked}
            handleActivityClicked={this.handleActivityClicked}
            {...this.state}
          />
        )}
      </React.Fragment>
    );
  }
}
