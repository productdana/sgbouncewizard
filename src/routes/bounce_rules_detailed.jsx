import React from "react";
import _ from "underscore";
import BounceRuleDetailed from "../components/BounceRuleDetailed";
import { getRule, getChangelog } from "../utils/ruleCalls";

export default class BounceRuleDetailedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRule: null,
      changelog: [],
      isEditClicked: false,
      isChangeModalOpen: false,
      isCancelConfirmOpen: false,
      isConfirmOpen: false,
      pageIndex: 1,
      pageInterval: 10,
      pagesToDisplay: 5,
      isNetworkError: false,
    };

    this.onChangeRule = this.onChangeRule.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleEditClicked = this.handleEditClicked.bind(this);
    this.handleCancelSaveClicked = this.handleCancelSaveClicked.bind(this);
    this.handleChangelogClicked = this.handleChangelogClicked.bind(this);
    this.handleCancelConfirmation = this.handleCancelConfirmation.bind(this);
    this.handleSaveConfirmation = this.handleSaveConfirmation.bind(this);
  }

  async componentDidMount() {
    const { match, location } = this.props;
    getChangelog(match.params.bounceRuleId)
      .then(res => {
        const { data } = res;
        this.setState({
          changelog: data.changelog,
        });
      })
      .catch(() => {
        this.setState({ isNetworkError: true });
      });
    if (location.state == null) {
      const { data, status } = await getRule(match.params.bounceRuleId);
      if (status === 200) {
        this.setState({
          currentRule: data,
        });
      }
    } else {
      this.setState({
        currentRule: location.state.currentRule,
      });
    }
  }

  onChangeRule(e) {
    const { id, value } = e.currentTarget;
    const { currentRule } = this.state;
    this.setState({
      currentRule: { ...currentRule, [id]: value },
    });
  }

  handleModalClose(e) {
    const { id } = e.currentTarget;
    this.setState({
      [id]: false,
    });
  }

  handleChangelogClicked() {
    this.setState({
      isChangeModalOpen: true,
    });
  }

  handleEditClicked(e) {
    const { id } = e.currentTarget;
    const { currentRule } = this.state;
    this.setState({
      [id]: true,
      prevRule: { ...currentRule },
    });
  }

  handleCancelSaveClicked(e) {
    const { id } = e.currentTarget;
    const { currentRule, prevRule } = this.state;
    if (!_.isEqual(prevRule, currentRule)) {
      this.setState({
        [id]: true,
      });
    } else {
      this.setState({
        isEditClicked: false,
      });
    }
  }

  handleCancelConfirmation() {
    const { prevRule } = this.state;
    this.setState({
      currentRule: { ...prevRule },
      isCancelConfirmOpen: false,
      isEditClicked: false,
    });
  }

  handleSaveConfirmation() {
    this.setState({
      isConfirmOpen: false,
      isEditClicked: false,
    });
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

  render() {
    const { currentRule } = this.state;
    return (
      currentRule && (
        <BounceRuleDetailed
          handleModalClose={this.handleModalClose}
          handleButtonClicked={this.handleButtonClicked}
          onChangeRule={this.onChangeRule}
          handleEditClicked={this.handleEditClicked}
          handleCancelSaveClicked={this.handleCancelSaveClicked}
          handleChangelogClicked={this.handleChangelogClicked}
          handleCancelConfirmation={this.handleCancelConfirmation}
          handleSaveConfirmation={this.handleSaveConfirmation}
          {...this.state}
        />
      )
    );
  }
}
