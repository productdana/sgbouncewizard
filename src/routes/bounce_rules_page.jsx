import React from "react";
import { Redirect } from "react-router-dom";
import BounceRulesContainer from "../components/BounceRulesContainer";
import { listRules, deleteRule, postRule } from "../utils/ruleCalls";

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
      rules: [],
      currentPageIndex: 1,
      rulesToShow: 10,
      pagesToDisplay: 5,
      filterOptions: [],
      isValidFilter: true,
      isFetching: true,
      isDeleteConfirmationOpen: false,
      isDeleteAlertOpen: false,
      isCreateRuleOpen: false,
      isCreateRuleConfirmationOpen: false,
      newRule: {},
      isInvalidInput: false,
      isCommitEmpty: false,
      isCommitDisabled: true,
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
    this.handleDeleteCommit = this.handleDeleteCommit.bind(this);
    this.handleCreateCommit = this.handleCreateCommit.bind(this);
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
        rule.bounce_action.toLowerCase().includes(searchToken.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchToken.toLowerCase())
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
      isCommitDisabled: true,
      selectedRule: {},
      newRule: null,
    });
  }

  async handleDeleteConfirm() {
    const { rules, selectedRule } = this.state;
    const ruleToDelete = {
      ...selectedRule,
      user_id: parseInt(localStorage.getItem("user_id"), 10),
    };
    const { status } = await deleteRule(ruleToDelete);
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

  handleDeleteCommit(e) {
    const { value, id } = e.currentTarget;
    const { selectedRule } = this.state;
    if (value.length === 0) {
      this.setState({
        isCommitEmpty: true,
        isCommitDisabled: true,
      });
    } else {
      this.setState({
        isCommitEmpty: false,
        isCommitDisabled: false,
      });
    }
    this.setState({
      selectedRule: { ...selectedRule, [id]: value },
    });
  }

  handleCreateCommit(e) {
    const { value, id } = e.currentTarget;
    const { newRule } = this.state;
    if (value.length === 0) {
      this.setState({
        isCommitEmpty: true,
        isCommitDisabled: true,
      });
    } else {
      this.setState({
        isCommitEmpty: false,
        isCommitDisabled: false,
      });
    }
    this.setState({
      newRule: { ...newRule, [id]: value },
    });
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

  handleDropdownSelect(e) {
    const { value } = e;
    const { newRule } = this.state;
    this.setState({
      newRule: { ...newRule, bounce_action: value },
    });
  }

  render() {
    const { isRedirectingToDetail, rules, selectedRule } = this.state;
    const filteredRules = this.filterRules(this.paginate(rules));
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
            handleDeleteCommit={this.handleDeleteCommit}
            handleCreateCommit={this.handleCreateCommit}
            handleDropdownSelect={this.handleDropdownSelect}
            {...this.state}
          />
        )}
      </React.Fragment>
    );
  }
}
