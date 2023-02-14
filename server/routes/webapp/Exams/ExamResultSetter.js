const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const forms = require("../../../DB/forms");
//const exampapers = require("../../../DB/ExamPapersSchema");
const app = express.Router();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
var db = mongoose.connection;

app.route("/").post((req, res) => {
  const UniqueExamName = req.body.UniqueExamName;
  const email = req.body.user;
  console.log(email, UniqueExamName, req.body.Result);

  let query = forms.findOneAndUpdate(
    {
      $and: [
        { email: email },
        {
          exam: { $elemMatch: { UniqueExamName: UniqueExamName } },
        },
      ],
    },
    {
      $set: {
        "exam.$.Result": req.body.Result,
      },
    },
    {
      upsert: true,
    }
  );

  query.exec((err, data) => {
    if (err) {
      res.status(500);
    } else {
      console.log(data);
      res.status(200).json({ data });
    }
  });
});
module.exports = app;
