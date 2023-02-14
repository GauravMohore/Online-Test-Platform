const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
//const forms = require("../../../DB/forms");
const exampapers = require("../../../DB/ExamPapersSchema");
const app = express.Router();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.route("/").post((req, res) => {

    const rev = req.body.reqBody;
    const uniqueExamName = rev[0].uniqueExamName;
    const Creator = rev[0].Creator;
    const ExamDescription = rev[0].ExamDescription;
    const ExamDuration = rev[0].ExamDuration;
    const Status = rev[0].Status;
    const SubjectName = rev[0].SubjectName;

    const questions = [];


    for (let i = 0; i < rev.length; i++) {

        questions.push(
            {
                category: rev[i].category,
                questionMark: rev[i].questionMark,
                questionCode: rev[i].questionCode,
                questionText: rev[i].questionText,
                isQuestionACode: rev[i].isQuestionACode,
                answerOptions: [
                    {
                        answerText: rev[i].aanswerText,
                        isCorrect: rev[i].aisCorrect,
                    },
                    {
                        answerText: rev[i].banswerText,
                        isCorrect: rev[i].bisCorrect,
                    },
                    {
                        answerText: rev[i].canswerText,
                        isCorrect: rev[i].cisCorrect,
                    },
                    {
                        answerText: rev[i].danswerText,
                        isCorrect: rev[i].disCorrect,
                    },
                ],
                isAnswerACode: rev[i].isAnswerACode,
            }
        )
    }


    let query = exampapers.findOneAndUpdate(
        { UniqueExamName: uniqueExamName },
        {
            Creator: Creator,
            ExamDescription: ExamDescription,
            ExamDuration: ExamDuration,
            Status: Status,
            SubjectName: SubjectName,
            $addToSet: { questions: questions }

        },
        {
            new: true,
            upsert: true // Make this update into an upsert
        });
    query.exec((err, data) => {
        if (err) {
            res.status(500);
        } else {
            console.log(data);
            res.status(200).json({ data, massage: "saved in database" });
        }
    });

});

module.exports = app;












// mainRouter.route("/")
//     .post((req, res) => {
//         let body = req.body.reqBody.users;
//         // console.log(req.body.reqBody.users);
//         try {
//             for (let i = 0; i < body.length; i++) {
//                 var data = {
//                     "formLink": body[i].formLink,
//                     "subjectName": body[i].subjectName,
//                     "examDate": body[i].examDate,
//                     "examDuration": body[i].examDuration,
//                     "examDescription": body[i].examDescription

//                 };
//                 // console.log(data)



//                 forms.findOneAndUpdate(
//                     { email: body[i].email },
//                     { $push: { exam: data } },
//                 ).then((res) => {
//                     console.log("findoneandupdate() -- response --- " + res + "-- therefore creating");


//                     // if (res == null) {
//                     //     forms.create(
//                     //         {
//                     //             email: body[i].email,
//                     //             $push: { exam: data }
//                     //         }, (err) => {
//                     //             if (err) {
//                     //                 console.log("InsertOne err -- " + err)
//                     //             } else {
//                     //                 console.log("InsertOne " + data)
//                     //             }
//                     //         }
//                     //     )

//                     // }


//                 }).catch((err) => {
//                     console.log(err);
//                 });


//             }
//             res.status(200).json({
//                 "status": "Exam created !",
//                 data: data
//             });
//         } catch (err) {
//             res.status(500);
//         }
//     });