import React from "react";
import { Redirect } from "react-router-dom";
import BounceRulesContainer from "../components/BounceRulesContainer";
import { listRules, postRule } from "../utils/ruleCalls";

export default class BounceRulesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchCategory: "Bounce Action",
      searchToken: "",
      isRedirectingToDetail: false,
      selectedRule: {},
      rules: [],
      pageIndex: 1,
      pageInterval: 10,
      pagesToDisplay: 5,
      filterOptions: [],
      invalidFilter: false,
      isCreateRuleOpen: false,
      isCreateRuleConfirmationOpen: false,
      newRule: "",
      isInvalidInput: false,
    };

    this.updateSearchToken = this.updateSearchToken.bind(this);
    this.updateSearchCategory = this.updateSearchCategory.bind(this);
    this.updatePageIndex = this.updatePageIndex.bind(this);
    this.handleRuleClick = this.handleRuleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.prevPageIndex = this.prevPageIndex.bind(this);
    this.nextPageIndex = this.nextPageIndex.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.handleCreateRuleClicked = this.handleCreateRuleClicked.bind(this);
    this.handleCreateRuleClosed = this.handleCreateRuleClosed.bind(this);
    this.handleCreateRuleUpdate = this.handleCreateRuleUpdate.bind(this);
    this.handleCreateRuleSubmit = this.handleCreateRuleSubmit.bind(this);
    this.handleCreateConfirm = this.handleCreateConfirm.bind(this);
    this.handleAlertClose = this.handleAlertClose.bind(this);
  }

  async componentDidMount() {
    const { data, status } = await listRules();
    if (status === 200) {
      this.setState({
        rules: data.reverse(),
        numRules: data.length,
      });
    }
  }

  handleRuleClick(rule) {
    this.setState({
      isRedirectingToDetail: true,
      selectedRule: rule,
    });
  }

  handleKeyDown(rule) {
    this.setState({
      isRedirectingToDetail: true,
      selectedRule: rule,
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

  paginate(rules) {
    const { pageIndex, pageInterval } = this.state;
    const ruleStartIndex = (pageIndex - 1) * pageInterval;
    const ruleEndIndex = (pageIndex - 1 * pageIndex + pageInterval) * pageIndex;
    return rules.slice(ruleStartIndex, ruleEndIndex);
  }

  updatePageIndex(newIndex) {
    this.setState(prevState => ({
      pageIndex:
        prevState.pageIndex !== newIndex ? newIndex : prevState.pageIndex,
    }));
  }

  prevPageIndex() {
    this.setState(prevState => ({
      pageIndex:
        prevState.pageIndex > 1
          ? prevState.pageIndex - prevState.pagesToDisplay
          : 0,
    }));
  }

  nextPageIndex() {
    this.setState(prevState => ({
      pageIndex: prevState.pageIndex + prevState.pagesToDisplay,
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

  removeFilter(e, filter) {
    const { filterOptions } = this.state;
    const newFilter = [...filterOptions];
    const index = newFilter.indexOf(filter);
    newFilter.splice(index, 1);
    this.setState({
      filterOptions: [...newFilter],
    });
  }

  handleCreateRuleClicked() {
    this.setState({
      isCreateRuleOpen: true,
      newRule: {
        description: "",
        response_code: "",
        enhanced_code: "",
        regex: "",
        priority: "",
        bounce_action: "",
      },
    });
  }

  handleCreateRuleClosed(e) {
    const { id } = e.currentTarget;
    switch (id) {
      case "create-rule-close":
        this.setState({
          isCreateRuleOpen: false,
          isInvalidInput: false,
        });
        break;
      case "create-rule-confirmation-close":
        this.setState({ isCreateRuleConfirmationOpen: false });
        break;
      default:
        break;
    }
  }

  handleCreateRuleSubmit(e) {
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

  handleCreateRuleUpdate(e) {
    const { id, value } = e.currentTarget;
    const { newRule } = this.state;
    this.setState({
      newRule: { ...newRule, [id]: value },
    });
  }

  async handleCreateConfirm() {
    const { rules } = this.state;
    let { newRule } = this.state;
    newRule = { ...newRule, id: rules.length + 1 };
    const { data, status } = await postRule(newRule);
    if (status === 201) {
      this.setState({
        isCreateRuleConfirmationOpen: false,
        rules: [data, ...rules],
      });
    }
  }

  handleAlertClose() {
    this.setState({
      isInvalidInput: false,
    });
  }

  render() {
    const { isRedirectingToDetail, rules, selectedRule } = this.state;

    const filteredRules = this.filterRules(this.paginate(rules));
    return isRedirectingToDetail ? (
      <Redirect
        push
        to={{
          pathname: `/bounce_rules/${selectedRule.id}`,
          state: { currentRule: selectedRule },
        }}
      />
    ) : (
      <BounceRulesContainer
        handleRuleClick={this.handleRuleClick}
        handleKeyDown={this.handleKeyDown}
        updateSearchToken={this.updateSearchToken}
        updateSearchCategory={this.updateSearchCategory}
        filterRules={this.filterRules}
        prevPageIndex={this.prevPageIndex}
        nextPageIndex={this.nextPageIndex}
        updatePageIndex={this.updatePageIndex}
        filteredRules={filteredRules}
        addFilter={this.addFilter}
        removeFilter={this.removeFilter}
        handleCreateRuleClicked={this.handleCreateRuleClicked}
        handleCreateRuleClosed={this.handleCreateRuleClosed}
        handleCreateRuleUpdate={this.handleCreateRuleUpdate}
        handleCreateRuleSubmit={this.handleCreateRuleSubmit}
        handleCreateConfirm={this.handleCreateConfirm}
        handleAlertClose={this.handleAlertClose}
        {...this.state}
      />
    );
  }
}
