import React, { Component } from "react";
import Cookies from "js-cookie";
import "../Student Side Styles/index.css";
import ExamCardTemplate from "../New Components/ExamCardTemplate";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const fs = require("fs");
const axios = require("axios");

class StudentViewExams extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const theme = createTheme({
      typography: {
        fontFamily: "poppins,sans-serif",
      },
    });
    let examArr = Object.values(this.props.exams);

    return (
      <>
        {examArr.length !== 0 ? (
          <div className="exam-cards-style">
            {examArr.map((eachexam, index) => (
              <ExamCardTemplate
                key={index}
                eachexamdata={eachexam}
                setLoadTheExam={this.props.setLoadTheExam}
                role="student"
              />
            ))}
          </div>
        ) : (
          <>
            <Card
              sx={{
                boxShadow: 10,
                width: 1 / 5,
                mx: "auto",
              }}
              raised={true}
            >
              <CardContent>
                <ThemeProvider theme={theme}>
                  <Typography align="center" gutterBottom={true} variant="h5">
                    No Exam Found.
                  </Typography>
                </ThemeProvider>
              </CardContent>
            </Card>
          </>
        )}
      </>
    );
  }
}

export default StudentViewExams;

{
  /* <Fragment>
  <div className="wrapper-student">
    <SideBar viewPage="student" />
    <div id="content-student">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/dashboard/student">
            <i className="fa fa-home fa-sm"></i> Dashboard
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>All Exams</BreadcrumbItem>
      </Breadcrumb>
      <ClipLoader size={50} color={"#fff"} loading={this.state.loader} />
    </div>
  </div>
</Fragment>;  */
}
