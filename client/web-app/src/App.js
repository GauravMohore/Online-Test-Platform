import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Button } from "@mui/material";
import { BrowserRouter, Link, NavLink } from "react-router-dom";
import signup from "./signup";
import studentsignup from "./Student Side Views/student_login_page";


export default class App extends React.Component {
  // onNavigateSignup = () => {
  //   this.props.history.push("/signup");
  // };
  // onNavigateStudentSignUp = () => {
  //   this.props.history.push("/studentsignup");
  // };

  render() {
    return (
      <div className="landing-page">
        <header className="App-header">
          <h1>Online Examination Portal</h1>
          <Button
            onClick={this.onNavigateSignup}
            variant="outlined"
            color="primary"
          >
            Register Your Organization
          </Button>
          <div>
            <Button
              onClick={this.onNavigateStudentSignUp}
              variant="outlined"
              color="primary"
              className="button-css"
            >
              Student Registration
            </Button>
          </div>
        </header>
      </div>
    );
  }
}
