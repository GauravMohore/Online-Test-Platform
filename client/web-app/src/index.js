import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import signup from "./signup";
import student_login_page from "./Student Side Views/student_login_page";
import student_signup_page from "./Student Side Views/student_signup_page";
import admin from "./Admin Side Views/admin";
import error from "./error";
import dashboard from "./dashboard";
import StudentDashboard from "./Student Side Views/StudentDashboard";
import StudentViewExam from "./Student Side Views/StudentViewExam";
import ExamPage from "./New Components/ExamPage";
import FacultyDashboard from "./Faculty/FacultyDashboard";
import FacultyViewExams from "./Faculty/ViewExams";
import AdminDashboard from "./Admin/AdminDashboard";
import CreateExam from "./Faculty/CreateExams";
import ExamInfo from "./Faculty/ExamInfo";
import EditExamProcess from "./Faculty/EditExamProcess"
import DisplayStudent from "./Admin/DisplayStudent";
import ShowResult from "./New Components/ShowResult";

// Routing to the component
class Start extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={student_login_page} />
          <Route exact path={"/admin"} component={admin} />
          <Route exact path={"/signup"} component={signup} />
          <Route exact path={"/dashboard/admin"} component={AdminDashboard} />
          <Route
            exact
            path={"/dashboard/admin/displayStudent"}
            component={DisplayStudent}
          />
          <Route
            exact
            path={"/dashboard/student"}
            component={StudentDashboard}
          />
          <Route
            exact
            path={"/dashboard/student/viewExam"}
            component={StudentViewExam}
          />
          <Route exact path={"/studentlogin"} component={student_login_page} />
          <Route
            exact
            path={"/studentsignup"}
            component={student_signup_page}
          />
          {/* faculty */}
          <Route
            exact
            path="/dashboard/faculty"
            component={FacultyDashboard}
          ></Route>
          <Route
            exact
            path="/dashboard/faculty/viewExam"
            component={() => <FacultyViewExams />}
          ></Route>
          <Route
            exact
            path="/dashboard/faculty/createExam"
            component={() => <CreateExam />}
          ></Route>
          <Route
            exact
            path="/editExamProcess"
            component={() => <EditExamProcess />}
          ></Route>
          <Route
            exact
            path="/dashboard/faculty/examInfo"
            component={() => <ExamInfo />}
          ></Route>

          {/* exam */}
          <Route exact path={"/LoadExam"} component={ExamPage} />

          <Route exact path={"/ShowResult"} component={() => <ShowResult />} />

          <Route exact path={"/*"} component={error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Start />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
