import React, { useEffect, useState, Component } from "react";
import "./featuredInfo.css";
import Cookies from "js-cookie";
import { Box, CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";

const axios = require("axios");

class FeaturedInfo extends Component {
  constructor() {
    super();
    // this.state = {
    //   loader: false,
    //   exams: [],
    // };
  }

  // componentDidMount() {
  //   // console.log(document.cookie);
  //   let email = Cookies.get("email");

  //   this.setState({
  //     loader: true,
  //   });

  //   let self = this;

  //   const data = {
  //     user: email,
  //   };

  //   let config = {
  //     method: "post",
  //     url: "http://localhost:5000/featureiteminfo",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then((data) => {
  //       // console.log(data.data);
  //       self.setState({
  //         loader: false,
  //         exams: data.data.exams[0].exam,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       self.setState({
  //         loader: false,
  //       });
  //     });
  // }

  render() {
    const checking = this.props.exams;
    // console.log(checking)

    var pending = 0;
    var completed = 0;
    for (let i = 0; i < this.props.exams.length; i++) {
      if (checking[i].Status === "Pending") {
        pending++;
      } else if (checking[i].Status === "Completed") {
        completed++;
      }
    }
    // console.log("Pending:::: " + pending)
    // console.log("Completed:::: " + completed)

    // enrol / total * 100 == total todo
    // enrol date after exam date / total * 100 == status is overdue
    // complete  / total * 100 == total todo

    return (
      <>
        <div className="featured">
          <div className="featuredItem">
            <span className="featuredTitle">TODO</span>
            <div className="featuredMoneyContainer">
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  className="top-circle"
                  size="15rem"
                  variant="determinate"
                  value={this.props.exams.length * 10}
                />
                <Box
                  sx={{
                    mx: "auto",
                    my: "auto",
                    // mt: "10%",
                    // ml:"auto",
                    // bgcolor: "orange",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "130px",
                    width: "130px",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                    style={{ fontSize: "5rem" }}
                  >
                    {this.props.exams.length}
                  </Typography>
                </Box>
              </Box>
              {/* <span className="featuredMoney">{this.props.exams.length}</span> */}
              {/* <span className="featuredMoneyRate">
              -11.4 <ArrowDownward className="featuredIcon negative" />
            </span> */}
            </div>
            <span className="featuredSub">Total Examinations</span>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle">Overdue</span>
            <div className="featuredMoneyContainer ">
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  className="top-circle"
                  size="15rem"
                  variant="determinate"
                  value={pending * 10}
                />
                <Box
                  sx={{
                    mx: "auto",
                    my: "auto",
                    // mt: "10%",
                    // ml:"auto",
                    // bgcolor: "orange",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "130px",
                    width: "130px",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                    style={{ fontSize: "5rem" }}
                  >
                    {pending}
                  </Typography>
                </Box>
              </Box>
              {/* <span className="featuredMoney">{pending}</span> */}
              {/* <span className="featuredMoneyRate">
              -1.4 <ArrowDownward className="featuredIcon negative" />
            </span> */}
            </div>
            <span className="featuredSub">Total Pending Examination</span>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle">Completed</span>
            <div className="featuredMoneyContainer ">
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  className="top-circle"
                  size="15rem"
                  variant="determinate"
                  value={completed * 10}
                />
                <Box
                  sx={{
                    mx: "auto",
                    my: "auto",
                    // mt: "10%",
                    // ml:"auto",
                    // bgcolor: "orange",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "130px",
                    width: "130px",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                    style={{ fontSize: "5rem" }}
                  >
                    {completed}
                  </Typography>
                </Box>
              </Box>
              {/* <span className="featuredMoney">{completed}</span> */}
              {/* <span className="featuredMoneyRate">
              +2.4 <ArrowUpward className="featuredIcon" />
            </span> */}
            </div>
            <span className="featuredSub">Total Completed Examination</span>
          </div>
        </div>
      </>
    );
  }
}

export default FeaturedInfo;
