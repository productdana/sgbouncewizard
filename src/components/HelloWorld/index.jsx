import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  render() {
    const { name } = this.props;
    const { isVisible } = this.state;
    return (
      <div className={cn({ "is-visible": isVisible })}>
        <h1>Hello {name}!</h1>
      </div>
    );
  }
}

HelloWorld.propTypes = {
  name: PropTypes.string,
};

HelloWorld.defaultProps = {
  name: "world",
};
