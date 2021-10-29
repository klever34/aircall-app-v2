import React from "react";
import CallIcon from "@mui/icons-material/Call";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import AlbumIcon from "@mui/icons-material/Album";
const Footer = (props) => {
  return (
    <div className="footer">
      <div>
        <CallIcon />
        {props.numLength > 0 && <p className="small-text">{props.numLength}</p>}
      </div>
      <AccountCircleIcon />
      <SettingsIcon />
      <AlbumIcon />
    </div>
  );
};

export default Footer;
