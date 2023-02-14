import React, { Component, Fragment } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../Student Side Styles/index.css";
import GridMaker from "../New Components/gridMaker";
import SideBar from "../New Components/SideBar.js";
import ExamCardTemplate from "../New Components/ExamCardTemplate";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FacultySideBar from '../New Components/SideBar'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ExamPage from "../New Components/ExamPage";
const fs = require("fs");
const axios = require("axios");

class ViewExams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      cookie: "",
      exams: "",
    };
    // this.startExam = this.startExam.bind(this);
  }

  // startExam(url) {
  //     const remote = require('electron').remote;
  //     const BrowserWindow = remote.BrowserWindow;
  //     const win = new BrowserWindow({
  //       height: 600,
  //       width: 800,
  //       fullscreen : true,
  //       alwaysOnTop: true
  //     });
  //     win.loadURL(url);

  //     let constraintObj = {
  //         audio: true,
  //         video: true
  //     }
  //     navigator.mediaDevices.getUserMedia(constraintObj)
  //         .then(mediaStreamObj => {
  //             let mediaRecorder = new MediaRecorder(mediaStreamObj);
  //             let chunks = []
  //             mediaRecorder.start();
  //             mediaRecorder.ondataavailable = (ev) => {
  //                 chunks.push(ev.data);
  //             }
  //             console.log(chunks);
  //             win.on('closed', () => {
  //                 mediaRecorder.stop();
  //             })
  //             mediaRecorder.onstop = (ev) => {
  //                 let blob = new Blob(chunks, { 'type': 'video/webm' });
  //                 let reader = new FileReader();
  //                 reader.onload = () => {
  //                     let buffer = Buffer.from (reader.result);
  //                     let fileName = new Date();

  //                     fs.writeFile(fileName.toDateString()+".mp4", buffer, {}, (err, res) => {
  //                         if (err) {
  //                             console.log('error in saving')
  //                         }
  //                         else {
  //                             console.log('video saved')
  //                         }
  //                     })
  //                 }
  //                 reader.readAsArrayBuffer(blob);
  //                 chunks = [];
  //             }

  //         })

  // }

  componentDidMount() {
    // console.log(document.cookie);
    let email = Cookies.get("email");
    let role = Cookies.get("role");
    let orgId = Cookies.get("orgId");

    this.setState({
      cookie: {
        email: email,
        role: role,
        orgId: orgId,
        exams: "",
      },
    });

    this.setState({
      loader: true,
    });

    let self = this;

    axios
      .post("http://localhost:5000/viewExam", {
        user: email,
      })
      .then((Data) => {
        // console.log(Data);
        self.setState({
          loader: false,
          exams: Data.data.exams[0].exam,
        });
      })
      .catch((err) => {
        console.log(err);
        self.setState({
          loader: false,
        });
      });
  }

  render() {
    const theme = createTheme({
      typography: {
        fontFamily: "poppins,sans-serif",
      },
    });
    let examArr = Object.values(this.state.exams);

    const columns = [
      { field: "id", headerName: "Sr.no", width: 50 },
      { field: "subjectName", headerName: "Subject Name", width: 150 },
      { field: "examDate", headerName: "Exam Date", width: 150 },
      { field: "examDuration", headerName: "Exam Duration", width: 150 },
      { field: "examDescription", headerName: "Exam Description", width: 150 },
      { field: "formLink", headerName: "ExamLink", width: 150 },
      { field: "Status", headerName: "Status", width: 150 },
    ];

    // let showExams = [];
    // if (this.state.exams === "") {
    //   showExams.push(<p>Failed to fetch data.</p>);
    // } else if (this.state.exams.length === 0) {
    //   showExams.push(<p>No exam found!</p>);
    // } else {
    //   for (let i = 0; i < this.state.exams.length; i++) {
    //     let color = "info";
    //     if (i % 2) color = "danger";
    //     showExams.push(
    //       <Card body inverse color={color} style={{ margin: 10 }}>
    //         <CardText>
    //           Subject Name : {this.state.exams[i].subjectName}
    //         </CardText>
    //         <CardText>Exam Date : {this.state.exams[i].examDate}</CardText>
    //         <CardText>
    //           Exam Duration : {this.state.exams[i].examDuration}
    //         </CardText>
    //         <CardText>
    //           Exam Description : {this.state.exams[i].examDescription}
    //         </CardText>
    //         <CardText>
    //           Exam Link :{" "}
    //           <button
    //             onClick={() => this.startExam(this.state.exams[i].formLink)}
    //           >
    //             START EXAM
    //           </button>
    //         </CardText>
    //       </Card>
    //     );
    //   }
    // }
    return (
      <Fragment>
        <div className="wrapper-student">
          <FacultySideBar viewPage="faculty" />
          <div id="content-student">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/dashboard/faculty">
                  <i className="fa fa-home fa-sm"></i> Dashboard
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>All Exams</BreadcrumbItem>
            </Breadcrumb>
            <ClipLoader size={50} color={"#fff"} loading={this.state.loader} />

            {/* <GridMaker className="grid-style" rows={examArr} columns={columns} /> */}

            {examArr.length !== 0 ? (
              <div className="exam-cards-style">
                {examArr.map((eachexam) => (
                  <ExamCardTemplate eachexamdata={eachexam} />
                ))}
              </div>
            ) : (
              <>
                <Card
                  sx={{
                    bgcolor: "#7986cb",
                    boxShadow: 10,
                    width: 1 / 5,
                    mx: "auto",
                  }}
                  rasied="true"
                >
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography
                        align="center"
                        gutterBottom={true}
                        variant="h5"
                      >
                        No Exam Found.
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ViewExams;
