import React from "react";
import BounceRulesDeleted from "../components/BounceRulesDeleted";
import { getChangelog } from "../utils/ruleCalls";

export default class BounceRulesDeletedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deletedRules: [],
    };
    this.logout = this.logout.bind(this);
    this.updatePageIndex = this.updatePageIndex.bind(this);
    this.handlePrevClicked = this.handlePrevClicked.bind(this);
    this.handleNextClicked = this.handleNextClicked.bind(this);
  }

  async componentDidMount() {
    const { data } = await getChangelog(527);
    if (data) {
      this.setState({
        deletedRules: data,
      });
    }
  }

  logout() {
    const { history } = this.props;
    localStorage.clear();
    history.push("/");
  }

  paginate(changelog) {
    const { currentPageIndex, rulesToShow } = this.state;
    const ruleStartIndex = (currentPageIndex - 1) * rulesToShow;
    const ruleEndIndex =
      (currentPageIndex - 1 * currentPageIndex + rulesToShow) *
      currentPageIndex;
    return changelog.slice(ruleStartIndex, ruleEndIndex);
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

  render() {
    return (
      <React.Fragment>
        <BounceRulesDeleted {...this.state} />
      </React.Fragment>
    );
  }
}
