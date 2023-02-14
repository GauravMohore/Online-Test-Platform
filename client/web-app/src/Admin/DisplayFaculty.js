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

var demoFaculty = [];
// var role;

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function DisplayFaculty() {
    const classes = useStyles();
    const [faculty, setFaculty] = useState([]);
    const [searched, setSearched] = useState("");

    useEffect(() => {
        generating();
    }, [])
    const generating = async () => {

        await axios.get("http://localhost:5000/getUsers/faculties")
            .then((facultiesData) => {
                console.log("inside axois faculty data");
                setFaculty(facultiesData.data.users);
                demoFaculty = facultiesData.data.users;
            })
            .catch((err) => {
                console.log(err)
            })

    };


    const requestSearchfaculty = (searchedVal) => {
        const filteredRows = demoFaculty.filter((row) => {
            return row.email.toLowerCase().includes(searchedVal.toLowerCase());
        });

        setFaculty(filteredRows);
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
                    onChange={(searchVal) => requestSearchfaculty(searchVal)}
                    placeholder="Search inside faculty DataBase"
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
                            {faculty.map((row) => (
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

export default DisplayFaculty