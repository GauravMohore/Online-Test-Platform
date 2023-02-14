import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WatchLaterSharpIcon from "@mui/icons-material/WatchLaterSharp";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ExamProcessTracker from "./ExamProcessTracker";
import Cookies from "js-cookie";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditExamProcess from "../Faculty/EditExamProcess"

const axios = require("axios");
let DueDateFromDB = null;

export default function ExamCardTemplate(props) {

  const [Status, setStatus] = useState(props.eachexamdata.Status);
  const [dialog, setDialog] = useState(false);
  // const [editdialog, setEditDialog] = useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [student, setStudent] = useState([]);
  const [backdropcontrolEnroll, setBackDropControlEnroll] = useState(false);
  const [scheduleDateValue, setScheduleDateValue] = useState(null);
  const generating = async () => {
    await axios
      .get("http://localhost:5000/getUsers/students")
      .then((studentsData) => {
        console.log(
          "inside axois student data in ExamcardTemplate.js datagrid"
        );
        setStudent(studentsData.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStart = () => {
    // history.push("/LoadExam");
    window.localStorage.clear();
    props.setLoadTheExam(props.eachexamdata.UniqueExamName);
  };
  const handleAssign = () => {
    generating();
    setDialog(!dialog);
  };
  // const handleEdit = () => {
  //   setEditDialog(!editdialog);
  // };

  const handleSchedule = async () => {
    console.log("schedule done");
    let email = Cookies.get("email");

    let req = {
      user: email,
      UniqueExamName: props.eachexamdata.UniqueExamName,
    };
    await axios
      .post("http://localhost:5000/viewExam/fetchDueDate", {
        req,
      })
      .then((response) => {
        DueDateFromDB = response.data.exams.exam[0].ExamDueDate;

        DueDateFromDB = new Date(DueDateFromDB);
      })
      .catch(function (error) {
        console.log(error);
      });
    handleBackDropEnrollToggle();
  };

  const handleEnroll = () => {
    let email = Cookies.get("email");
    let todayDate = new Date(
      new Date().setDate(new Date().getDate() + 15)
    ).toLocaleString();

    // todayDate =
    //   todayDate.getDate() +
    //   "/" +
    //   (todayDate.getMonth() + 1) +
    //   "/" +
    //   todayDate.getFullYear();

    let req = {
      user: email,
      UniqueExamName: props.eachexamdata.UniqueExamName,
      ExamDueDate: todayDate,
      Status: "Enrolled Not Scheduled",
    };

    axios
      .post("http://localhost:5000/viewExam/updateStatus", {
        req,
      })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    handleBackDropEnrollToggle();

    //setStatus("Enrolled Not Scheduled");
  };
  const handleBackDropEnrollClose = () => {
    setBackDropControlEnroll(false);
    window.location.reload();
  };
  const handleBackDropEnrollToggle = () => {
    setBackDropControlEnroll(!backdropcontrolEnroll);
  };

  const ProcessTrackerEvaluator = () => {
    switch (Status) {
      case "Pending":
        return (
          <>
            <ExamProcessTracker onWhichStep={0} currentStatus={Status} />
          </>
        );
      case "Enrolled Not Scheduled":
        return (
          <>
            <ExamProcessTracker onWhichStep={1} currentStatus={Status} />
          </>
        );
      case "Scheduled":
        return (
          <>
            <ExamProcessTracker onWhichStep={1} currentStatus={Status} />
          </>
        );
      case "Completed":
        return (
          <>
            <ExamProcessTracker onWhichStep={4} currentStatus={Status} />
          </>
        );
    }
  };
  const handleClose = () => {
    setDialog(!dialog);
  };
  // const handleeditClose = () => {
  //   setEditDialog(!editdialog);
  // };
  const handleSend = () => {
    console.log(props.eachexamdata);
    if (selectedRows.length == 0) {
      alert("none selected");
    } else {
      alert(JSON.stringify(selectedRows, null, 4));
      sendingdata();
      handleClose();
    }
  };

  const sendingdata = async () => {
    let datafile = {
      paperData: props.eachexamdata,
      assignedUser: selectedRows,
    };
    axios
      .post("http://localhost:5000/examinfo", { datafile })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const adminbutton = () => {
    return (
      <>
        <Fab variant="extended" size="small" onClick={handleAssign}>
          <PlayCircleFilledWhiteIcon sx={{ mr: 1 }} />
          Assign Students
        </Fab>
        <Dialog
          open={dialog}
          keepMounted
          onClose={handleClose}
          maxWidth="xl"
          scroll="paper"
        >
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              checkboxSelection
              columns={[
                {
                  field: "_id",
                  headerName: "Id",
                  headerAlign: "center",
                  type: "number",
                  width: 260,
                },
                {
                  field: "email",
                  headerName: "Email",
                  headerAlign: "center",
                  type: "string",
                  width: 260,
                },
                {
                  field: "role",
                  headerName: "Role",
                  headerAlign: "center",
                  type: "string",
                  width: 160,
                },
                {
                  field: "orgId",
                  headerName: "Organization ID",
                  headerAlign: "center",
                  type: "string",
                  width: 260,
                },
              ]}
              rows={student}
              getRowId={(row) => row._id}
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRows = student.filter((row) =>
                  selectedIDs.has(row._id)
                );

                setSelectedRows(selectedRows);
              }}
            />
            {/* <pre style={{ fontSize: 10 }}>
              {JSON.stringify(selectedRows, null, 4)}
            </pre> */}
          </div>
          <div id="dialogbtnstyle">
            <DialogActions>
              <Button onClick={handleSend}>Assign</Button>
            </DialogActions>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </div>
        </Dialog>
      </>
    );
  };
  const dateDisabler = (datesFromCalendar) => {
    if (datesFromCalendar > DueDateFromDB) {
      return true;
    }
  };
  const handleScheduleOfExam = () => {
    let email = Cookies.get("email");
    console.log(scheduleDateValue);
    let req = {
      user: email,
      UniqueExamName: props.eachexamdata.UniqueExamName,
      ExamScheduledDate: scheduleDateValue.toLocaleString(),
      Status: "Scheduled",
    };

    axios
      .post("http://localhost:5000/viewExam/updateStatusForSchedule", {
        req,
      })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    //handleBackDropEnrollToggle();
    window.location.reload();
  };

  const statusScheduleResolveButton = () => {
    let ScheduleDateFromDB = null;
    let todayDate = new Date();
    todayDate = new Date(
      Date.UTC(
        todayDate.getUTCFullYear(),
        todayDate.getUTCMonth(),
        todayDate.getUTCDate()
      )
    );

    ScheduleDateFromDB = new Date(props.eachexamdata.ExamScheduledDate);

    ScheduleDateFromDB = new Date(
      Date.UTC(
        ScheduleDateFromDB.getUTCFullYear(),
        ScheduleDateFromDB.getUTCMonth(),
        ScheduleDateFromDB.getUTCDate()
      )
    );

    if (todayDate.getTime() == ScheduleDateFromDB.getTime()) {
      //return console.log("yes the dates are same");
      return (
        <Fab variant="extended" size="small" onClick={() => handleStart()}>
          <PlayCircleFilledWhiteIcon sx={{ mr: 1 }} />
          Start
        </Fab>
      );
    } else if (todayDate.getTime() < ScheduleDateFromDB.getTime()) {
      //return console.log("NO dates are not same.");
      return (
        <Fab variant="extended" size="small" disabled={true}>
          <PlayCircleFilledWhiteIcon sx={{ mr: 1 }} />
          Start
        </Fab>
      );
    }
  };

  const whichButtonToShow = () => {
    if (Status === "Enrolled Not Scheduled") {
      return (
        <>
          <Fab variant="extended" size="small" onClick={() => handleStart()}>
            <PlayCircleFilledWhiteIcon sx={{ mr: 1 }} />
            Start
          </Fab>
          <Fab variant="extended" size="small" onClick={handleSchedule}>
            <WatchLaterSharpIcon sx={{ mr: 1 }} />
            Schedule
          </Fab>
          <Dialog
            open={backdropcontrolEnroll}
            onClose={handleBackDropEnrollClose}
          >
            <DialogTitle>Schedule</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ mb: "1rem" }}>
                Please enter the date you would want to schedule the exam on.
              </DialogContentText>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Schedule Exam"
                  value={scheduleDateValue}
                  shouldDisableDate={dateDisabler}
                  disablePast
                  onChange={(newValue) => {
                    setScheduleDateValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField id="toStyleDate" {...params} />
                  )}
                />
              </LocalizationProvider>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleScheduleOfExam}>Schedule Now</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    } else if (Status === "Pending") {
      return (
        <>
          <Fab variant="extended" size="small" onClick={handleEnroll}>
            <AddCircleIcon sx={{ mr: 1 }} />
            Enroll
          </Fab>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdropcontrolEnroll}
            onClick={handleBackDropEnrollClose}
          >
            <Alert
              onClose={() => {
                window.location.reload();
              }}
            >
              <AlertTitle>Yay! you enrolled for the exam</AlertTitle>
              You now have 15 days to complete the exam, or you can schedule it.
            </Alert>
          </Backdrop>
        </>
      );
    } else if (Status === "Scheduled") {
      return statusScheduleResolveButton();
    }
  };

  const editbutton = () => {

    return (
      <>
        <Fab variant="extended" size="small" onClick={() => props.loadEdit(props.eachexamdata)}>
          <ModeEditOutlineIcon sx={{ mr: 1 }} />
          Edit Exam
        </Fab>
        {/* {
          editdialog ?
            history.push("/editExamProcess")
            // <EditExamProcess />

            :
            <div></div>
        } */}


        {/* <Dialog
          open={editdialog}
          keepMounted
          onClose={handleeditClose}
          maxWidth="xl"
          scroll="paper"
        >
          <div style={{ height: 600, width: 600 }}>
            <h1>comming soon</h1>
          </div>
          <div id="dialogbtnstyle">
            <DialogActions>
              <Button onClick={handleSend}>Save</Button>
            </DialogActions>
            <DialogActions>
              <Button onClick={handleeditClose}>Close</Button>
            </DialogActions>
          </div>
        </Dialog> */}
      </>
    );
  }




  const theme = createTheme({
    typography: {
      fontFamily: "poppins,sans-serif",
    },
  });





  return (
    <>

      <ThemeProvider theme={theme}>

        <Card
          sx={{
            height: "auto",
            width: "70%",
            mr: "8%",
            mt: "3%",
            display: "inline-block",
          }}
          raised={true}
        >

          <CardContent>
            <Typography gutterBottom={true} variant="h5" component="div">
              {props.eachexamdata.SubjectName}
            </Typography>
            <Divider light={false} />
            <Typography variant="body2" color="text.secondary">
              <Typography variant="subtitle1">
                Description: {props.eachexamdata.ExamDescription}
              </Typography>
              {props.eachexamdata.ExamDueDate && (
                <>
                  <Divider variant="middle" children="xx" light={false} />
                  <Typography variant="subtitle1">
                    Due Date:
                    {new Date(props.eachexamdata.ExamDueDate).getDate() +
                      "/" +
                      (new Date(props.eachexamdata.ExamDueDate).getMonth() + 1) +
                      "/" +
                      new Date(props.eachexamdata.ExamDueDate).getFullYear()}
                  </Typography>
                </>
              )}
              {props.eachexamdata.ExamScheduledDate && (
                <>
                  <Divider variant="middle" children="xx" light={false} />
                  <Typography variant="subtitle1">
                    Scheduled Date:
                    {new Date(props.eachexamdata.ExamScheduledDate).getDate() +
                      "/" +
                      (new Date(props.eachexamdata.ExamScheduledDate).getMonth() +
                        1) +
                      "/" +
                      new Date(
                        props.eachexamdata.ExamScheduledDate
                      ).getFullYear()}
                  </Typography>
                </>
              )}

              <Divider variant="middle" children="xx" light={false} />
              <Typography variant="subtitle1">
                Duration: {props.eachexamdata.ExamDuration}
              </Typography>
            </Typography>
            {props.role === "admin" ? (
              <div></div>
            ) : (
              (props.role === "faculty") ?
                <div></div>
                :
                <div>{ProcessTrackerEvaluator()}</div>

            )}
          </CardContent>
          {props.role === "admin" ? (
            <CardActions>{adminbutton()}</CardActions>
          ) : (
            (props.role === "faculty") ?
              <CardActions>{editbutton()}</CardActions>
              :
              <CardActions>{whichButtonToShow()}</CardActions>
          )}
        </Card>
      </ThemeProvider>

    </>
  );
}
