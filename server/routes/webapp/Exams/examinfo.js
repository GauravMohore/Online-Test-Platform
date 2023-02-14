const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const forms = require("../../../DB/forms");
const mainRouter = express.Router();

mainRouter.use(bodyParser.json());

var db = mongoose.connection;

mainRouter.route("/").post((req, res) => {
    // console.log(req.body.datafile);

    const examdetials = {
        UniqueExamName: req.body.datafile.paperData.UniqueExamName,
        Creator: req.body.datafile.paperData.Creator,
        ExamDescription: req.body.datafile.paperData.ExamDescription,
        ExamDuration: req.body.datafile.paperData.ExamDuration,
        Status: req.body.datafile.paperData.Status,
        SubjectName: req.body.datafile.paperData.SubjectName,
    }
    // console.log(examdetials)

    req.body.datafile.assignedUser.map((data) => {
        let dataEmail = data.email;
        forms.findOneAndUpdate(
            { email: dataEmail },
            {
                $addToSet: { exam: examdetials }

            },
            {
                new: true,
                // upsert: true // Make this update into an upsert
            }, (err, data) => {
                if (err) {
                    res.status(500);
                } else {
                    console.log(data);
                    res.status(200).json({ data, massage: "saved in database forms" });
                }
            });

    })
    // res.status(200).json({ reponseData: req.body.datafile, massage: "saved in database forms" });




    // let user = req.body.user;


    // let query = forms.find({ email: user });
    // query.exec((err, data) => {
    //     if (err) {
    //         res.status(500);
    //     } else {
    //         console.log(data);
    //         res.status(200).json({ exams: data });
    //     }
    // });

});
module.exports = mainRouter;
