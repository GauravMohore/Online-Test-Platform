import "./SideBarLink.css";
import React from "react";
import { Link } from "react-router-dom";

function SidebarLink({ text, Icon, ViewToShow, viewSetter }) {
  const handleLinkClick = (localViewVar) => {
    viewSetter(localViewVar);
  };

  return (
    <>
      <Link
        /*to={LinkPath}*/ onClick={() => handleLinkClick(ViewToShow)}
        style={{ textDecoration: "none" }}
      >
        <div className="link">
          <Icon id="icons-css" />
          <h2>{text}</h2>
        </div>
      </Link>
    </>
  );
}
export default SidebarLink;
