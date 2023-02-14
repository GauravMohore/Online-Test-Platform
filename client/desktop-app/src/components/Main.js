import React, { Fragment, Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';

import history from './history';
import Home from "./Home";
import AdminDashboard from './Admin/AdminDashboard';
import AddAdmins from './Admin/AddAdmins';
import AddFaculties from './Admin/AddFaculties';
import AddStudents from './Admin/AddStudents';
import DisplayFaculties from './Admin/DisplayFaculties';
import DisplayStudents from './Admin/DisplayStudents';
import DisplayAdmins from './Admin/DisplayAdmins';
import FacultyDashboard from './Faculty/FacultyDashboard';
import StudentDashboard from './Student/StudentDashboard';
import FacultyCreateExam from './Faculty/CreateExams';
import FacultyViewExam from './Faculty/ViewExams';
import StudentViewExam from './Student/ViewExam';
import DisplayViewExam from './Admin/AdminHeaderExam'
import AdminCreateExam from './Admin/AdminCreateExam'
import AdminViewExams from './Admin/AdminViewExams'
import DisplayViewExamDashboard from './Admin/DisplayViewExamDashboard'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    render() {
        return (
            <Router history={history}>
                <Fragment>
                    <Switch>
                        <Route exact path="/home" component={() => <Home />}></Route>
                        <Route exact path="/admin" component={() => <AdminDashboard />}></Route>
                        <Route exact path="/faculty" component={() => <FacultyDashboard />}></Route>
                        <Route exact path="/student" component={() => <StudentDashboard />}></Route>
                        <Route exact path="/admin/students" component={() => <AddStudents />}></Route>
                        <Route exact path="/admin/faculties" component={() => <AddFaculties />}></Route>
                        <Route exact path="/admin/admins" component={() => <AddAdmins />}></Route>
                        <Route exact path="/admin/display/admins" component={() => <DisplayAdmins />}></Route>
                        <Route exact path="/admin/display/faculties" component={() => <DisplayFaculties />}></Route>
                        <Route exact path="/admin/display/students" component={() => <DisplayStudents />}></Route>
                        {/* /admin/viewExam */}

                        <Route exact path="/admin/display/DisplayViewExamDashboard" component={() => <DisplayViewExamDashboard />}></Route>
                        <Route exact path="/admin/display/AdminHeaderExam" component={() => <DisplayViewExam />}></Route>
                        <Route exact path="/admin/display/AdminViewExams" component={() => <AdminViewExams />}></Route>
                        <Route exact path="/admin/create/AdminCreateExam" component={() => <AdminCreateExam />}></Route>

                        <Route exact path="/faculty/createExam" component={() => <FacultyCreateExam />}></Route>
                        <Route exact path="/faculty/viewExam" component={() => <FacultyViewExam />}></Route>
                        <Route exact path="/student/viewExam" component={() => <StudentViewExam />}></Route>
                        <Route exact path="/*" component={() => <Home />}></Route>
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}

export default Main;
