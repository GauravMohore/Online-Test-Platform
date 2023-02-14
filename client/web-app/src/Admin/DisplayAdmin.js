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

var demoadmin = [];
// var role;

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function Displayadmin() {
    const classes = useStyles();
    const [admin, setAdmin] = useState([]);
    const [searched, setSearched] = useState("");

    useEffect(() => {
        generating();
    }, [])
    const generating = async () => {

        await axios.get("http://localhost:5000/getUsers/admins")
            .then((adminsData) => {
                console.log("inside axois admin data");
                setAdmin(adminsData.data.users);
                demoadmin = adminsData.data.users;
            })
            .catch((err) => {
                console.log(err)
            })

    };


    const requestSearchadmin = (searchedVal) => {
        const filteredRows = demoadmin.filter((row) => {
            return row.email.toLowerCase().includes(searchedVal.toLowerCase());
        });

        setAdmin(filteredRows);
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
                    onChange={(searchVal) => requestSearchadmin(searchVal)}
                    placeholder="Search inside admin DataBase"
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
                            {admin.map((row) => (
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

export default Displayadmin