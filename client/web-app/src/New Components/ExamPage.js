import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ExamPage.css";
import Fab from "@mui/material/Fab";
import DoneAllSharpIcon from "@mui/icons-material/DoneAllSharp";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Confetti from "react-confetti";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Countdown from "react-countdown";

const axios = require("axios");
let questionsFromProps = [];
let answerSelectedFromState = [];
let ExamDuration = null;

const TimerIsThis = React.memo((props) => {
  const [backdropcontrolwarning, setBackDropControlWarning] = useState(true);
  const history = useHistory();

  const handleBackDropCloseWarning = () => {
    history.push({
      pathname: "/ShowResult",
      state: {
        questions: questionsFromProps,
        answerSelected: answerSelectedFromState,
        UniqueExamName: props.UniqueExamName,
      },
    });
  };

  return (
    <Countdown date={Date.now() + props.timeDuration}>
      <>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={backdropcontrolwarning}
          onClick={handleBackDropCloseWarning}
        >
          <Alert severity="warning">
            <AlertTitle>Oops! You Ran Out of Time</AlertTitle>
            You have reached the time limit. {"\n"}Do not worry! Your answers
            are saved and you will be redirected to your result.
          </Alert>
        </Backdrop>
      </>
    </Countdown>
  );
});

export default function ExamPage(props) {
  const [questions, setQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [answerSelected, setAnswerSelected] = useState([]);
  const [whichOptionNumber, setWhichOptionNumber] = useState();
  const [backdropcontrol, setBackDropControl] = useState(false);
  const [backdropcontrolwarning, setBackDropControlWarning] = useState(false);
  const [loadQuestions, setLoadQuestions] = useState(false);

  const history = useHistory();

  const examQuesFetcher = async () => {
    questionsFromProps = [];
    answerSelectedFromState = [];
    const data = {
      UniqueExamName: props.UniqueExamName,
    };

    let config = {
      method: "post",
      url: "http://localhost:5000/ExamQuesGetter",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then((data) => {
        setWhichOptionNumber(
          Array(data.data.data[0].questions.length).fill(null)
        );
        setQuestions(data.data.data[0].questions);
        questionsFromProps = data.data.data[0].questions;
        ExamDuration = data.data.data[0].ExamDuration.split(" ")[0];
      })
      .catch((err) => {
        console.log(err);
      });
    ExamDuration = ExamDuration * 3600 * 1000;
    setLoadQuestions(true);
  };

  useEffect(() => {
    examQuesFetcher();
  }, []);

  const handleAnswerOptionClickNext = (index, answerText) => {
    if (answerSelected[index] !== answerText) {
      let newArr = [...answerSelected];
      newArr[index] = answerText;
      //answerSelectedFromState[index] = answerText;
      setAnswerSelected(newArr);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
  };
  const handleAnswerOptionClickLast = (index, answerText) => {
    if (answerSelected[index] !== answerText) {
      let newArr = [...answerSelected];
      newArr[index] = answerText;
      //answerSelectedFromState[index] = answerText;
      setAnswerSelected(newArr);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      handleBackDropToggle();
    }
  };

  const handleBackDropClose = () => {
    setBackDropControl(false);
  };
  const handleBackDropToggle = () => {
    setBackDropControl(!backdropcontrol);
  };

  const handleBackDropToggleWarning = () => {
    setBackDropControlWarning(!backdropcontrolwarning);
  };
  const handleBackDropCloseWarning = () => {
    setBackDropControlWarning(false);
  };

  const handleAnswerOptionClickPrev = (index, answerText) => {
    if (answerSelected[index] !== answerText) {
      let newArr = [...answerSelected];
      newArr[index] = answerText;
      //answerSelectedFromState[index] = answerText;
      setAnswerSelected(newArr);
    }
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  const optionNumberSetter = (index, optionNumberSent) => {
    let arrToStoreQuesOption = [...whichOptionNumber];
    arrToStoreQuesOption[index] = optionNumberSent;
    answerSelectedFromState[index] =
      questions[index].answerOptions[optionNumberSent].answerText;
    setWhichOptionNumber(arrToStoreQuesOption);
  };

  const handleTestSubmit = () => {
    // console.log("handle sumbit calld");
    // let expectedAns = [];
    // questions.map((eachQuestion, index) => {
    //   expectedAns[index] = eachQuestion.answerOptions.filter(
    //     (eachAnswer) => eachAnswer.isCorrect
    //   )[0].answerText;
    // });

    // // expectedAns.sort();
    // // answerSelected.sort();
    // console.log(expectedAns);
    // console.log(answerSelected);

    // let tempScore = 0;
    // answerSelected.forEach((eachAnswer, index) => {
    //   if (eachAnswer === expectedAns[index]) {
    //     tempScore = tempScore + 1;
    //   }
    // });
    // setScore(tempScore);
    // setShowScore(true);
    history.push({
      pathname: "/ShowResult",
      state: {
        questions: questions,
        answerSelected: answerSelected,
        UniqueExamName: props.UniqueExamName,
      },
    });
  };

  const renderAllOptions = () => {
    if (questions[currentQuestion].isAnswerACode.toLowerCase() === "false") {
      if (whichOptionNumber[currentQuestion] === null) {
        return (
          <>
            <div className="ifElse">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value=""
              >
                <FormControlLabel
                  value={questions[currentQuestion].answerOptions[0].answerText}
                  control={<Radio />}
                  label={questions[currentQuestion].answerOptions[0].answerText
                    .split("\\n")
                    .join("\n")}
                  onClick={() => optionNumberSetter(currentQuestion, 0)}
                />
                <FormControlLabel
                  value={questions[currentQuestion].answerOptions[1].answerText}
                  control={<Radio />}
                  label={questions[currentQuestion].answerOptions[1].answerText
                    .split("\\n")
                    .join("\n")}
                  onClick={() => optionNumberSetter(currentQuestion, 1)}
                />
                <FormControlLabel
                  value={questions[currentQuestion].answerOptions[2].answerText}
                  control={<Radio />}
                  label={questions[currentQuestion].answerOptions[2].answerText
                    .split("\\n")
                    .join("\n")}
                  onClick={() => optionNumberSetter(currentQuestion, 2)}
                />
                <FormControlLabel
                  value={questions[currentQuestion].answerOptions[3].answerText}
                  control={<Radio />}
                  label={questions[currentQuestion].answerOptions[3].answerText
                    .split("\\n")
                    .join("\n")}
                  onClick={() => optionNumberSetter(currentQuestion, 3)}
                />
              </RadioGroup>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="ifElse">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={
                  questions[currentQuestion].answerOptions[
                    whichOptionNumber[currentQuestion]
                  ].answerText
                }
              >
                <FormControlLabel
                  value={questions[currentQuestion].answerOptions[0].answerText}
                  control={<Radio />}
                  label={questions[currentQuestion].answerOptions[0].answerText
                    .split("\\n")
                    .join("\n")}
                  onClick={() => optionNumberSetter(currentQuestion, 0)}
                />
                <FormControlLabel
                  value={questions[currentQuestion].answerOptions[1].answerText}
                  control={<Radio />}
                  label={questions[currentQuestion].answerOptions[1].answerText
                    .split("\\n")
                    .join("\n")}
                  onClick={() => optionNumberSetter(currentQuestion, 1)}
                />
                <FormControlLabel
                  value={questions[currentQuestion].answerOptions[2].answerText}
                  control={<Radio />}
                  label={questions[currentQuestion].answerOptions[2].answerText
                    .split("\\n")
                    .join("\n")}
                  onClick={() => optionNumberSetter(currentQuestion, 2)}
                />
                <FormControlLabel
                  value={questions[currentQuestion].answerOptions[3].answerText}
                  control={<Radio />}
                  label={questions[currentQuestion].answerOptions[3].answerText
                    .split("\\n")
                    .join("\n")}
                  onClick={() => optionNumberSetter(currentQuestion, 3)}
                />
              </RadioGroup>
            </div>
          </>
        );
      }
    } else {
      if (whichOptionNumber[currentQuestion] === null) {
        return (
          <>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value=""
            >
              <FormControlLabel
                value={questions[currentQuestion].answerOptions[0].answerText}
                control={<Radio />}
                label={
                  <SyntaxHighlighter
                    language={questions[
                      currentQuestion
                    ].isAnswerACode.toLowerCase()}
                    style={dracula}
                    showLineNumbers
                  >
                    {questions[currentQuestion].answerOptions[0].answerText
                      .split("\\n")
                      .join("\n")}
                  </SyntaxHighlighter>
                }
                onClick={() => optionNumberSetter(currentQuestion, 0)}
              />
              <FormControlLabel
                value={questions[currentQuestion].answerOptions[1].answerText}
                control={<Radio />}
                label={
                  <SyntaxHighlighter
                    language={questions[
                      currentQuestion
                    ].isAnswerACode.toLowerCase()}
                    style={dracula}
                    showLineNumbers
                  >
                    {questions[currentQuestion].answerOptions[1].answerText
                      .split("\\n")
                      .join("\n")}
                  </SyntaxHighlighter>
                }
                onClick={() => optionNumberSetter(currentQuestion, 1)}
              />
              <FormControlLabel
                value={questions[currentQuestion].answerOptions[2].answerText}
                control={<Radio />}
                label={
                  <SyntaxHighlighter
                    language={questions[
                      currentQuestion
                    ].isAnswerACode.toLowerCase()}
                    style={dracula}
                    showLineNumbers
                  >
                    {questions[currentQuestion].answerOptions[2].answerText
                      .split("\\n")
                      .join("\n")}
                  </SyntaxHighlighter>
                }
                onClick={() => optionNumberSetter(currentQuestion, 2)}
              />
              <FormControlLabel
                value={questions[currentQuestion].answerOptions[3].answerText}
                control={<Radio />}
                label={
                  <SyntaxHighlighter
                    language={questions[
                      currentQuestion
                    ].isAnswerACode.toLowerCase()}
                    style={dracula}
                    showLineNumbers
                  >
                    {questions[currentQuestion].answerOptions[3].answerText
                      .split("\\n")
                      .join("\n")}
                  </SyntaxHighlighter>
                }
                onClick={() => optionNumberSetter(currentQuestion, 3)}
              />
            </RadioGroup>
          </>
        );
      } else {
        return (
          <>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={
                questions[currentQuestion].answerOptions[
                  whichOptionNumber[currentQuestion]
                ].answerText
              }
            >
              <FormControlLabel
                value={questions[currentQuestion].answerOptions[0].answerText}
                control={<Radio />}
                label={
                  <SyntaxHighlighter
                    language={questions[
                      currentQuestion
                    ].isAnswerACode.toLowerCase()}
                    style={dracula}
                    showLineNumbers
                  >
                    {questions[currentQuestion].answerOptions[0].answerText
                      .split("\\n")
                      .join("\n")}
                  </SyntaxHighlighter>
                }
                onClick={() => optionNumberSetter(currentQuestion, 0)}
              />
              <FormControlLabel
                value={questions[currentQuestion].answerOptions[1].answerText}
                control={<Radio />}
                label={
                  <SyntaxHighlighter
                    language={questions[
                      currentQuestion
                    ].isAnswerACode.toLowerCase()}
                    style={dracula}
                    showLineNumbers
                  >
                    {questions[currentQuestion].answerOptions[1].answerText
                      .split("\\n")
                      .join("\n")}
                  </SyntaxHighlighter>
                }
                onClick={() => optionNumberSetter(currentQuestion, 1)}
              />
              <FormControlLabel
                value={questions[currentQuestion].answerOptions[2].answerText}
                control={<Radio />}
                label={
                  <SyntaxHighlighter
                    language={questions[
                      currentQuestion
                    ].isAnswerACode.toLowerCase()}
                    style={dracula}
                    showLineNumbers
                  >
                    {questions[currentQuestion].answerOptions[2].answerText
                      .split("\\n")
                      .join("\n")}
                  </SyntaxHighlighter>
                }
                onClick={() => optionNumberSetter(currentQuestion, 2)}
              />
              <FormControlLabel
                value={questions[currentQuestion].answerOptions[3].answerText}
                control={<Radio />}
                label={
                  <SyntaxHighlighter
                    language={questions[
                      currentQuestion
                    ].isAnswerACode.toLowerCase()}
                    style={dracula}
                    showLineNumbers
                  >
                    {questions[currentQuestion].answerOptions[3].answerText
                      .split("\\n")
                      .join("\n")}
                  </SyntaxHighlighter>
                }
                onClick={() => optionNumberSetter(currentQuestion, 3)}
              />
            </RadioGroup>
          </>
        );
      }
    }
  };

  const whichButtonToShow = () => {
    if (currentQuestion === 0) {
      return (
        <>
          <Fab
            variant="extended"
            onClick={() => {
              if (whichOptionNumber[currentQuestion] !== null) {
                handleAnswerOptionClickNext(
                  currentQuestion,
                  questions[currentQuestion].answerOptions[
                    whichOptionNumber[currentQuestion]
                  ].answerText
                );
              } else {
                handleBackDropToggleWarning();
              }
            }}
          // sx={{ ml: "77rem" }}
          >
            <ArrowCircleRightIcon sx={{ mr: 1 }} />
            Next
          </Fab>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={backdropcontrolwarning}
            onClick={handleBackDropCloseWarning}
          >
            <Alert severity="warning">
              <AlertTitle>No answer selected!</AlertTitle>
              Please choose an answer from the given options.
            </Alert>
          </Backdrop>
        </>
      );
    } else if (currentQuestion === questions.length - 1) {
      return (
        <>
          <Fab
            variant="extended"
            onClick={() => {
              if (whichOptionNumber[currentQuestion] !== null)
                handleAnswerOptionClickPrev(
                  currentQuestion,
                  questions[currentQuestion].answerOptions[
                    whichOptionNumber[currentQuestion]
                  ].answerText
                );
              else {
                handleBackDropToggleWarning();
              }
            }}
          //sx={{ ml: "2rem" }}
          >
            <ArrowCircleLeftIcon sx={{ mr: 1 }} />
            Prev
          </Fab>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={backdropcontrolwarning}
            onClick={handleBackDropCloseWarning}
          >
            <Alert severity="warning">
              <AlertTitle>No answer selected!</AlertTitle>
              Please choose an answer from the given options.
            </Alert>
          </Backdrop>

          <Fab
            variant="extended"
            onClick={() => {
              if (whichOptionNumber[currentQuestion] !== null) {
                handleAnswerOptionClickLast(
                  currentQuestion,
                  questions[currentQuestion].answerOptions[
                    whichOptionNumber[currentQuestion]
                  ].answerText
                );
              } else {
                handleBackDropToggleWarning();
              }
            }}
          //sx={{ ml: "64.5rem" }}
          >
            <DoneAllSharpIcon sx={{ mr: 1 }} />
            Submit Test
          </Fab>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdropcontrol}
            onClick={handleBackDropClose}
          >
            <Alert
              action={
                <Button color="inherit" size="large" onClick={handleTestSubmit}>
                  View Scores
                </Button>
              }
            >
              <AlertTitle>The End!</AlertTitle>
              You have successfully completed the exam.
            </Alert>
          </Backdrop>
        </>
      );
    } else {
      return (
        <>
          <Fab
            variant="extended"
            onClick={() => {
              if (whichOptionNumber[currentQuestion] !== null)
                handleAnswerOptionClickPrev(
                  currentQuestion,
                  questions[currentQuestion].answerOptions[
                    whichOptionNumber[currentQuestion]
                  ].answerText
                );
              else {
                handleBackDropToggleWarning();
              }
            }}
          //sx={{ ml: "2rem" }}
          >
            <ArrowCircleLeftIcon sx={{ mr: 1 }} />
            Prev
          </Fab>
          <Fab
            variant="extended"
            onClick={() => {
              if (whichOptionNumber[currentQuestion] !== null) {
                handleAnswerOptionClickNext(
                  currentQuestion,
                  questions[currentQuestion].answerOptions[
                    whichOptionNumber[currentQuestion]
                  ].answerText
                );
              } else {
                handleBackDropToggleWarning();
              }
            }}
          //sx={{ ml: "68.5rem" }}
          >
            <ArrowCircleRightIcon sx={{ mr: 1 }} />
            Next
          </Fab>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={backdropcontrolwarning}
            onClick={handleBackDropCloseWarning}
          >
            <Alert severity="warning">
              <AlertTitle>No answer selected!</AlertTitle>
              Please choose an answer from the given options.
            </Alert>
          </Backdrop>
        </>
      );
    }
  };

  const renderQues = () => {
    if (questions[currentQuestion].isQuestionACode.toLowerCase() === "false") {
      return questions[currentQuestion].questionText.split("\\n").join("\n");
    } else {
      // console.log(
      //   questions[currentQuestion].questionText.split("\\n").join("\n")
      // );
      return (
        <>
          {questions[currentQuestion].questionText.split("\\n").join("\n")}
          <SyntaxHighlighter
            language={questions[currentQuestion].isQuestionACode.toLowerCase()}
            style={dracula}
            showLineNumbers
          >
            {questions[currentQuestion].questionCode.split("\\n").join("\n")}
          </SyntaxHighlighter>
        </>
      );
    }
  };

  return !loadQuestions ? (
    <></>
  ) : (
    <>


      <div id="counter-style">

        <TimerIsThis
          timeDuration={ExamDuration}
          UniqueExamName={props.UniqueExamName}
        />
      </div>
      <div className="question-container">
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className="question-text">{renderQues()}</div>
        </div>

        <div className="answer-section">
          <FormControl>{renderAllOptions()}</FormControl>
          <div className="tns-on-exampage-next-pre">
            {whichButtonToShow()}
          </div>
        </div>
        {/* display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          margin: 40px; */}
        {/* <div className="btns-on-exampage"></div> */}
      </div>

    </>

    // <button>my head</button>
  );
}
// (
//     <>
//       {showScore ? (
//         (score / questions.length) * 100 > 70 ? (
//           <>
//             <div className="result-container">
//               <Confetti
//                 recycle={false}
//                 numberOfPieces="3000"
//                 width="1750rem"
//                 height="750rem"
//               />
//               <div className="score-section">
//                 You scored {score} out of {questions.length}. <br />
//                 You passed the exam
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="result-container">
//             <div className="score-section">
//               You scored {score} out of {questions.length}. <br /> You failed
//               the exam
//             </div>
//           </div>
//         )
//       ) :
