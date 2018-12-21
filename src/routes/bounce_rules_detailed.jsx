import React from "react";
import _ from "underscore";
import BounceRuleDetailed from "../components/BounceRuleDetailed";
import { getRule } from "../utils/ruleCalls";

export default class BounceRuleDetailedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRule: null,
      isEditClicked: false,
      isChangeModalOpen: false,
      isCancelConfirmOpen: false,
      isConfirmOpen: false,
      pagesToDisplay: 5,
    };

    this.onChangeRule = this.onChangeRule.bind(this);
    this.handleButtonClicked = this.handleButtonClicked.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalConfirm = this.handleModalConfirm.bind(this);
  }

  async componentDidMount() {
    const { match, location } = this.props;
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

  onChangeRule(event) {
    const { id, value } = event.currentTarget;
    const { currentRule } = this.state;
    this.setState({
      currentRule: { ...currentRule, [id]: value },
    });
  }

  handleModalClose(event) {
    const { id } = event.currentTarget;
    switch (id) {
      case "changeModal": {
        this.setState({
          isChangeModalOpen: false,
        });
        break;
      }
      case "cancelModal": {
        this.setState({
          isCancelConfirmOpen: false,
        });
        break;
      }
      case "saveModal": {
        this.setState({
          isConfirmOpen: false,
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
            isCancelConfirmOpen: true,
          });
        } else {
          this.setState({
            isEditClicked: false,
          });
        }
        break;
      }
      case "editClicked": {
        this.setState({
          isEditClicked: true,
          prevRule: { ...currentRule },
        });
        break;
      }
      case "saveClicked": {
        if (!_.isEqual(prevRule, currentRule)) {
          this.setState({
            isConfirmOpen: true,
          });
        } else {
          this.setState({
            isEditClicked: false,
          });
        }
        break;
      }
      case "changeClicked": {
        this.setState({
          isChangeModalOpen: true,
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
          isEditClicked: false,
        });
        break;
      }
      case "saveModal": {
        this.setState({
          isConfirmOpen: false,
          isEditClicked: false,
        });
        break;
      }
      default: {
        break;
      }
    }
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
