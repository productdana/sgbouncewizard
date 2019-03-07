import React from "react";
import _ from "underscore";
import { Redirect } from "react-router-dom";
import BounceDetailsContainer from "../components/BounceDetailsContainer";
import { getRule, getChangelog, putRule } from "../utils/ruleCalls";
import { validateCommit } from "../utils/utils";

export default class BounceDetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRule: null,
      updatedRule: null,
      changelog: [],
      isEditClicked: false,
      isChangeModalOpen: false,
      isCancelConfirmOpen: false,
      isConfirmOpen: false,
      isUpdateError: false,
      currentPageIndex: 1,
      rulesToShow: 10,
      pagesToDisplay: 5,
      isNetworkError: false,
      changelogLimit: 10,
      isCommitValid: true,
    };
    this.logout = this.logout.bind(this);
    this.onChangeRule = this.onChangeRule.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleEditClicked = this.handleEditClicked.bind(this);
    this.handleCancelSaveClicked = this.handleCancelSaveClicked.bind(this);
    this.handleChangelogClicked = this.handleChangelogClicked.bind(this);
    this.handleCancelConfirmation = this.handleCancelConfirmation.bind(this);
    this.handleSaveConfirmation = this.handleSaveConfirmation.bind(this);
    this.onChangeRuleInt = this.onChangeRuleInt.bind(this);
    this.handleRevertConfirm = this.handleRevertConfirm.bind(this);
    this.handleRevertModalClose = this.handleRevertModalClose.bind(this);
    this.updatePageIndex = this.updatePageIndex.bind(this);
    this.handlePrevClicked = this.handlePrevClicked.bind(this);
    this.handleNextClicked = this.handleNextClicked.bind(this);
    this.handleRevertClicked = this.handleRevertClicked.bind(this);
    this.onChangeRevert = this.onChangeRevert.bind(this);
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    try {
      const { data, status } = await getRule(match.params.bounceRuleId);
      if (status === 200) {
        this.setState({ currentRule: data });
      }
    } catch (error) {
      this.setState({
        isNetworkError: true,
      });
    }

    try {
      const { data, status } = await getChangelog(match.params.bounceRuleId);
      if (status === 200) {
        this.setState({
          changelog: data,
        });
      }
    } catch (error) {
      this.setState({
        isNetworkError: true,
      });
    }
  }

  onChangeRuleInt(e) {
    const { updatedRule } = this.state;
    const { id, value } = e.currentTarget;
    this.setState({
      updatedRule: { ...updatedRule, [id]: parseInt(value, 10) },
    });
  }

  onChangeRule(e) {
    const { id, value } = e.currentTarget;
    const { updatedRule } = this.state;
    this.setState({
      updatedRule: { ...updatedRule, [id]: value },
    });
  }

  onChangeRevert(e) {
    const { id, value } = e.currentTarget;
    const { selectedChange } = this.state;
    const isCommitValid = validateCommit(value);
    this.setState({
      selectedChange: { ...selectedChange, [id]: value },
      isCommitValid,
    });
  }

  handleDropdownSelect(e) {
    const { value } = e;
    const { updatedRule } = this.state;
    this.setState({
      updatedRule: { ...updatedRule, bounce_action: value },
    });
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
      selectedChange: null,
      isCommitValid: true,
    });
  }

  handleRevertModalClose(e) {
    const { id } = e.currentTarget;
    const { selectedChange, oldCommit } = this.state;
    const oldSelectedChange = Object.assign(selectedChange, {
      comment: oldCommit,
    });
    this.setState({
      [id]: false,
      selectedChange: oldSelectedChange,
      isCommitValid: true,
    });
  }

  handleChangelogClicked(e) {
    const { changelog } = this.state;
    const { id } = e.currentTarget;
    const changeIndex = parseInt(e.currentTarget.getAttribute("index"), 10);
    const selectedChange = changelog[changeIndex];
    const oldCommit = selectedChange.comment;
    this.setState({
      [id]: true,
      selectedChange: _.omit(selectedChange, "comment"),
      oldCommit,
      selectedChangelogIndex: changeIndex,
    });
  }

  handleRevertClicked() {
    this.setState({
      isChangeModalOpen: false,
      isRevertConfirmOpen: true,
    });
  }

  async handleRevertConfirm() {
    const { selectedChange } = this.state;
    const { id } = selectedChange;

    try {
      const { status: putStatus } = await putRule(id, selectedChange);
      const { data, status: changelogStatus } = await getChangelog(id);
      if (putStatus === 200) {
        this.setState({
          currentRule: selectedChange,
          isRevertConfirmOpen: false,
          oldCommit: null,
        });
      }
      if (changelogStatus === 200) {
        this.setState({
          changelog: data,
        });
      }
    } catch (error) {
      this.setState({
        isNetworkError: true,
        isFetching: false,
      });
    }
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
    updatedRule.user_id = parseInt(localStorage.getItem("user_id"), 10);
    const { id } = updatedRule;
    try {
      const { status: statusData } = await putRule(id, updatedRule);
      const { data, status: changelogStatus } = await getChangelog(id);

      if (statusData === 200) {
        this.setState({
          currentRule: updatedRule,
          isConfirmOpen: false,
          isEditClicked: false,
          isUpdateError: false,
          isNetworkError: false,
        });
      }
      if (changelogStatus === 200) {
        this.setState({
          changelog: data,
        });
      }
    } catch (error) {
      this.setState({
        isNetworkError: true,
      });
    }
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

  render() {
    const { currentRule, changelog } = this.state;
    const filteredChangelog = this.paginate(changelog);
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
        {isAuthenticated &&
          currentRule && (
            <BounceDetailsContainer
              logout={this.logout}
              handleModalClose={this.handleModalClose}
              handleButtonClicked={this.handleButtonClicked}
              onChangeRule={this.onChangeRule}
              handleEditClicked={this.handleEditClicked}
              handleCancelSaveClicked={this.handleCancelSaveClicked}
              handleChangelogClicked={this.handleChangelogClicked}
              handleCancelConfirmation={this.handleCancelConfirmation}
              handleSaveConfirmation={this.handleSaveConfirmation}
              handlePrevClicked={this.handlePrevClicked}
              handleNextClicked={this.handleNextClicked}
              onChangeRuleInt={this.onChangeRuleInt}
              updatePageIndex={this.updatePageIndex}
              handleRevertClicked={this.handleRevertClicked}
              handleRevertModalClose={this.handleRevertModalClose}
              handleRevertConfirm={this.handleRevertConfirm}
              onChangeRevert={this.onChangeRevert}
              filteredChangelog={filteredChangelog}
              handleDropdownSelect={this.handleDropdownSelect}
              {...this.state}
            />
          )}
      </React.Fragment>
    );
  }
}
