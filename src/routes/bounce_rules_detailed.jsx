import React from "react";
import _ from "underscore";
import BounceRuleDetailed from "../components/BounceRuleDetailed";
import { getRule, getChangelog, putRule } from "../utils/ruleCalls";

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
      isRevertConfirmOpen: false,
      pageIndex: 1,
      pageInterval: 10,
      pagesToDisplay: 1,
      isNetworkError: false,
      changelogLimit: 10,
    };

    this.onChangeRule = this.onChangeRule.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleEditClicked = this.handleEditClicked.bind(this);
    this.handleCancelSaveClicked = this.handleCancelSaveClicked.bind(this);
    this.handleChangelogClicked = this.handleChangelogClicked.bind(this);
    this.handleCancelConfirmation = this.handleCancelConfirmation.bind(this);
    this.handleSaveConfirmation = this.handleSaveConfirmation.bind(this);
    this.onChangeRuleInt = this.onChangeRuleInt.bind(this);
    this.handleRevertConfirm = this.handleRevertConfirm.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    getChangelog(match.params.bounceRuleId)
      .then(res => {
        const { data } = res;
        this.setState({
          changelog: data.reverse(),
        });
      })
      .catch(() => {
        this.setState({ isNetworkError: true });
      });
    const { data, status } = await getRule(match.params.bounceRuleId);
    if (status === 200) {
      this.setState({
        currentRule: data,
      });
    }
  }

  onChangeRule(e) {
    const { id, value } = e.currentTarget;
    const { updatedRule } = this.state;
    this.setState({
      updatedRule: { ...updatedRule, [id]: value },
    });
  }

  onChangeRuleInt(e) {
    const re = /^[0-9\b]+$/;
    const { updatedRule } = this.state;
    const { id, value } = e.currentTarget;
    if (re.test(value)) {
      this.setState({
        updatedRule: { ...updatedRule, [id]: parseInt(value, 10) },
      });
    }
  }

  handleModalClose(e) {
    const { id } = e.currentTarget;
    this.setState({
      [id]: false,
      selectedChange: null,
    });
  }

  handleChangelogClicked(e) {
    const { changelog } = this.state;
    const { id } = e.currentTarget;
    const changeIndex = e.currentTarget.getAttribute("index");
    this.setState({
      selectedChange: changelog[changeIndex],
      [id]: true,
    });
  }

  async handleRevertConfirm() {
    const { selectedChange } = this.state;
    await putRule(selectedChange.id, selectedChange);
    getChangelog(selectedChange.id)
      .then(res => {
        const { data } = res;
        this.setState({
          changelog: data.reverse(),
        });
      })
      .catch(() => {
        this.setState({ isNetworkError: true });
      });
    this.setState({
      isConfirmOpen: false,
      isEditClicked: false,
    });
  }

  handleEditClicked(e) {
    const { id } = e.currentTarget;
    const { currentRule } = this.state;
    this.setState({
      [id]: true,
      updatedRule: _.omit(currentRule, ["created_at", "comment", "user_id"]),
    });
  }

  handleCancelSaveClicked(e) {
    const { id } = e.currentTarget;
    const { currentRule, updatedRule } = this.state;
    if (
      !_.isEqual(
        updatedRule,
        _.omit(currentRule, ["created_at", "comment", "user_id"])
      )
    ) {
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
    this.setState({
      isCancelConfirmOpen: false,
      isEditClicked: false,
    });
  }

  async handleSaveConfirmation() {
    const { updatedRule } = this.state;
    const { id } = updatedRule;
    await putRule(id, updatedRule);
    getChangelog(id)
      .then(res => {
        const { data } = res;
        this.setState({
          currentRule: updatedRule,
          changelog: data.reverse(),
        });
      })
      .catch(() => {
        this.setState({ isNetworkError: true });
      });
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
          onChangeRuleInt={this.onChangeRuleInt}
          handleRevertConfirm={this.handleRevertConfirm}
          {...this.state}
        />
      )
    );
  }
}
