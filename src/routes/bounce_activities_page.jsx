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
      currentPageIndex: 1,
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
        rule.bounce_action.toLowerCase().includes(searchToken.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchToken.toLowerCase())
    );
  }

  paginate(activityLog) {
    const { currentPageIndex, rulesToShow } = this.state;
    const ruleStartIndex = (currentPageIndex - 1) * rulesToShow;
    const ruleEndIndex =
      (currentPageIndex - 1 * currentPageIndex + rulesToShow) *
      currentPageIndex;
    return activityLog.slice(ruleStartIndex, ruleEndIndex);
  }

  updatePageIndex(e) {
    const newIndex = parseInt(e.currentTarget.getAttribute("value"), 10);
    this.setState(prevState => {
      const isPageIndexUpdated = prevState.currentPageIndex !== newIndex;
      return {
        currentPageIndex: isPageIndexUpdated
          ? newIndex
          : prevState.currentPageIndex,
      };
    });
  }

  handlePrevClicked() {
    this.setState(prevState => ({
      currentPageIndex: prevState.currentPageIndex - 1,
    }));
  }

  handleNextClicked() {
    this.setState(prevState => ({
      currentPageIndex: prevState.currentPageIndex + 1,
    }));
  }

  isDuplicate(searchCategory, searchToken) {
    const { filterOptions } = this.state;
    const isDuplicate = filterOptions.some(
      filterOption =>
        filterOption.searchCategory === searchCategory &&
        filterOption.searchToken === searchToken
    );
    return isDuplicate;
  }

  addFilter() {
    const { searchCategory, searchToken } = this.state;
    if (!searchCategory || !searchToken) {
      this.setState({
        isValidFilter: false,
      });
      return;
    }
    if (this.isDuplicate(searchCategory, searchToken)) {
      this.setState({
        isValidFilter: false,
      });
    } else {
      this.setState(prevState => ({
        isValidFilter: true,
        filterOptions: [
          ...prevState.filterOptions,
          { searchCategory, searchToken },
        ],
        searchToken: "",
      }));
    }
  }

  removeFilter(e) {
    const token = e.currentTarget.getAttribute("token");
    const category = e.currentTarget.getAttribute("category");
    const { filterOptions } = this.state;
    const newFilterOptions = filterOptions.filter(
      filterOption =>
        (filterOption.searchCategory !== category &&
          filterOption.searchToken !== token) ||
        (filterOption.searchCategory === category &&
          filterOption.searchToken !== token)
    );
    this.setState({
      filterOptions: newFilterOptions,
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
      isActivityLogTab: true,
      isBounceRulesTab: false,
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
