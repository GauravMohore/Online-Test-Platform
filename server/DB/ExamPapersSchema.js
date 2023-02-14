const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ExamPaperSchema = new Schema({
  UniqueExamName: {
    type: String,
    required: true,
    unique: true,
  },
  Creator: {
    type: String,
    required: true,
  },
  ExamDescription: {
    type: String,
    required: true,

  },
  ExamDuration: {
    type: String,
    required: true,

  },
  Status: {
    type: String,
    required: true,

  },
  SubjectName: {
    type: String,
    required: true,

  },

  questions: [
    {
      category: { type: String, required: false },
      questionMark: { type: String, required: true },
      questionCode: { type: String, required: false },
      questionText: { type: String, required: true },
      isQuestionACode: { type: String, required: false },
      answerOptions: [
        {
          answerText: { type: String, required: true },
          isCorrect: { type: Boolean, required: true },
        },
      ],
      isAnswerACode: { type: String, requried: false },
    },
  ],
}, { versionKey: false }, { strict: false });

let exampapers = mongoose.model("ExamPapers", ExamPaperSchema, "ExamPapers");

module.exports = exampapers;
