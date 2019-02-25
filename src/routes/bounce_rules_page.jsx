import React from "react";
import { Redirect } from "react-router-dom";
import BounceRulesContainer from "../components/BounceRulesContainer";
import {
  listRules,
  deleteRule,
  postRule,
  getActivityLog,
} from "../utils/ruleCalls";

export default class BounceRulesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchCategory: "Bounce Action",
      isBounceRulesTab: true,
      isActivityLogTab: false,
      searchToken: "",
      isRedirectingToDetail: false,
      selectedRule: {},
      selectedActivity: {},
      rules: [],
      activityLog: [],
      currentPageIndex: 1,
      currentActivityPageIndex: 1,
      rulesToShow: 10,
      pagesToDisplay: 5,
      filterOptions: [],
      invalidFilter: false,
      isFetching: true,
      isDeleteConfirmationOpen: false,
      isDeleteAlertOpen: false,
      isCreateRuleOpen: false,
      isCreateRuleConfirmationOpen: false,
      isActivityModalOpen: false,
      newRule: {},
      isInvalidInput: false,
    };
    this.logout = this.logout.bind(this);
    this.updateSearchToken = this.updateSearchToken.bind(this);
    this.updateSearchCategory = this.updateSearchCategory.bind(this);
    this.updatePageIndex = this.updatePageIndex.bind(this);
    this.handlePrevClicked = this.handlePrevClicked.bind(this);
    this.handleNextClicked = this.handleNextClicked.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.handleActionOpen = this.handleActionOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleCreateOpen = this.handleCreateOpen.bind(this);
    this.handleRuleUpdate = this.handleRuleUpdate.bind(this);
    this.handleRuleUpdateInt = this.handleRuleUpdateInt.bind(this);
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    this.handleCreateConfirm = this.handleCreateConfirm.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
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
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
  }

  async componentDidMount() {
    const { data, status } = await listRules();
    if (status === 200) {
      this.setState({
        isFetching: false,
        rules: data.reverse(),
        numRules: data.length,
      });
    }
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

  paginate(rules) {
    const { currentPageIndex, rulesToShow } = this.state;
    const ruleStartIndex = (currentPageIndex - 1) * rulesToShow;
    const ruleEndIndex =
      (currentPageIndex - 1 * currentPageIndex + rulesToShow) *
      currentPageIndex;
    return rules.slice(ruleStartIndex, ruleEndIndex);
  }

  updatePageIndex(e) {
    const value = parseInt(e.currentTarget.getAttribute("value"), 10);
    this.setState(prevState => {
      const isPageIndexUpdated = prevState.currentPageIndex !== value;
      return {
        currentPageIndex: isPageIndexUpdated
          ? value
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

  handleCreateOpen(e) {
    const { newRule } = this.state;
    const { id } = e.currentTarget;
    this.setState({
      [id]: true,
      newRule: {
        ...newRule,
        user_id: parseInt(localStorage.getItem("user_id"), 10),
      },
    });
  }

  handleActionOpen(e) {
    const { rules } = this.state;
    const { id } = e.currentTarget;
    const ruleId = parseInt(e.currentTarget.getAttribute("rule"), 10);
    this.setState({
      [id]: true,
      selectedRule: rules.find(rule => rule.id === ruleId),
    });
  }

  handleModalClose(e) {
    const { id } = e.currentTarget;
    this.setState({
      [id]: false,
      isInvalidInput: false,
      selectedActivity: {},
      selectedRule: {},
    });
  }

  async handleDeleteConfirm() {
    const { rules, selectedRule } = this.state;
    const { status } = await deleteRule(selectedRule);
    if (status === 200) {
      this.setState({
        rules: rules.filter(rule => rule.id !== parseInt(selectedRule.id, 10)),
        isDeleteConfirmationOpen: false,
        selectedRule: null,
      });
    } else {
      this.setState({
        isDeleteAlertOpen: true,
      });
    }
  }

  handleCreateSubmit(e) {
    e.preventDefault();

    const { newRule } = this.state;
    const {
      description,
      response_code: responseCode,
      enhanced_code: enhancedCode,
      regex,
      priority,
      bounce_action: bounceAction,
    } = newRule;

    if (
      !description ||
      !responseCode ||
      !enhancedCode ||
      !regex ||
      !priority ||
      !bounceAction
    ) {
      this.setState({
        isInvalidInput: true,
      });
      return;
    }

    this.setState({
      isCreateRuleOpen: false,
      isCreateRuleConfirmationOpen: true,
    });
  }

  handleRuleUpdate(e) {
    const { id, value } = e.currentTarget;
    const { newRule } = this.state;
    this.setState({
      newRule: { ...newRule, [id]: value },
    });
  }

  handleDropdownSelect(e) {
    const { value } = e;
    const { newRule } = this.state;
    this.setState({
      newRule: { ...newRule, bounce_action: value },
    });
  }

  handleRuleUpdateInt(e) {
    const { id, value } = e.currentTarget;
    const { newRule } = this.state;
    if (!value) {
      this.setState({
        newRule: { ...newRule, [id]: value },
      });
    } else {
      this.setState({
        newRule: { ...newRule, [id]: parseInt(value, 10) },
      });
    }
  }

  async handleCreateConfirm() {
    const { rules } = this.state;
    const { newRule } = this.state;
    const { data, status } = await postRule(newRule);
    newRule.id = data.id;
    if (status === 200 || status === 201) {
      this.setState({
        isCreateRuleConfirmationOpen: false,
        rules: [newRule, ...rules],
        newRule: null,
      });
    }
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
    const {
      isRedirectingToDetail,
      rules,
      selectedRule,
      activityLog,
    } = this.state;
    const filteredRules = this.filterRules(this.paginate(rules));
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
        {isRedirectingToDetail && (
          <Redirect
            push
            to={{
              pathname: `/bounce_rules/${selectedRule.id}`,
              state: { currentRule: selectedRule },
            }}
          />
        )}
        {isAuthenticated && (
          <BounceRulesContainer
            logout={this.logout}
            updateSearchToken={this.updateSearchToken}
            updateSearchCategory={this.updateSearchCategory}
            updatePageIndex={this.updatePageIndex}
            handlePrevClicked={this.handlePrevClicked}
            handleNextClicked={this.handleNextClicked}
            addFilter={this.addFilter}
            removeFilter={this.removeFilter}
            filteredRules={filteredRules}
            filteredActivityLog={filteredActivityLog}
            handleRuleUpdate={this.handleRuleUpdate}
            handleRuleUpdateInt={this.handleRuleUpdateInt}
            handleCreateSubmit={this.handleCreateSubmit}
            handleCreateConfirm={this.handleCreateConfirm}
            handleDeleteConfirm={this.handleDeleteConfirm}
            handleCreateOpen={this.handleCreateOpen}
            handleActionOpen={this.handleActionOpen}
            handleModalClose={this.handleModalClose}
            handleTabClicked={this.handleTabClicked}
            handleActivityTabClicked={this.handleActivityTabClicked}
            handleBounceTabClicked={this.handleBounceTabClicked}
            updateActivityLogIndex={this.updateActivityLogIndex}
            handleActivityLogPrevClicked={this.handleActivityLogPrevClicked}
            handleActivityLogNextClicked={this.handleActivityLogNextClicked}
            handleActivityClicked={this.handleActivityClicked}
            handleDropdownSelect={this.handleDropdownSelect}
            {...this.state}
          />
        )}
      </React.Fragment>
    );
  }
}
