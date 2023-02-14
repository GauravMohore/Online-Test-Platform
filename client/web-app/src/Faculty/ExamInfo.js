import React, { Component, Fragment } from "react";
import SideBar from "../New Components/SideBar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "./FacultyCSS.css";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import CreateExams from "./CreateExams";
const axios = require("axios");

var arr = [];
var demo = {
  // id: 1,
  ExamDescription: "",
  ExamDuration: "",
  Status: "Pending",
  SubjectName: "",
  UniqueExamName: "",
};

class ExamInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookie: "",
      exams: [],
      newexams: [],
      // id: 1,
      whichViewToShow: false,
    };
    this.pushdata = this.pushdata.bind(this);
    this.nextTab = this.nextTab.bind(this);
  }

  // async componentWillMount() {
  //   // console.log(document.cookie);
  //   let email = Cookies.get("email");

  //   let self = this;

  //   await axios
  //     .post("http://localhost:5000/viewExam", {
  //       user: email,
  //     })
  //     .then((Data) => {
  //       // console.log(Data);
  //       self.setState({
  //         exams: Data.data.exams[0].exam,
  //         id: Data.data.exams[0].exam.length + 1,
  //       });
  //       console.log(this.state.exams);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  nextTab = () => {
    this.pushdata(demo)
    this.setState({ whichViewToShow: true });
    // const { history } = this.props;
    // let email = Cookies.get("email");
    // var self = this.state.newexams;
    // console.log(this.state.whichViewToShow);
    // alert("success");

    // let reqBody = {
    //   user: email,
    //   exam: self,
    // };

    // axios
    //   .post("http://localhost:5000/examinfo", {
    //     reqBody,
    //   })
    //   .then((response) => {
    //     console.log(response);

    //     // history.push({
    //     //   pathname: "/dashboard/faculty/createExam",
    //     //   state: demo.UniqueExamName,
    //     // });
    //     this.setState({ whichViewToShow: true });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  pushdata = (demodata) => {
    console.log(demodata);
    // demo.id = this.state.id;
    demodata.UniqueExamName =
      demodata.SubjectName +
      "-" +
      (new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear()) +
      "-" +
      new Date().toLocaleTimeString();

    let dat = { ...demodata };
    arr.push(dat);

    console.log(arr);
    alert(JSON.stringify(arr));
    this.setState({ newexams: [...arr] });
    console.log(this.state.newexams);
  };

  render() {
    const optionValueCode = [
      {
        value: "1 hr",
        label: "1 hr",
      },
      {
        value: "2 hr",
        label: "2 hr",
      },
      {
        value: "3 hr",
        label: "3 hr",
      },
      {
        value: "4 hr",
        label: "4 hr",
      },
    ];

    const optionValue = [
      {
        value: "Pending",
        label: "Pending",
      },
      {
        value: "Completed",
        label: "Completed",
      },
      {
        value: "Enrolled",
        label: "Enrolled",
      },
      {
        value: "Enrolled Not Scheduled",
        label: "Enrolled Not Scheduled",
      },
    ];

    return !this.state.whichViewToShow ? (
      <>
        <div id="create-exam-form">
          <Divider sx={{ m: "2rem" }}>Fill the Exam details </Divider>

          <FormGroup>
            <Label for="examDescription">Exam Description</Label>
            <TextField
              required
              id="outlined-multiline-static"
              label="Enter Exam Description"
              name="examDescription"
              multiline
              rows={3}
              disabled={arr.length == 0 ? false : true}
              // defaultValue="Enter Question Text"
              // value={this.state.questionText}
              onChange={(e) => {
                demo.ExamDescription = e.target.value;

                // const questionText = e.target.value
                // this.setState({
                //     questionText: questionText,
                // })
                // console.log(this.state.questionText)
              }}
            />
            {/* <Input type="text" name="questionText" id="questionText" placeholder="Enter Question Text" required /> */}
          </FormGroup>
          <FormGroup className="FormGroupExam">
            <Label for="examDuration">Exam Duration</Label>
            <TextField
              required
              id="filled-select-currency"
              select
              label="Select Exam Duration"
              name="examDuration"
              // value={demo.isQuestionACode}
              disabled={arr.length == 0 ? false : true}
              onChange={(e) => {
                demo.ExamDuration = e.target.value;
                // console.log(demo.isQuestionACode)
                // const isQuestionACode = e.target.value
                // this.setState({
                //     isQuestionACode: isQuestionACode,
                // })
                // console.log(this.state.isQuestionACode)
              }}
              helperText="Please select the Exam Duration. "
              variant="filled"
            >
              {optionValueCode.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {/* <Input type="text" name="isQuestionACode" id="isQuestionACode" placeholder="Enter is Question a Code (True/False)" required /> */}
          </FormGroup>
          <FormGroup className="FormGroupExam">
            <Label for="status">Status</Label>
            <TextField
              required
              id="filled-select-currency"
              select
              label="Select Status"
              name="status"
              disabled={true}
              value={demo.Status}
              onChange={(e) => {
                demo.Status = e.target.value;
                // console.log(demo.isQuestionACode)
                // const isQuestionACode = e.target.value
                // this.setState({
                //     isQuestionACode: isQuestionACode,
                // })
                // console.log(this.state.isQuestionACode)
              }}
              helperText="Please select the Exam Duration. "
              variant="filled"
            >
              {optionValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {/* <Input type="text" name="isQuestionACode" id="isQuestionACode" placeholder="Enter is Question a Code (True/False)" required /> */}
          </FormGroup>
          <FormGroup className="FormGroupExam">
            <Label for="subjectName">Subject Name</Label>
            <TextField
              required
              id="outlined-multiline-static"
              label="Enter Subject Name"
              name="subjectName"
              disabled={arr.length == 0 ? false : true}
              placeholder="Java / Python "
              onChange={(e) => {
                demo.SubjectName = e.target.value;
              }}
            />
            {/* <Input type="text" name="questionCode" id="questionCode" placeholder="Enter Question Code" required /> */}
          </FormGroup>

          {/* <FormGroup id="examinfobtn">
            <Button
              color="success primary"
              onClick={() => this.pushdata(demo)}
              size="lg"
            >
              Save
            </Button> */}
          <center>
            <Button
              color="success primary"
              onClick={() => this.nextTab()}
              size="lg"
            >
              Next
            </Button>
          </center>
          {/* </FormGroup> */}
        </div>
      </>
    ) : (
      <>
        <CreateExams newExamData={this.state.newexams[0]} />
      </>
    );
  }
}

export default withRouter(ExamInfo);





// <FormGroup>
//   <Label for="UniqueId">Unique Exam Id</Label>
//   <TextField
//     required
//     name="UniqueId"
//     id="outlined-required"
//     label="ExamId"
//     value={this.state.id}
//     disabled
//   />
//   {/* <Input type="text" name="UniqueExamName" id="UniqueExamName" placeholder="Enter Unique Exam Name" required /> */}
// </FormGroup> 