import React, { Component, Fragment } from "react";
import SideBar from "../New Components/SideBar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import QuizIcon from "@mui/icons-material/Quiz";
import { Button, FormGroup, Label } from "reactstrap";
import Divider from "@mui/material/Divider";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const axios = require("axios");
var arr = [];
var demo = {
  Creator: "",
  ExamDescription: "",
  ExamDuration: "",
  Status: "Pending",
  SubjectName: "",
  uniqueExamName: "",
  category: "",
  questionMark: "",
  questionCode: "",
  questionText: "",
  isQuestionACode: "",
  aanswerText: "",
  aisCorrect: true,
  banswerText: "",
  bisCorrect: true,
  canswerText: "",
  cisCorrect: true,
  danswerText: "",
  disCorrect: true,
  isAnswerACode: "",
};

class CreateExam extends Component {
  constructor() {
    super();
    this.state = {
      cookie: "",
      arrdata: [],
      uniqueExamName: "random",
      ExamDescription: "",
      ExamDuration: "",
      Status: "Pending",
      SubjectName: "",
      ansSize: false,
      showQustions: false,
    };
    this.createExam = this.createExam.bind(this);
    this.pushdata = this.pushdata.bind(this);
  }

  componentWillMount() {
    //const { location } = this.props;
    this.state.uniqueExamName = this.props.newExamData.UniqueExamName;
    this.state.ExamDescription = this.props.newExamData.ExamDescription;
    this.state.ExamDuration = this.props.newExamData.ExamDuration;
    this.state.SubjectName = this.props.newExamData.SubjectName;
    this.state.Status = this.props.newExamData.Status;
    // this.state.id = this.props.newExamData.id;
  }

  componentDidMount() {
    let email = Cookies.get("email");
    let role = Cookies.get("role");
    let orgId = Cookies.get("orgId");

    this.setState({
      cookie: {
        email: email,
        role: role,
        orgId: orgId,
      },
    });
  }

