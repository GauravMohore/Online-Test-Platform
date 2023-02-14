import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../Student Side Styles/index.css";
import "../Student Side Styles/studentDashBoard.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SideBar from "../New Components/SideBar";
import LogoutIcon from "@mui/icons-material/Logout";
import ArticleIcon from "@mui/icons-material/Article";
import FeaturedInfo from "../New Components/featuredInfo/FeaturedInfo";
import SeachBarTable from "../New Components/searchbar/seachBarTable";
import StudentViewExam from "./StudentViewExam";
import ExamPage from "../New Components/ExamPage";
import Cookies from "js-cookie";

const axios = require("axios");

class StudentDashboard extends Component {
  constructor() {
    super();
    this.state = {
      whichViewToShow:
        JSON.parse(window.localStorage.getItem("persisted_view_student")) || "",
      loadTheExam: false,
      whichExamToStart: "",
      loader: false,
      exams: [],
    };
    this.viewSetter = this.viewSetter.bind(this);
    this.viewGetter = this.viewGetter.bind(this);
    this.setLoadTheExam = this.setLoadTheExam.bind(this);

    // this.pushdata = this.pushdata.bind(this);
  }
  componentDidMount() {
    // console.log(document.cookie);
    let email = Cookies.get("email");

    // this.setState({
    //   loader: true,
    // });

    let self = this;

    const data = {
      user: email,
    };

    let config = {
      method: "post",
      url: "http://localhost:5000/viewExam",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((data) => {
        // console.log(data.data);
        self.setState({
          exams: data.data.exams[0].exam,
          loader: true,
        });
      })
      .catch((err) => {
        console.log(err);
        self.setState({
          loader: false,
        });
      });
  }

  viewSetter(viewObtained) {
    this.setState({ whichViewToShow: viewObtained });
  }

  viewGetter(viewObtained) {
    window.localStorage.setItem(
      "persisted_view_student",
      JSON.stringify(this.state.whichViewToShow)
    );
    if (viewObtained === "" || viewObtained === "DashBoard") {
      console.log(this.state.exams);
      return (
        <>
          <FeaturedInfo exams={this.state.exams} />
          <SeachBarTable exams={this.state.exams} />
        </>
      );
    } else if (viewObtained === "View All Exams") {
      return (
        <>
          <StudentViewExam
            setLoadTheExam={this.setLoadTheExam}
            exams={this.state.exams}
          />
        </>
      );
    } else if (viewObtained === "Log Out View") {
      window.localStorage.clear();
      this.props.history.push("/");
    }
  }

  setLoadTheExam = (examToStart) => {
    this.setState({ loadTheExam: true, whichExamToStart: examToStart });
  };

  render() {
    const whichSideBarToShow = "student";
    const sideBarLinkArr = [
      {
        text: "DashBoard",
        Icon: DashboardIcon,
        ViewToShow: "DashBoard"
      },
      {
        text: "View Exam",
        Icon: ArticleIcon,
        ViewToShow: "View All Exams",
      },

      { text: "Log Out", Icon: LogoutIcon, ViewToShow: "Log Out View" },
    ];
    return !this.state.loadTheExam ? (
      <>
        <div className="wrapper-student">
          <SideBar
            viewPage={whichSideBarToShow}
            sideBarLinkProps={sideBarLinkArr}
            viewSetter={this.viewSetter}
          />
          <div id="content-student">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link onClick={() => this.viewSetter("")}>
                  <i className="fa fa-home fa-sm"></i> Home
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active> Student</BreadcrumbItem>
              <div className="ml-20">
                <h3>Student Dashboard</h3>
              </div>
            </Breadcrumb>
            <hr />
            {this.state.loader && this.viewGetter(this.state.whichViewToShow)}
          </div>
        </div>
      </>
    ) : (
      <ExamPage UniqueExamName={this.state.whichExamToStart} />
    );
  }
}

export default StudentDashboard;
