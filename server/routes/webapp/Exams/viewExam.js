const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const forms = require("../../../DB/forms");
const exampapers = require("../../../DB/ExamPapersSchema");
const path = require("path");
const generator = require("generate-password");
const app = express.Router();

app.use(bodyParser.json());

app.route("/").post((req, res) => {
  let user = req.body.user;
  //console.log(user);
  let query = forms.find({ email: user });
  query.exec((err, data) => {
    if (err) {
      res.status(500);
    } else {
      //console.log(data);
      res.status(200).json({ exams: data });
    }
  });
});

app.route("/exampaper").get((req, res) => {
  exampapers.find({}, (err, data) => {
    if (err) {
      res.status(500);
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  });
});

app.route("/updateStatus").post((req, res) => {
  //let user = req.body.req.user;

  let query = forms.findOneAndUpdate(
    {
      $and: [
        { email: req.body.req.user },
        {
          exam: { $elemMatch: { UniqueExamName: req.body.req.UniqueExamName } },
        },
      ],
    },
    {
      $set: {
        "exam.$.ExamDueDate": req.body.req.ExamDueDate,
        "exam.$.Status": req.body.req.Status,
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
      res.status(200).json({ exams: data });
    }
  });
});

app.route("/updateStatusForSchedule").post((req, res) => {
  //let user = req.body.req.user;

  let query = forms.findOneAndUpdate(
    {
      $and: [
        { email: req.body.req.user },
        {
          exam: { $elemMatch: { UniqueExamName: req.body.req.UniqueExamName } },
        },
      ],
    },
    {
      $set: {
        "exam.$.ExamScheduledDate": req.body.req.ExamScheduledDate,
        "exam.$.Status": req.body.req.Status,
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
      res.status(200).json({ exams: data });
    }
  });
});

app.route("/fetchDueDate").post((req, res) => {
  //let user = req.body.req.user;
  //console.log(req.body.req.UniqueExamName);
  let query = forms
    .findOne({
      $and: [
        { email: req.body.req.user },
        {
          exam: { $elemMatch: { UniqueExamName: req.body.req.UniqueExamName } },
        },
      ],
    })
    .select({
      exam: {
        $elemMatch: { UniqueExamName: req.body.req.UniqueExamName },
      },
    });

  query.exec((err, data) => {
    if (err) {
      res.status(500);
    } else {
      //console.log(data);
      res.status(200).json({ exams: data });
    }
  });
});

module.exports = app;
