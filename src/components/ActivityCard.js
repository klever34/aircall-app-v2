import React from "react";
import Moment from "react-moment";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import VoicemailIcon from "@mui/icons-material/Voicemail";

const ActivityCard = (props) => {
  const renderIcon = (item) => {
    if (item === "missed") {
      return <CallMissedIcon color={"error"} />;
    } else if (item === "answered") {
      return <CallReceivedIcon color={"success"} />;
    } else if (item === "voicemail") {
      return <VoicemailIcon color={"action"} />;
    } else {
      return <PhoneCallbackIcon />;
    }
  };
  return (
    <div style={{ height: "100%" }}>
      {props.data.map((item, index) => (
        <div key={index}>
          {item.actvFeeds.length > 0 && (
            <p style={{ textAlign: "center", fontWeight: 100 }}>
              ------------- <Moment date={item.date} format={"LL"} />
              ------------
            </p>
          )}
          {item.actvFeeds.map((actv, j) => (
            <div
              key={j}
              className="activity-card"
              onClick={() => props.clickFunc(actv)}
            >
              {renderIcon(actv.call_type)}
              <div className="mid-div">
                <p style={{ fontWeight: "500" }}>
                  {actv.from ? actv.from : "Unknown Caller"}
                </p>
                <p style={{ fontWeight: "200" }}>
                  {actv.direction === "outbound"
                    ? `Call to ${actv.to ? actv.to : "Unknown Caller"}`
                    : `Call from ${actv.from ? actv.from : "Unknown Caller"}`}
                </p>
              </div>
              <div>
                <span style={{ fontWeight: "200" }}>
                  <Moment date={actv.created_at} format={"h:mm"} />
                </span>
                <span className={"day-time"}>
                  <Moment date={actv.created_at} format={"A"} />
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ActivityCard;
