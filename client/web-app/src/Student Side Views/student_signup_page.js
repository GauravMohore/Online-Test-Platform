import React, { Component } from "react";
import Axios from 'axios';

export default class student_signup_page extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      passwd: "",
      cpasswd: "",
      role: "",
    };
  }

  sendValues = (event) => {
    event.preventDefault();

    if (
      this.state.email === "" ||
      this.state.passwd === "" ||
      this.state.cpasswd === "" ||
      this.state.role === ""
    ) {
      alert("Enter All Details.. ");
    } else {
      if (
        /^([\w\d](\.)*)+\@([\w\.]{1,2})+(\w)$/.test(this.state.email) &&
        this.state.email.length >= 3 &&
        this.state.passwd.length >= 3 &&
        this.state.cpasswd.length >= 3
      ) {
        const details = {
          email: this.state.email,
          passwd: this.state.passwd,
          cpasswd: this.state.cpasswd,
          role: this.state.role,
        };
        console.log(details)

        Axios.post("http://localhost:5000/signup", { details })
          .then((res) => {
            alert(res.data.statusMessage);
            this.setState({
              email: "",
              passwd: "",
              cpasswd: "",
              role: "",
            });
            Array.from(document.querySelectorAll("input")).forEach(
              (input) => (input.value = "")
            );
          })
          .catch((err) => {
            alert(err.response.data.error);
            // console.log(err.data.statusMessage, "Inside Catch");
          });


      } else {
        alert("Enter Proper Details");
      }
    }
  };

  handleInputChange = (e) => {
    let inputValue = e.target.value.trim();
    // console.log(inputValue)
    this.setState({
      [e.target.name]: e.target.value,
    });
  };




  onNavigateStudentSignIn = () => {
    this.props.history.push("/studentlogin");
  };

  render() {
    return (
      <>
        <div className="register-org-form">
          <div className="wrapper">
            <div className="title-text">
              <div className="title login title-login">Exam Login</div>
              <div className="title signup">Registration</div>
            </div>
            <div className="form-container" >
              <div className="slide-controls">
                <input type="radio" name="slide" id="login" />
                <input type="radio" name="slide" id="signup" checked />
                <label
                  for="login"
                  className="slide login"
                  onClick={this.onNavigateStudentSignIn}
                >
                  Login
                </label>
                <label for="signup" className="slide signup">
                  Signup
                </label>
                <div className="slider-tab"></div>
              </div>
              <div className="form-inner">
                <form action="#" className="signup" onSubmit={this.sendValues}>
                  <div className="field">
                    <input type="text" name='email' placeholder="Email Address" onChange={this.handleInputChange} required />
                  </div>
                  <div className="field">
                    <input type="password" name='passwd' placeholder="Password" onChange={this.handleInputChange} required />
                  </div>
                  <div className="field">
                    <input
                      type="password"
                      name='cpasswd'
                      placeholder="Confirm password"
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <select required onChange={this.handleInputChange} name="role">
                      <option value="" disabled selected hidden>
                        Choose Role
                      </option>
                      <option value="Faculty" >Faculty</option>
                      <option value="Student">Student</option>
                    </select>
                  </div>
                  <div className="field btn">
                    <div className="btn-layer"></div>
                    <input type="submit" value="Signup" />
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
