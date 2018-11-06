import React from "react";
import BounceRulesContainer from "../components/BounceRulesContainer";
import { listRules } from "../utils/ruleCalls";

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
      filterOptions: [],
      invalidFilter: false,
    };

    this.updateSearchToken = this.updateSearchToken.bind(this);
    this.updateSearchCategory = this.updateSearchCategory.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.prevPageIndex = this.prevPageIndex.bind(this);
    this.nextPageIndex = this.nextPageIndex.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
  }

  async componentDidMount() {
    const { data, status } = await listRules();
    if (status === 200) {
      const { rules, numRules } = data;
      this.setState({
        rules,
        numRules,
      });
    }
  }

  handleRuleClick(rule) {
    this.setState(prevProps => ({
      isRedirectingToDetail: !prevProps.isRedirectingToDetail,
      selectedRule: rule,
    }));
  }

  handleKeyDown(rule) {
    this.setState(prevProps => ({
      isRedirectingToDetail: !prevProps.isRedirectingToDetail,
      selectedRule: rule,
    }));
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
    return rules.slice(pageIndex - 1, pageIndex - 1 + pageInterval);
  }

  updatePageIndex(newIndex) {
    this.setState(prevState => ({
      pageIndex:
        prevState.pageIndex !== newIndex ? newIndex : prevState.pageIndex,
    }));
  }

  prevPageIndex() {
    this.setState(prevState => ({
      pageIndex: prevState.pageIndex > 1 ? prevState.pageIndex - 1 : 0,
    }));
  }

  nextPageIndex() {
    this.setState(prevState => ({
      pageIndex: prevState.pageIndex + 1,
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

  render() {
    const { isRedirectingToDetail, rules } = this.state;
    const filteredRules = this.filterRules(this.paginate(rules));
    return isRedirectingToDetail ? (
      <h1>test</h1>
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
        {...this.state}
      />
    );
  }
}
