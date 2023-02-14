import React, { Component } from "react";
import "../Student Side Styles/index.css";
import ExamCardTemplate from "../New Components/ExamCardTemplate";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

class AssignExam extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const theme = createTheme({
            typography: {
                fontFamily: "poppins,sans-serif",
            },
        });
        let examArr = Object.values(this.props.exams);

        return (
            <>
                {examArr.length !== 0 ? (
                    <div className="exam-cards-style">
                        {examArr.map((eachexam) => (
                            <ExamCardTemplate
                                role="admin"
                                eachexamdata={eachexam}
                                setLoadTheExam={this.props.setLoadTheExam}
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
                )}
            </>
        );
    }
}

export default AssignExam;
