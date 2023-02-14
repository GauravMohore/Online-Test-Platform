import React, { useRef } from "react";

import "../Student Side Styles/studentsignup.css";
import Axios from "axios";
import Cookies from "js-cookie";

class student_login_page extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      passwd: "",
    };
  }

  onNavigateStudentSignUp = () => {
    this.props.history.push("/studentsignup");
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (/^([\w\d](\.)*)+\@([\w\.]{1,2})+(\w)$/.test(this.state.email)) {
      if (this.state.passwd.length > 5) {
        let student_users = {
          email: this.state.email,
          passwd: this.state.passwd,
        };
        // console.log(student_users)

        Axios.post("http://localhost:5000/signin", { student_users })
          .then((res) => {
            // alert(res.data);
            console.log(res.data.statusMessage);
            Cookies.set("email", res.data.email, { expires: 1 });
            Cookies.set("role", res.data.role, { expires: 1 });
            Cookies.set("orgId", res.data.orgId, { expires: 1 });

            console.log(Cookies.get("role"));
            this.state = {
              email: "",
              passwd: "",
            };
            Array.from(document.querySelectorAll("input")).forEach(
              (input) => (input.value = "")
            );

            if (res.data.role == "student") {
              alert("Please enter the student dashboard");
              this.props.history.push("/dashboard/student");
            } else if (res.data.role == "faculty") {
              alert("Please enter the faculty dashboard");
              this.props.history.push("/dashboard/faculty");
            } else if (res.data.role == "admin") {
              alert("Please enter the admin dashboard");
              this.props.history.push("/dashboard/admin");
            } else if (res.data.role == "super") {
              alert("Please enter the super dashboard");
              this.props.history.push("/dashboard/student");
            }
          })
          .catch((err) => {
            alert(err.response.data.error);
          });
      } else {
        alert("Minimum Password Length Is 6");
      }
    } else {
      alert("Enter Proper Mail ID");
    }
  };

  render() {
    return (
      <>
        <div className="register-org-form">
          <div className="wrapper">
            <div className="title-text">
              <div className="title login">Welcome</div>
              <div className="title signup">Exam Sign-Up</div>
            </div>
            <div className="form-container">
              <div className="slide-controls">
                <input type="radio" name="slide" id="login" checked />
                <input type="radio" name="slide" id="signup" />
                <label for="login" className="slide login">
                  Login
                </label>
                <label
                  for="signup"
                  className="slide signup"
                  onClick={this.onNavigateStudentSignUp}
                >
                  Signup
                </label>
                <div className="slider-tab"></div>
              </div>
              <div className="form-inner">
                <form onSubmit={this.handleSubmit} className="login">
                  <div className="field">
                    <input
                      name="email"
                      type="text"
                      placeholder="Email Address"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <input
                      name="passwd"
                      type="password"
                      placeholder="Password"
                      value={this.state.passwd}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  {/* <div className="pass-link">
                                    <a href="#">Forgot password?</a>
                                </div> */}
                  <div className="field btn">
                    <div className="btn-layer"></div>
                    <input type="submit" value="Login" />
                  </div>
                  <div className="signup-link">
                    Not registered?{" "}
                    <a href="" onClick={this.onNavigateStudentSignUp}>
                      Signup now
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default student_login_page;
