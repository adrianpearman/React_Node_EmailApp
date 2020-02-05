import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Stripe from "./Payment";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Log In with Google</a>
          </li>
        );
      default:
        return [
          <li key="0">
            <button className="btn" style={{ marginRight: "5px" }}>
              <Link to="/surveys">View Surveys</Link>
            </button>
          </li>,
          <li key="1">
            <Stripe />
          </li>,
          <li key="2" style={{ margin: "0px 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="3">
            <a href="/api/logout">Log Out</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            // changes path based on whether user is logged in.
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
            style={{ paddingLeft: "10px" }}
          >
            Email App
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
