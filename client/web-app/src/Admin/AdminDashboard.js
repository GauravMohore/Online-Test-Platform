import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
// import the css
import "../Student Side Styles/index.css";
import "../Student Side Styles/studentDashBoard.css";
// import the component
import SideBar from "../New Components/SideBar";
import FeaturedInfo from "../New Components/FacultyfeaturedInfo/FeaturedInfo";
import Demo from "../New Components/Facultysearchbar/seachBarTable";
import AddStudent from "./AddStudent"
import DisplayExam from "./DisplayExam"
// import regarding the icons
import LogoutIcon from "@mui/icons-material/Logout";
import StorageIcon from '@mui/icons-material/Storage';
import DisplayStudent from "./DisplayStudent"
import DisplayFaculty from "./DisplayFaculty"
import DisplayAdmin from "./DisplayAdmin"
import AssignExam from "./AssignExam"
import ArticleIcon from "@mui/icons-material/Article";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Cookies from "js-cookie";

const axios = require("axios");

class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      whichViewToShow:
        JSON.parse(window.localStorage.getItem("persisted_view_admin")) || "",
      loader: true,
      loadTheExam: false,
      exams: [],
    };
    this.viewSetter = this.viewSetter.bind(this);
    this.viewGetter = this.viewGetter.bind(this);
    this.setLoadTheExam = this.setLoadTheExam.bind(this);
  }
  componentWillMount() {
    // console.log(document.cookie);
    // let email = Cookies.get("email");
    // let email = "student@sharklasers.com";

    // this.setState({
    //   loader: true,
    // });

    // let self = this;

    // const data = {
    //   user: email,
    // };

    let config = {
      method: "get",
      url: "http://localhost:5000/viewExam/exampaper"
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // data: data,
    };

    axios(config)
      .then((data) => {
        // console.log(data.data);
        this.setState({
          exams: data.data,
          loader: true,
        });
      })
      .catch((err) => {
        console.log(err);
        // self.setState({
        //   loader: false,
        // });
      });
  }

  viewSetter(viewObtained) {
    this.setState({ whichViewToShow: viewObtained });
  }
  viewGetter(viewObtained) {
    window.localStorage.setItem(
      "persisted_view_admin",
      JSON.stringify(this.state.whichViewToShow)
    );
    if (viewObtained === "") {
      return (
        <>
          {/* <FeaturedInfo exams={this.state.exams} />
          <SeachBarTable exams={this.state.exams} /> */}
          <FeaturedInfo />
          <Demo role="admin" />
        </>
      );
    } else if (viewObtained === "Log Out View") {
      window.localStorage.clear();
      this.props.history.push("/");
    } else if (viewObtained === "Display Student") {
      return (
        <>
          <DisplayStudent />
        </>
      );
    } else if (viewObtained === "Display Faculty") {
      return (
        <>
          <DisplayFaculty />
        </>
      );
    } else if (viewObtained === "Display Admin") {
      return (
        <>
          <DisplayAdmin />
        </>
      );
    } else if (viewObtained === "View All Exams") {
      return (
        <>
          <DisplayExam
          />
        </>
      );
    } else if (viewObtained === "Add Student") {
      return (
        <>
          <AddStudent />
        </>
      );
    } else if (viewObtained === "Assign Exam") {
      return (
        <>
          <AssignExam
            setLoadTheExam={this.setLoadTheExam}
            exams={this.state.exams}
          />
        </>
      );
    }
  }
  setLoadTheExam = (examToStart) => {
    this.setState({ loadTheExam: true, whichExamToStart: examToStart });
  };
  render() {
    const whichSideBarToShow = "admin";
    const sideBarLinkArr = [
      { text: "Student DataBase", Icon: StorageIcon, ViewToShow: "Display Student" },
      { text: "Faculty DataBase", Icon: StorageIcon, ViewToShow: "Display Faculty" },
      { text: "Admin DataBase", Icon: StorageIcon, ViewToShow: "Display Admin" },
      { text: "Add Student", Icon: AddBoxIcon, ViewToShow: "Add Student" },
      { text: "View Exam", Icon: ArticleIcon, ViewToShow: "View All Exams" },
      { text: "Allocate Exam", Icon: AddBoxIcon, ViewToShow: "Assign Exam" },
      { text: "Log Out", Icon: LogoutIcon, ViewToShow: "Log Out View" },
    ];
    return (
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
              <BreadcrumbItem active> Admin</BreadcrumbItem>
              <div className="ml-20">
                <h3>Admin Dashboard</h3>
              </div>
            </Breadcrumb>
            <hr />

            {this.state.loader && this.viewGetter(this.state.whichViewToShow)}
          </div>
        </div>
      </>
    );
  }
}

export default AdminDashboard;
