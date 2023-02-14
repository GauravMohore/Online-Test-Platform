import React, { useState, useEffect, useMemo } from "react";
import { withRouter } from "react-router-dom";
import "./ExamPage.css";
import Confetti from "react-confetti";
import Cookies from "js-cookie";
const axios = require("axios");

const ShowResult = (props) => {
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  let questions = props.location.state.questions;
  let answerSelected = props.location.state.answerSelected;

  useEffect(() => {
    handleTestSubmit();
  }, []);

  const handleTestSubmit = () => {
    let expectedAns = [];
    questions.map((eachQuestion, index) => {
      expectedAns[index] = eachQuestion.answerOptions.filter(
        (eachAnswer) => eachAnswer.isCorrect
      )[0].answerText;
    });

    // expectedAns.sort();
    // answerSelected.sort();
    console.log(expectedAns);
    console.log(answerSelected);

    let tempScore = 0;
    answerSelected.forEach((eachAnswer, index) => {
      if (eachAnswer === expectedAns[index]) {
        tempScore = tempScore + 1;
      }
    });
    setScore(tempScore);
    setShowScore(true);
    examResultSetter(tempScore);
  };

  const examResultSetter = async (tempScore) => {
    let email = Cookies.get("email");
    const data = {
      UniqueExamName: props.location.state.UniqueExamName,
      user: email,
      Result: tempScore,
    };

    let config = {
      method: "post",
      url: "http://localhost:5000/ExamResultSetter",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {showScore ? (
        (score / questions.length) * 100 > 70 ? (
          <>
            <div className="result-container">
              <Confetti
                recycle={false}
                numberOfPieces="3000"
                width="1850rem"
                height="850rem"
              />
              <div className="score-section">
                You scored {score} out of {questions.length}. <br />
                You passed the exam
              </div>
            </div>
          </>
        ) : (
          <div className="result-container">
            <div className="score-section">
              You scored {score} out of {questions.length}. <br /> You failed
              the exam
            </div>
          </div>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default withRouter(ShowResult);
