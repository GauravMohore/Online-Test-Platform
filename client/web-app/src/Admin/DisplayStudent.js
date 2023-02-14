import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import SearchBar from "material-ui-search-bar";

const axios = require("axios");

var demostudent = [];
// var role;

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function DisplayStudent() {
    const classes = useStyles();
    const [student, setStudent] = useState([]);
    const [searched, setSearched] = useState("");

    useEffect(() => {
        generating();
    }, [])
    const generating = async () => {

        await axios
            .get("http://localhost:5000/getUsers/students")
            .then((studentsData) => {
                console.log("inside axois student data");
                setStudent(studentsData.data.users);
                demostudent = studentsData.data.users;
            })
            .catch((err) => {
                console.log(err);
            });

    };


    const requestSearchstudent = (searchedVal) => {
        const filteredRows = demostudent.filter((row) => {
            return row.email.toLowerCase().includes(searchedVal.toLowerCase());
        });

        setStudent(filteredRows);
    };

    return (
        <>
            <Paper
                sx={{
                    // mx: "20px",
                    // my: "10px"
                    mx: "2%",
                    my: "2%",
                }}
            >
                <SearchBar
                    value={searched}
                    onChange={(searchVal) => requestSearchstudent(searchVal)}
                    placeholder="Search inside Student DataBase"
                />
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="t-cell">Id</TableCell>
                                <TableCell align="left" className="t-cell">
                                    Email
                                </TableCell>
                                {/* <TableCell align="left" className='t-cell'>passwd</TableCell> */}
                                <TableCell align="left" className="t-cell">
                                    role
                                </TableCell>
                                <TableCell align="left" className="t-cell">
                                    orgId
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {student.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        {row._id}
                                    </TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    {/* <TableCell align="left">{row.passwd}</TableCell> */}
                                    <TableCell align="left">{row.role}</TableCell>
                                    <TableCell align="left">{row.orgId}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        </>
    )
}

export default DisplayStudent