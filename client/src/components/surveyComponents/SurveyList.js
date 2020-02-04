import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../redux/actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    // console.log(this.props.surveys);
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <p>Yes: {survey.yes}</p>
            <p>No: {survey.no}</p>
          </div>
        </div>
      );
    });
  }

  // Version 1 - Will not work with this app (still no clue as too why?)
  // render(){
  //   return(
  //     <div>
  //       {this.renderSurveys()}
  //     </div>
  //   )
  // }

  // Version 2 - seems to work do to if statement redundancy metric.
  render() {
    if (this.props.surveys && this.props.surveys.length) {
      return <div>{this.renderSurveys()}</div>;
    } else {
      return <div></div>;
    }
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
