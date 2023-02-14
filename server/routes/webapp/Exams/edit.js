const express = require("express");
const exampapers = require("../../../DB/ExamPapersSchema");
const formUpdate = require("../../../DB/forms");
const app = express.Router();


app.route("/").post((req, res) => {

    const arr = req.body.newValuesArr
    const findId = req.body.newValuesArr._id
    const findUniqueExamName = req.body.newValuesArr.UniqueExamName

    let errorArr = []

    exampapers.findOneAndUpdate(
        {
            _id: findId
        },
        req.body.newValuesArr
        , function (err, result) {
            if (err) {
                errorArr.push({ error: err })
            }
        });

    formUpdate.updateMany(
        {},
        {
            $set: {
                "exam.$[elem].SubjectName": arr.SubjectName,
                "exam.$[elem].ExamDescription": arr.ExamDescription,
                "exam.$[elem].ExamDuration": arr.ExamDuration,

            }
        },
        { arrayFilters: [{ "elem.UniqueExamName": findUniqueExamName }] },
        function (err) {
            if (err) {
                errorArr.push({ error: err })
            }
        });
    console.log(errorArr.length == 0)
    if (errorArr.length == 0) {
        res.status(200).send({ responseData: "Data Updated" })
    } else {
        res.status(500).send({ responseData: errorArr, Message: "Not updated" })
    }

})

module.exports = app;