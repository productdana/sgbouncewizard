import React from "react";
import { Redirect } from "react-router-dom";
import BounceActivityContainer from "../components/BounceActivityContainer";
import { getActivityLog, getFilteredActivityLog } from "../utils/ruleCalls";

export default class BounceActivityPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterQuery: { filterBy: "operation", option: "" },
      isBounceRulesTab: false,
      isActivityLogTab: true,
      isRedirectingToDetail: false,
      selectedActivity: {},
      activityLog: [],
      currentPageIndex: 1,
      rulesToShow: 10,
      pagesToDisplay: 5,
      filterOptions: [],
      isValidFilter: true,
      isFetching: true,
      isNetworkError: false,
    };
    this.logout = this.logout.bind(this);
    this.updateFilterBy = this.updateFilterBy.bind(this);
    this.updateFilterOption = this.updateFilterOption.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleActivityTabClicked = this.handleActivityTabClicked.bind(this);
    this.handleBounceTabClicked = this.handleBounceTabClicked.bind(this);
    this.updatePageIndex = this.updatePageIndex.bind(this);
    this.handleActivityClicked = this.handleActivityClicked.bind(this);
    this.handlePrevClicked = this.handlePrevClicked.bind(this);
    this.handleNextClicked = this.handleNextClicked.bind(this);
    this.handleOptionSelector = this.handleOptionSelector.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
  }

  async componentDidMount() {
    try {
      const { data: activities } = await getActivityLog();
      if (activities) {
        this.setState({
          isFetching: false,
          activityLog: activities.reverse(),
        });
      }
    } catch (err) {
      this.setState({ isNetworkError: true });
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

  updateFilterBy(e) {
    const { filterQuery } = this.state;
    const { value } = e;
    const newQuery = {
      ...filterQuery,
      filterBy: value.toLowerCase(),
      option: "",
    };
    this.setState({
      filterQuery: newQuery,
    });
  }

  async updateFilterOption(e) {
    const { filterQuery, currentPageIndex } = this.state;
    const { filterBy } = filterQuery;
    const { value } = e.target;
    const newQuery = { ...filterQuery, option: value.toLowerCase() };
    const filter = {
      limit: 10,
      offset: currentPageIndex - 1,
      filterBy,
      option: value,
    };
    try {
      const { data, status } = await getFilteredActivityLog(filter);
      if (status === 200) {
        this.setState({
          rules: data.reverse(),
          numRules: data.length,
          filterQuery: newQuery,
        });
      }
    } catch (err) {
      this.setState({
        isNetworkError: true,
      });
    }
  }

  async handleOptionSelector(e) {
    const { filterQuery, currentPageIndex } = this.state;
    const { filterBy } = filterQuery;
    const { value } = e;
    const newQuery = { ...filterQuery, option: value.toLowerCase() };

    const filter = {
      limit: 10,
      offset: currentPageIndex - 1,
      filterBy,
      option: value,
    };
    try {
      const { data, status } = await getFilteredActivityLog(filter);
      if (status === 200) {
        this.setState({
          activityLog: data.reverse(),
          filterQuery: newQuery,
          numRules: data.length,
        });
      }
    } catch (err) {
      this.setState({
        isNetworkError: true,
      });
    }
  }

  async handleClearSearch() {
    try {
      const { data, status } = await getActivityLog();
      if (status === 200) {
        this.setState({
          isFetching: false,
          activityLog: data.reverse(),
          numRules: data.length,
          filterQuery: { filterBy: "operation", option: "" },
        });
      }
    } catch (err) {
      this.setState({
        isNetworkError: true,
        isFetching: false,
      });
    }
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
    const filteredActivityLog = this.paginate(activityLog);
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
            updateFilterBy={this.updateFilterBy}
            updateFilterOption={this.updateFilterOption}
            filteredActivityLog={filteredActivityLog}
            handleModalClose={this.handleModalClose}
            handleTabClicked={this.handleTabClicked}
            handleActivityTabClicked={this.handleActivityTabClicked}
            handleBounceTabClicked={this.handleBounceTabClicked}
            updatePageIndex={this.updatePageIndex}
            handlePrevClicked={this.handlePrevClicked}
            handleNextClicked={this.handleNextClicked}
            handleActivityClicked={this.handleActivityClicked}
            handleOptionSelector={this.handleOptionSelector}
            handleClearSearch={this.handleClearSearch}
            {...this.state}
          />
        )}
      </React.Fragment>
    );
  }
}
