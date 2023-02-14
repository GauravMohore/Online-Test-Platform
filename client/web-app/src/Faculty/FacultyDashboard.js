import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Jumbotron } from "reactstrap";
import { Link } from "react-router-dom";
import "../Student Side Styles/index.css";
import "../Student Side Styles/studentDashBoard.css";
import SideBar from "../New Components/SideBar";
import FeaturedInfo from "../New Components/FacultyfeaturedInfo/FeaturedInfo";
import Demo from "../New Components/Facultysearchbar/seachBarTable";
import LogoutIcon from "@mui/icons-material/Logout";
import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone';
import CreateIcon from "@mui/icons-material/Create";
import Cookies from "js-cookie";
import ExamInfo from "./ExamInfo";
import EditExam from './EditExam';

const axios = require("axios");
let myvar = 1;

class FacultytDashboard extends Component {
  constructor() {
    super();
    this.state = {
      whichViewToShow:
        JSON.parse(window.localStorage.getItem("persisted_state_faculty")) ||
        "",
      loader: false,
      editexams: [],
    };
    this.viewSetter = this.viewSetter.bind(this);
    this.viewGetter = this.viewGetter.bind(this);
    this.setLoadTheExam = this.setLoadTheExam.bind(this);
  }

  componentWillMount() {
    let config = {
      method: "get",
      url: "http://localhost:5000/viewExam/exampaper"
    };

    axios(config)
      .then((data) => {
        // console.log(data.data);
        this.setState({
          editexams: data.data,
          loader: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loader: false,
        });
      });
  }
  setLoadTheExam = (examToStart) => {
    this.setState({ loadTheExam: true, whichExamToStart: examToStart });
  };
  // componentDidMount() {
  //   // console.log(document.cookie);
  //   let email = Cookies.get("email");

  //   // this.setState({
  //   //   loader: true,
  //   // });

  //   let self = this;

  //   const data = {
  //     user: email,
  //   };

  //   let config = {
  //     method: "post",
  //     url: "http://localhost:5000/viewExam",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then((data) => {
  //       // console.log(data.data);
  //       self.setState({
  //         exams: data.data.exams[0].exam,
  //         loader: true,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       self.setState({
  //         loader: false,
  //       });
  //     });
  // }

  viewSetter(viewObtained) {
    this.setState({ whichViewToShow: viewObtained });
  }
  viewGetter(viewObtained) {
    window.localStorage.clear();
    window.localStorage.setItem(
      "persisted_state_faculty",
      JSON.stringify(this.state.whichViewToShow)
    );
    if (viewObtained === "") {
      return (
        <>
          {/* <FeaturedInfo exams={this.state.exams} />
          <SeachBarTable exams={this.state.exams} /> */}
          <FeaturedInfo />
          <Demo role="faculty" />

        </>
      );
    } else if (viewObtained === "Create Exams") {
      return (
        <>
          <ExamInfo />
        </>
      );
    } else if (viewObtained === "Log Out View") {
      window.localStorage.clear();
      this.props.history.push("/");
    } else if (viewObtained === "Edit Exam") {
      return (
        <>
          <EditExam
            setLoadTheExam={this.setLoadTheExam}
            exams={this.state.editexams}
          />
        </>
      )
    }
  }
  render() {
    const whichSideBarToShow = "faculty";
    const sideBarLinkArr = [
      {
        text: "Create Exam",
        Icon: CreateIcon,
        ViewToShow: "Create Exams",
      },
      { text: "Edit Exam", Icon: AutoFixHighTwoToneIcon, ViewToShow: "Edit Exam" },
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
              <BreadcrumbItem active> Faculty</BreadcrumbItem>
              <div className="ml-20">
                <h3>Faculty Dashboard</h3>
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

export default FacultytDashboard;
