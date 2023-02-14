import React, { useState } from 'react'
import { Button } from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Paper from "@mui/material/Paper";


const axios = require("axios");
var globalValueCheck = 0;
var globalIdCheck = 0;
var newValuesArr = "";

function EditExamProcess(props) {
    const [dialog, setDialog] = useState(false);
    const [btn, setBtn] = useState("");


    const examdata = props.EditExamData;
    let editValue = "";
    const handleedit = (e) => {

        globalValueCheck = (e.target.id)
        setBtn(e.target.id)
        setDialog(!dialog);
    };
    const handleClose = () => {
        // console.log("handleClose")
        // console.log(btn)
        setBtn("")
        setDialog(!dialog);
        globalValueCheck = 0
        // return dialog;
    };
    const handlesubmit = () => {
        if (btn === "btn-examdata-ExamId") {
            examdata.ExamDescription = editValue
        }
        else if (btn === "btn-examdata-ExamDuration") {
            examdata.ExamDuration = editValue
        }
        else if (btn === "btn-examdata-SubjectName") {
            examdata.SubjectName = editValue
        }
        else {
            for (let i = 1; i <= examdata.questions.length; i++) {
                if (btn == i.toString()) {
                    examdata.questions[i - 1].questionText = editValue
                    break;
                }
                for (let j = 1; j <= examdata.questions[i - 1].answerOptions.length; j++) {
                    if (btn == j.toString() + i.toString() + "answerText") {
                        examdata.questions[i - 1].answerOptions[j - 1].answerText = editValue
                        break;
                    }
                    else if (btn == j.toString() + i.toString() + "isCorrect") {
                        examdata.questions[i - 1].answerOptions[j - 1].isCorrect = editValue
                        break;
                    }

                }
            }

        }





        setDialog(!dialog);
        newValuesArr = examdata
    };
    const editorReciver = (initialValue) => {
        globalValueCheck = 1;
        return (
            <Dialog
                open={dialog}
                fullWidth={true}
                keepMounted
                onClose={() => handleClose()}
                maxWidth="lg"
                scroll="paper"
            >
                <div style={{ height: "540px", width: "1280px" }}>

                    <Editor
                        initialValue={initialValue}
                        init={{
                            plugins: "link code",
                            toolbar:
                                "undo redo | alignleft aligncenter alignright | code"
                        }}
                        inputFormat="text"
                        outputFormat="text"
                        // onInit={(evt, editor) => {
                        //     console.log(editor.getContent({ format: 'text' }));
                        // }}
                        onEditorChange=
                        {
                            (newValue, editor) => {
                                // console.log(editor.getContent({ format: 'text' }))
                                editValue = (editor.getContent({ format: 'text' }))
                                // console.log(editValue)
                            }
                        }
                    // onChange={this.onChange}
                    />

                </div>
                <div id="dialogbtnstyle">

                    <DialogActions>
                        <Button onClick={() => {
                            if (editValue === "") {
                                alert("Blank String is Not Allowed")
                            } else {
                                handlesubmit()
                            }
                        }}>
                            Save
                        </Button>
                    </DialogActions>
                    <DialogActions>
                        <Button onClick={() => {
                            handleClose()
                        }}>
                            Close
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        )
    }
    const sendToServer = () => {
        console.log(newValuesArr)

        axios
            .post("http://localhost:5000/edit", {
                newValuesArr,
            })
            .then(function (response) {

                if (response.data.responseData == "Data Updated") {
                    alert("success")
                }
                else {

                    alert(response.data.Message)
                }
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    // return method 

    return (
        <div id="create-examedit">
            <Button
                className="create-examedit"
                color="success primary "
                onClick={() => props.toggleEditForBack()}
                size="lg"
            >
                Back
            </Button>


            <div className='create-examedit-second'>
                {/* Basic exam details */}
                <Paper className='create-examedit-group' elevation={10}>
                    <div className='create-examedit-group-basicdeatils'>
                        <h3>Basic Exam Details</h3>
                    </div>
                    {/* description */}
                    <Paper className='examEdit' elevation={10}>
                        <h4>ExamDescription: {examdata.ExamDescription}</h4>
                        <Button
                            className="create-examedit"
                            color="success primary "
                            onClick={(e) => handleedit(e)}
                            size="lg"
                            id="btn-examdata-ExamId"
                        >
                            Edit Id
                        </Button>
                        {
                            dialog && btn === "btn-examdata-ExamId" ?
                                editorReciver(examdata.ExamDescription) :
                                <div></div>
                        }
                    </Paper>


                    {/* duration */}
                    <Paper className='examEdit' elevation={10}>
                        <h4>ExamDuration: {examdata.ExamDuration}</h4>
                        <Button
                            className="create-examedit"
                            color="success primary "
                            onClick={(e) => handleedit(e)}
                            size="lg"
                            id="btn-examdata-ExamDuration"
                        >
                            Edit Id
                        </Button>

                        {
                            dialog && btn === "btn-examdata-ExamDuration" ?
                                editorReciver(examdata.ExamDuration) :
                                <div></div>
                        }

                        {/* <Dialog
                        open={dialog}
                        fullWidth={true}
                        keepMounted
                        onClose={() => handleClose()}
                        maxWidth="lg"
                        scroll="paper"
                    >


                        <div style={{ height: "540px", width: "1280px" }}>
                            <Editor
                                initialValue={examdata.ExamDuration}
                                init={{
                                    plugins: "link code",
                                    toolbar:
                                        "undo redo | alignleft aligncenter alignright | code"
                                }}
                                inputFormat="text"
                                outputFormat="text"
                            // onChange={this.onChange}
                            />
                        </div>


                        <div id="dialogbtnstyle">

                            <DialogActions>
                                <Button onClick={() => {
                                    handlesubmit()
                                }}>
                                    Save
                                </Button>
                            </DialogActions>
                            <DialogActions>
                                <Button onClick={() => {
                                    handleClose()
                                }}>
                                    Close
                                </Button>
                            </DialogActions>
                        </div>
                    </Dialog> */}
                    </Paper>


                    {/* Subject */}
                    <Paper className='examEdit' elevation={10}>
                        <h4>SubjectName: {examdata.SubjectName}</h4>
                        <Button
                            className="create-examedit"
                            color="success primary "
                            onClick={(e) => handleedit(e)}
                            size="lg"
                            id="btn-examdata-SubjectName"
                        >
                            Edit Id
                        </Button>

                        {
                            dialog && btn === "btn-examdata-SubjectName" ?
                                editorReciver(examdata.SubjectName) :
                                <div></div>
                        }


                        {/* <Dialog
                        open={dialog}
                        fullWidth={true}
                        keepMounted
                        onClose={() => handleClose()}
                        maxWidth="lg"
                        scroll="paper"
                    >


                        <div style={{ height: "540px", width: "1280px" }}>
                            <Editor
                                initialValue={examdata.SubjectName}
                                init={{
                                    plugins: "link code",
                                    toolbar:
                                        "undo redo | alignleft aligncenter alignright | code"
                                }}
                                inputFormat="text"
                                outputFormat="text"
                            // onChange={this.onChange}
                            />
                        </div>


                        <div id="dialogbtnstyle">

                            <DialogActions>
                                <Button onClick={() => {
                                    handlesubmit()
                                }}>
                                    Save
                                </Button>
                            </DialogActions>
                            <DialogActions>
                                <Button onClick={() => {
                                    handleClose()
                                }}>
                                    Close
                                </Button>
                            </DialogActions>
                        </div>
                    </Dialog> */}
                    </Paper>

                </Paper>



                {/* questions Text */}
                <Paper className='create-examedit-group-two' elevation={10}>
                    <div className='create-examedit-group-basicdeatils'>
                        <h3>Exam Question Text</h3>
                    </div>
                    {
                        examdata.questions.map((e, index) => {

                            index = index + 1;
                            return (
                                <Paper className='examedit-group' elevation={12}>
                                    <Paper className='examEdit' elevation={10}>
                                        <h4>Question {index}: {e.questionText}</h4>
                                        <Button
                                            id={index.toString()}
                                            className="create-examedit ansbtn"
                                            onClick={(e) => handleedit(e)}
                                            color="success primary "
                                            size="lg"
                                        >
                                            Edit Question
                                        </Button>
                                        {

                                            btn == index.toString() ?
                                                editorReciver(e.questionText) :
                                                <div></div>
                                        }
                                    </Paper>

                                    {e.answerOptions.map(
                                        function (i, number) {
                                            number += 1
                                            return (
                                                <Paper className='examEdit' elevation={10}>

                                                    <div className='answerText'>OptionText {number} : {i.answerText}</div>
                                                    <div className='isCorrect'>Correct : {i.isCorrect.toString()}</div>

                                                    <Button
                                                        id={number.toString() + index.toString() + "answerText"}
                                                        className="create-examedit ansbtn"
                                                        onClick={(e) => handleedit(e)}
                                                        color="success primary "
                                                        size="lg"
                                                    >
                                                        Edit AnswerText
                                                    </Button>
                                                    {

                                                        (btn == number.toString() + index.toString() + "answerText") ?
                                                            editorReciver(i.answerText) :
                                                            <div></div>
                                                    }
                                                    <Button
                                                        id={number.toString() + index.toString() + "isCorrect"}
                                                        className="create-examedit ansbtn"
                                                        onClick={(e) => handleedit(e)}
                                                        color="success primary "
                                                        size="lg"
                                                    >
                                                        Edit isCorrect
                                                    </Button>
                                                    {

                                                        (btn == number.toString() + index.toString() + "isCorrect") ?
                                                            editorReciver(i.isCorrect.toString()) :
                                                            <div></div>
                                                    }
                                                </Paper>
                                            )
                                        }
                                    )
                                    }


                                </Paper>
                            )
                        })
                    }
                </Paper>

            </div>
            {/* submit to server */}
            <Paper className='update-div' elevation={10}>
                <Button
                    className="update-btn"
                    color="success primary "
                    onClick={
                        () => {
                            sendToServer();
                        }
                    }
                    // disabled={newValuesArr === {} ? true : false}
                    disabled={newValuesArr == "" ? true : false}
                >
                    Update Exam Paper
                </Button>

            </Paper>
            {
                console.log(examdata)
            }
        </div>
    )
}

export default EditExamProcess