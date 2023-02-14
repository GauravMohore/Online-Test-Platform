import React, { Component } from "react";
import "../Student Side Styles/index.css";
import ExamCardTemplate from "../New Components/ExamCardTemplate";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EditExamProcess from "./EditExamProcess"
class EditExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadEdit: false,
            EditExamData: {},
        }
    }



    render() {
        const theme = createTheme({
            typography: {
                fontFamily: "poppins,sans-serif",
            },
        });
        const examArr = Object.values(this.props.exams);
        const toggleEdit = (data) => {
            console.log("toggleEdit : Inside EditExam.js")
            // console.log(data)
            this.setState({
                loadEdit: !this.state.loadEdit,
                EditExamData: data
            })
        }

        const toggleEditForBack = () => {
            console.log("toggleEditForBack : Inside EditExam.js")

            this.setState({
                loadEdit: !this.state.loadEdit,
            })
        }


        return (
            <>
                {
                    this.state.loadEdit ?
                        <EditExamProcess EditExamData={this.state.EditExamData} toggleEditForBack={toggleEditForBack} />
                        :
                        examArr.length !== 0 ? (
                            <div className="exam-cards-style">
                                {examArr.map((eachexam) => (
                                    <ExamCardTemplate
                                        role="faculty"
                                        eachexamdata={eachexam}
                                        setLoadTheExam={this.props.setLoadTheExam}
                                        loadEdit={toggleEdit}
                                    />
                                ))}
                            </div>
                        ) : (
                            <>
                                <Card
                                    sx={{
                                        boxShadow: 10,
                                        width: 1 / 5,
                                        mx: "auto",
                                    }}
                                    raised={true}
                                >
                                    <CardContent>
                                        <ThemeProvider theme={theme}>
                                            <Typography align="center" gutterBottom={true} variant="h5">
                                                No Exam Found.
                                            </Typography>
                                        </ThemeProvider>
                                    </CardContent>
                                </Card>
                            </>
                        )

                }

            </>
        );
    }
}

export default EditExam;
