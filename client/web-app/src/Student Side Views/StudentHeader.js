import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import SideBar from "../New Components/SideBar.js";

export default function StudentHeader(props) {
  return (
    <Fragment>
      {/* <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Student Dashboard</h3>
                </div>
                <ul className="list-unstyled components">
                    <li><Link to="/dashboard/student/viewExam">View Exams</Link></li>
                    <li><Link to="/studentlogin">Logout</Link></li>
                </ul>
            </nav> */}
      <SideBar />
    </Fragment>
  );
}
