import React from "react";
import PropTypes from "prop-types";

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name } = this.props;
    return (
      <div>
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
