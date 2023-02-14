const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");
const connectDB = require("./DB/connections");
connectDB();
const details = require("./DB/schema");
const registerRouter = require("./routes/webapp/register");
const addUsersRouter = require("./routes/webapp/AddUser/addUsers");
const getUsersRouter = require("./routes/webapp/GetUser/getUsers");
const getOrgId = require("./routes/webapp/GetOrdId/getOrgId");
const createExam = require("./routes/webapp/Exams/createExam");
const viewExam = require("./routes/webapp/Exams/viewExam");
const ExamQuesGetter = require("./routes/webapp/Exams/ExamQuesGetter");
const ExamResultSetter = require("./routes/webapp/Exams/ExamResultSetter");
const examinfo = require("./routes/webapp/Exams/examinfo");
const edit = require("./routes/webapp/Exams/edit");
let uri = process.env.uri;
let port = process.env.port;

app.use(
  cors({
    origin: "http://localhost:3000",
    // credentials: true
  })
);

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", registerRouter);
app.use("/signin", registerRouter);
app.use("/addUser", addUsersRouter);
app.use("/getUsers", getUsersRouter);
app.use("/getOrgId", getOrgId);
app.use("/createExam", createExam);
app.use("/viewExam", viewExam);
app.use("/ExamQuesGetter", ExamQuesGetter);
app.use("/ExamResultSetter", ExamResultSetter);
app.use("/examinfo", examinfo);
app.use("/edit", edit);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => console.log("Example app listening on port ", port));
