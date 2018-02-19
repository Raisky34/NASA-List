import React, { Component } from "react";
import { connect } from "react-redux";

class IndexPage extends Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

export default connect(() => ({}), {})(IndexPage);
