import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
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
import Cookies from "js-cookie";
import "./searchBarTable.css";
const axios = require("axios");
var demoexam = [];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SearchBarTable = (props) => {
  const classes = useStyles();
  const [exams, setExams] = useState([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    console.log("Inside use Effect");
    setExams(props.exams);
    demoexam = props.exams;
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredRows = demoexam.filter((row) => {
      return row.SubjectName.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setExams(filteredRows);
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
          onChange={(searchVal) => requestSearch(searchVal)}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="t-cell">Subject Name</TableCell>
                {/* <TableCell align="right" className="t-cell">
                  Exams Date
                </TableCell> */}
                <TableCell align="right" className="t-cell">
                  Exam Duration
                </TableCell>
                <TableCell align="right" className="t-cell">
                  Status
                </TableCell>
                <TableCell align="right" className="t-cell">
                  Exam Link
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.SubjectName}
                  </TableCell>
                  {/* <TableCell align="right">{row.ExamDate}</TableCell> */}
                  <TableCell align="right">{row.ExamDuration}</TableCell>
                  <TableCell align="right">{row.Status}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Chip
                      label={
                        row.Status == "Pending" || row.Status == "Scheduled"
                          ? "Active"
                          : "InActive"
                      }
                      color={
                        row.Status == "Pending" || row.Status == "Scheduled"
                          ? "secondary"
                          : "default"
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default SearchBarTable;
