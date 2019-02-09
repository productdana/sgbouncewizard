import React from "react";
import { Redirect } from "react-router-dom";
import ActivityLogContainer from "../components/BounceRulesActivity";
import { getActivityLog } from "../utils/ruleCalls";

export default class BounceRuleActivityLogPage extends React.Component {
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
      invalidFilter: false,
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
    this.updateActivityLogIndex = this.updateActivityLogIndex.bind(this);
    this.handleActivityClicked = this.handleActivityClicked.bind(this);
    this.handleActivityLogPrevClicked = this.handleActivityLogPrevClicked.bind(
      this
    );
    this.handleActivityLogNextClicked = this.handleActivityLogNextClicked.bind(
      this
    );
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

  paginateActivityLog(activityLog) {
    const { currentActivityPageIndex, rulesToShow } = this.state;
    const ruleStartIndex = (currentActivityPageIndex - 1) * rulesToShow;
    const ruleEndIndex =
      (currentActivityPageIndex - 1 * currentActivityPageIndex + rulesToShow) *
      currentActivityPageIndex;
    return activityLog.slice(ruleStartIndex, ruleEndIndex);
  }

  updateActivityLogIndex(e) {
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

  handleActivityLogPrevClicked() {
    this.setState(prevState => ({
      currentActivityPageIndex: prevState.currentActivityPageIndex - 1,
    }));
  }

  handleActivityLogNextClicked() {
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
        invalidFilter: true,
      });
      return;
    }
    if (!this.isDuplicate(searchCategory, searchToken)) {
      this.setState(prevState => ({
        invalidFilter: false,
        filterOptions: [
          ...prevState.filterOptions,
          { searchCategory, searchToken },
        ],
        searchToken: "",
      }));
    } else {
      this.setState({
        invalidFilter: true,
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
    const filteredActivityLog = this.filterRules(
      this.paginateActivityLog(activityLog)
    );
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
          <ActivityLogContainer
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
            updateActivityLogIndex={this.updateActivityLogIndex}
            handleActivityLogPrevClicked={this.handleActivityLogPrevClicked}
            handleActivityLogNextClicked={this.handleActivityLogNextClicked}
            handleActivityClicked={this.handleActivityClicked}
            {...this.state}
          />
        )}
      </React.Fragment>
    );
  }
}