  createExam = () => {
    var self = this.state.arrdata;
    // for (let i = 0; i < self.length; i++) {
    //     if (
    //         self[i].uniqueExamName == "" ||
    //         self[i].questionCode == "" ||
    //         self[i].questionText == "" ||
    //         self[i].isQuestionACode == "" ||
    //         self[i].aanswerText == "" ||
    //         self[i].banswerText == "" ||
    //         self[i].canswerText == "" ||
    //         self[i].danswerText == "" ||
    //         self[i].aisCorrect == "" ||
    //         self[i].bisCorrect == "" ||
    //         self[i].cisCorrect == "" ||
    //         self[i].disCorrect == "" ||
    //         self[i].isAnswerACode == ""
    //     ) {
    //         alert("Please enter the exam data correctly !");
    //     }
    // }

    let reqBody = self;

    axios
      .post("http://localhost:5000/createExam", {
        reqBody,
      })
      .then(function (response) {
        console.log(response);
        alert("success");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  pushdata = (demodata) => {
    console.log(demodata);
    demodata.uniqueExamName = this.state.uniqueExamName;
    demo.ExamDescription = this.state.ExamDescription
    demo.ExamDuration = this.state.ExamDuration
    demo.SubjectName = this.state.SubjectName
    demo.Status = this.state.Status
    demo.Creator = this.state.cookie.email
    // demo.id = this.state.id
    let dat = { ...demodata };
    arr.push(dat);

    console.log(arr);

    this.setState({
      arrdata: [...arr],
    });
    console.log(this.state.arrdata);
  };

  render() {
    const questionMarkValue = [
      {
        value: "1",
        label: "1 Marks",
      },
      {
        value: "2",
        label: "2 Marks",
      },
      {
        value: "5",
        label: "5 Marks",
      },
      {
        value: "10",
        label: "10 Marks",
      },
    ];
    const optionValueCode = [
      {
        value: "False",
        label: "False",
      },
      {
        value: "Python",
        label: "Python",
      },
      {
        value: "Java",
        label: "Java",
      },
      {
        value: "C++",
        label: "C++",
      },
    ];

    const optionValue = [
      {
        value: true,
        label: "True",
      },
      {
        value: false,
        label: "False",
      },
    ];

    let questions = [];

    const CustomWidthTooltip = styled(({ className, ...props }) => (
      <Tooltip {...props} classes={{ popper: className }} />
    ))({
      [`& .${tooltipClasses.tooltip}`]: {
        display: "flex",
        flexDirection: "row",
        maxWidth: "none",
        minHeight: "100px",
        color: "#FFF",
        backgroundColor: "#FF6FB5",
      },
    });

    for (var i = 0; i < arr.length; i++) {
      questions.push(
        <CustomWidthTooltip title={JSON.stringify(arr[i])}>
          <IconButton aria-label="add to shopping cart" arrow>
            <QuizIcon sx={{ color: "#FF6FB5" }} />
          </IconButton>
        </CustomWidthTooltip>
      );
    }

    return (
      <div id="create-exam-form">
        <FormGroup>
          <Label
            for="currentNumberQuestion"
            style={{ paddingRight: "2rem", paddingBottom: "1rem" }}
          >
            Curent Question Added
          </Label>
          <Stack direction="row" id="stack_change">
            {questions}
          </Stack>
        </FormGroup>

        <FormGroup>
          <Label for="UniqueExamName">Unique Exam Name</Label>
          <TextField
            required
            name="UniqueExamName"
            id="outlined-required"
            label="Auto-Generated Unique Exam Name"
            value={this.state.uniqueExamName}
            disabled
            // onChange={(e) => {
            //     demo.uniqueExamName = e.target.value

            //     // const uniqueExamName = e.target.value

            //     // this.setState({
            //     //     uniqueExamName: uniqueExamName,
            //     // })
            // }}
          />
          {/* <Input type="text" name="UniqueExamName" id="UniqueExamName" placeholder="Enter Unique Exam Name" required /> */}
        </FormGroup>
        <Divider sx={{ m: "2rem" }}>
          Fill the below detail for the particular question
        </Divider>
        <FormGroup>
          <Label for="category">Question Category</Label>
          <TextField
            required
            name="category"
            id="outlined-required"
            label="Enter Question Category"
            onChange={(e) => {
              demo.category = e.target.value;
              // const questionCode = e.target.value
              // this.setState({
              //     questionCode: questionCode,
              // })
              // console.log(this.state.questionCode)
            }}
          />

          {/* <Input type="text" name="UniqueExamName" id="UniqueExamName" placeholder="Enter Unique Exam Name" required /> */}
        </FormGroup>
        <FormGroup>
          <Label for="questionMark">Question Mark</Label>
          <TextField
            required
            id="filled-select-currency"
            select
            label="Select"
            name="questionMark"
            // value={demo.isQuestionACode}
            onChange={(e) => {
              demo.questionMark = e.target.value;
              // const questionCode = e.target.value
              // this.setState({
              //     questionCode: questionCode,
              // })
              // console.log(this.state.questionCode)
            }}
            helperText="Please select Question Marks"
            variant="filled"
          >
            {questionMarkValue.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {/* <Input type="text" name="UniqueExamName" id="UniqueExamName" placeholder="Enter Unique Exam Name" required /> */}
        </FormGroup>
        <FormGroup>
          <Label for="questionCode">Question Code</Label>
          <TextField
            required
            id="outlined-multiline-static"
            label="Enter Question Code"
            name="questionCode"
            multiline
            rows={4}
            // defaultValue="Enter Question Code"
            // value={this.state.questionCode}
            onChange={(e) => {
              demo.questionCode = e.target.value;
              // const questionCode = e.target.value
              // this.setState({
              //     questionCode: questionCode,
              // })
              // console.log(this.state.questionCode)
            }}
          />
          {/* <Input type="text" name="questionCode" id="questionCode" placeholder="Enter Question Code" required /> */}
        </FormGroup>
        <FormGroup>
          <Label for="questionText">Question Text</Label>
          <TextField
            required
            id="outlined-multiline-static"
            label="Question Text"
            name="questionText"
            multiline
            rows={4}
            // defaultValue="Enter Question Text"
            // value={this.state.questionText}
            onChange={(e) => {
              demo.questionText = e.target.value;

              // const questionText = e.target.value
              // this.setState({
              //     questionText: questionText,
              // })
              // console.log(this.state.questionText)
            }}
          />
          {/* <Input type="text" name="questionText" id="questionText" placeholder="Enter Question Text" required /> */}
        </FormGroup>
        <FormGroup>
          <Label for="isQuestionACode">Question is a Code</Label>
          <TextField
            required
            id="filled-select-currency"
            select
            label="Select"
            name="isQuestionACode"
            // value={demo.isQuestionACode}
            onChange={(e) => {
              demo.isQuestionACode = e.target.value;
              // console.log(demo.isQuestionACode)
              // const isQuestionACode = e.target.value
              // this.setState({
              //     isQuestionACode: isQuestionACode,
              // })
              // console.log(this.state.isQuestionACode)
            }}
            helperText="Please select if Question a Code (True/False)"
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

        <Divider sx={{ m: "2rem" }}>
          Fill the below options for the particular question
        </Divider>

        <FormGroup>
          <Label for="isAnswerACode">Is Answer a Code</Label>
          <TextField
            required
            id="filled-select-currency"
            select
            label="Select"
            name="isAnswerACode"
            // value={demo.isAnswerACode}
            onChange={(e) => {
              demo.isAnswerACode = e.target.value;
              if (
                e.target.value == "Python" ||
                e.target.value == "Java" ||
                e.target.value == "C++"
              ) {
                this.setState({
                  ansSize: true,
                });
              } else {
                this.setState({
                  ansSize: false,
                });
              }
              // console.log(demo.isAnswerACode)
              // const isAnswerACode = e.target.value
              // this.setState({
              //     isAnswerACode: isAnswerACode,
              // })
              // console.log(this.state.isAnswerACode)
            }}
            helperText="Please select option (Code Language/False)"
            variant="filled"
          >
            {optionValueCode.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {/* <Input type="text" name="disCorrect" id="disCorrect" placeholder="Enter option D is Correct (True/False)" /> */}
        </FormGroup>

        <FormGroup>
          <Label for="aanswerText">AnswerText</Label>
          <TextField
            required
            name="aanswerText"
            //id="outlined-required"
            id={
              this.state.ansSize
                ? "outlined-multiline-static"
                : "outlined-required"
            }
            label="Enter Option A Text"
            multiline={this.state.ansSize ? true : false}
            rows={this.state.ansSize ? 3 : 0}
            onChange={(e) => {
              demo.aanswerText = e.target.value;
              // const aanswerText = e.target.value
              // console.log(aanswerText)
              // this.setState({
              //     aanswerText: aanswerText,
              // })
            }}
          />
          {/* <Input type="text" name="aanswerText" id="aanswerText" placeholder="Enter Option A Text" /> */}
        </FormGroup>
        <FormGroup>
          <Label for="aisCorrect">isCorrect(Option)</Label>
          <TextField
            required
            id="filled-select-currency"
            select
            label="Select"
            name="aisCorrect"
            // value={demo.aisCorrect}
            onChange={(e) => {
              demo.aisCorrect = e.target.value;
              // console.log(demo.aisCorrect)
              // const aisCorrect = e.target.value
              // this.setState({
              //     aisCorrect: aisCorrect,
              // })
              // console.log(this.state.aisCorrect)
            }}
            helperText="Please select option A is Correct (True/False)"
            variant="filled"
          >
            {optionValue.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {/* <Input type="text" name="aisCorrect" id="aisCorrect" placeholder="Enter option A is Correct (True/False)" /> */}
        </FormGroup>
        <FormGroup>
          <Label for="banswerText">AnswerText</Label>
          <TextField
            required
            name="banswerText"
            //id="outlined-required"
            id={
              this.state.ansSize
                ? "outlined-multiline-static"
                : "outlined-required"
            }
            label="Enter Option B Text"
            multiline={this.state.ansSize ? true : false}
            rows={this.state.ansSize ? 3 : 0}
            onChange={(e) => {
              demo.banswerText = e.target.value;
              // const banswerText = e.target.value
              // console.log(banswerText)
              // this.setState({
              //     banswerText: banswerText,
              // })
            }}
          />
          {/* <Input type="text" name="banswerText" id="banswerText" placeholder="Enter Option B Text" /> */}
        </FormGroup>
        <FormGroup>
          <Label for="bisCorrect">isCorrect(Option)</Label>
          <TextField
            required
            id="filled-select-currency"
            select
            label="Select"
            name="bisCorrect"
            // value={demo.bisCorrect}
            onChange={(e) => {
              demo.bisCorrect = e.target.value;
              // console.log(demo.bisCorrect)
              // const bisCorrect = e.target.value
              // this.setState({
              //     bisCorrect: bisCorrect,
              // })
              // console.log(this.state.bisCorrect)
            }}
            helperText="Please select option B is Correct (True/False)"
            variant="filled"
          >
            {optionValue.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {/* <Input type="text" name="bisCorrect" id="bisCorrect" placeholder="Enter option B is Correct (True/False)" /> */}
        </FormGroup>
        <FormGroup>
          <Label for="canswerText">AnswerText</Label>
          <TextField
            required
            name="canswerText"
            //id="outlined-required"
            id={
              this.state.ansSize
                ? "outlined-multiline-static"
                : "outlined-required"
            }
            label="Enter Option C Text"
            multiline={this.state.ansSize ? true : false}
            rows={this.state.ansSize ? 3 : 0}
            onChange={(e) => {
              demo.canswerText = e.target.value;
              // const canswerText = e.target.value
              // console.log(canswerText)
              // this.setState({
              //     canswerText: canswerText,
              // })
            }}
          />
          {/* <Input type="text" name="canswerText" id="canswerText" placeholder="Enter Option C Text" /> */}
        </FormGroup>
        <FormGroup>
          <Label for="cisCorrect">isCorrect(Option)</Label>
          <TextField
            required
            id="filled-select-currency"
            select
            label="Select"
            name="cisCorrect"
            // value={demo.cisCorrect}
            onChange={(e) => {
              demo.cisCorrect = e.target.value;
              // console.log(demo.cisCorrect)
              // const cisCorrect = e.target.value
              // this.setState({
              //     cisCorrect: cisCorrect,
              // })
              // console.log(this.state.cisCorrect)
            }}
            helperText="Please select option C is Correct (True/False)"
            variant="filled"
          >
            {optionValue.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {/* <Input type="text" name="cisCorrect" id="cisCorrect" placeholder="Enter option C is Correct (True/False)" /> */}
        </FormGroup>
        <FormGroup>
          <Label for="danswerText">AnswerText</Label>
          <TextField
            required
            name="danswerText"
            //id="outlined-required"
            id={
              this.state.ansSize
                ? "outlined-multiline-static"
                : "outlined-required"
            }
            label="Enter Option D Text"
            multiline={this.state.ansSize ? true : false}
            rows={this.state.ansSize ? 3 : 0}
            onChange={(e) => {
              demo.danswerText = e.target.value;
              // const danswerText = e.target.value
              // console.log(danswerText)
              // this.setState({
              //     danswerText: danswerText,
              // })
            }}
          />
          {/* <Input type="text" name="danswerText" id="danswerText" placeholder="Enter Option D Text" /> */}
        </FormGroup>
        <FormGroup>
          <Label for="disCorrect">isCorrect(Option)</Label>
          <TextField
            required
            id="filled-select-currency"
            select
            label="Select"
            name="disCorrect"
            // value={demo.disCorrect}
            onChange={(e) => {
              demo.disCorrect = e.target.value;
              // console.log(demo.disCorrect)

              // const disCorrect = e.target.value
              // this.setState({
              //     disCorrect: disCorrect,
              // })
              // console.log(this.state.disCorrect)
            }}
            helperText="Please select option D is Correct (True/False)"
            variant="filled"
          >
            {optionValue.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {/* <Input type="text" name="disCorrect" id="disCorrect" placeholder="Enter option D is Correct (True/False)" /> */}
        </FormGroup>

        <FormGroup>
          <Button
            color="success primary"
            onClick={() => this.pushdata(demo)}
            size="lg"
          >
            Add Question
          </Button>
          <Button
            color="success primary"
            onClick={() => this.createExam()}
            size="lg"
          >
            Create Exam
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default withRouter(CreateExam);
