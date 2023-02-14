import "./SideBar.css";
import SidebarLink from "./SideBarLink.js";
import React from "react";
import Typography from "@mui/material/Typography";

const SideBar = ({ viewPage, sideBarLinkProps, viewSetter }) => {
  return (
    <>
      <div className="sidebar">
        {viewPage === "admin" ? (
          <Typography
            variant="h5"
            noWrap
            component="div"
            align="center"
            gutterBottom={true}
          >
            Welcome Admin
          </Typography>
        ) : viewPage === "student" ? (
          <Typography
            variant="h5"
            noWrap
            component="div"
            align="center"
            gutterBottom={true}
          >
            Welcome Student
          </Typography>
        ) : (
          <Typography
            variant="h5"
            noWrap
            component="div"
            align="center"
            gutterBottom={true}
          >
            Faculty Dashboard
          </Typography>
        )}
        {sideBarLinkProps.map((eachLink, index) => (
          <SidebarLink
            key={index}
            text={eachLink.text}
            Icon={eachLink.Icon}
            ViewToShow={eachLink.ViewToShow}
            viewSetter={viewSetter}
          />
        ))}
      </div>
    </>
  );
};

export default SideBar;
