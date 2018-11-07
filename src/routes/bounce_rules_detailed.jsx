import React from "react";
import BounceRuleDetailed from "../components/BounceRuleDetailed";
import { getRule } from "../utils/ruleCalls";

export default class BounceRuleDetailedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRule: null,
    };
  }

  componentDidMount() {
    const { match, location } = this.props;
    if (location.state == null) {
      getRule(match.params.bounceRuleId).then(response => {
        this.setState({
          currentRule: response.data,
        });
      });
    } else {
      this.setState({
        currentRule: location.state.currentRule,
      });
    }
  }

  render() {
    const { currentRule } = this.state;

    return currentRule && <BounceRuleDetailed currentRule={currentRule} />;
  }
}
