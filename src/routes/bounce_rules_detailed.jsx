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
      isNetworkError: false
    };

    this.onChangeRule = this.onChangeRule.bind(this);
    this.handleButtonClicked = this.handleButtonClicked.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalConfirm = this.handleModalConfirm.bind(this);
  }

  async componentDidMount() {
    const { match, location } = this.props;
    getChangelog(match.params.bounceRuleId)
      .then(res => {
        const { data } = res;
        this.setState({
          changelog: data.changelog
        });
      })
      .catch(() => {
        this.setState({ isNetworkError: true });
      });
    if (location.state == null) {
      const { data, status } = await getRule(match.params.bounceRuleId);
      if (status === 200) {
        this.setState({
          currentRule: data
        });
      }
    } else {
      this.setState({
        currentRule: location.state.currentRule
      });
    }
  }

  onChangeRule(event) {
    const { id, value } = event.currentTarget;
    const { currentRule } = this.state;
    this.setState({
      currentRule: { ...currentRule, [id]: value }
    });
  }

  handleModalClose(event) {
    const { id } = event.currentTarget;
    switch (id) {
      case "changeModal": {
        this.setState({
          isChangeModalOpen: false
        });
        break;
      }
      case "cancelModal": {
        this.setState({
          isCancelConfirmOpen: false
        });
        break;
      }
      case "saveModal": {
        this.setState({
          isConfirmOpen: false
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  handleButtonClicked(event) {
    const { currentRule, prevRule } = this.state;
    const { id } = event.currentTarget;
    switch (id) {
      case "cancelClicked": {
        if (!_.isEqual(prevRule, currentRule)) {
          this.setState({
            isCancelConfirmOpen: true
          });
        } else {
          this.setState({
            isEditClicked: false
          });
        }
        break;
      }
      case "editClicked": {
        this.setState({
          isEditClicked: true,
          prevRule: { ...currentRule }
        });
        break;
      }
      case "saveClicked": {
        if (!_.isEqual(prevRule, currentRule)) {
          this.setState({
            isConfirmOpen: true
          });
        } else {
          this.setState({
            isEditClicked: false
          });
        }
        break;
      }
      case "changeClicked": {
        this.setState({
          isChangeModalOpen: true
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  handleModalConfirm(event) {
    const { prevRule } = this.state;
    const { id } = event.currentTarget;
    switch (id) {
      case "cancelModal": {
        this.setState({
          currentRule: { ...prevRule },
          isCancelConfirmOpen: false,
          isEditClicked: false
        });
        break;
      }
      case "saveModal": {
        this.setState({
          isConfirmOpen: false,
          isEditClicked: false
        });
        break;
      }
      default: {
        break;
      }
    }
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
        prevState.pageIndex !== newIndex ? newIndex : prevState.pageIndex
    }));
  }

  prevPageIndex() {
    this.setState(prevState => ({
      pageIndex:
        prevState.pageIndex > 1
          ? prevState.pageIndex - prevState.pagesToDisplay
          : 0
    }));
  }

  nextPageIndex() {
    this.setState(prevState => ({
      pageIndex: prevState.pageIndex + prevState.pagesToDisplay
    }));
  }

  render() {
    const { currentRule } = this.state;
    return (
      currentRule && (
        <BounceRuleDetailed
          handleModalClose={this.handleModalClose}
          handleButtonClicked={this.handleButtonClicked}
          handleModalConfirm={this.handleModalConfirm}
          onChangeRule={this.onChangeRule}
          {...this.state}
        />
      )
    );
  }
}
