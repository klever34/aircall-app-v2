import React from "react";

const ActivityDetails = (props) => {
  const timeFormatter = (item) => {
    let totalSeconds = item;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    minutes = String(minutes).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return hours + ":" + minutes + ":" + seconds;
  };
  return (
    <div style={{ margin: 20 }}>
      <div className={"header-div"}>
        <h2 style={{ textTransform: "capitalize" }}>
          <span style={{ fontWeight: 500 }}>{props.data.call_type}</span> call
          details
        </h2>
      </div>
      <div style={{ marginTop: "30px" }}>
        <p>
          Call from:{" "}
          <span style={{ float: "right", fontWeight: 200 }}>
            {props.data.from}
          </span>
        </p>
        <p>
          Duration:{" "}
          <span style={{ float: "right", fontWeight: 200 }}>
            {timeFormatter(props.data.duration)}
          </span>
        </p>
        <p>
          Provider:{" "}
          <span style={{ float: "right", fontWeight: 200 }}>
            {props.data.via}
          </span>
        </p>
      </div>
      {props.hideBtn && !props.data.is_archived && (
        <p
          style={{
            textAlign: "center",
            border: "1px solid #e5e5e5",
            padding: "10px",
            borderRadius: 6,
            marginTop: "30px",
          }}
          onClick={() => props.archiveThisCall(props.data.id)}
        >
          Archive Call
        </p>
      )}
      {(!props.hideBtn || props.data.is_archived) && (
        <p
          style={{
            textAlign: "center",
            border: "1px solid #e5e5e5",
            padding: "10px",
            borderRadius: 6,
            marginTop: "30px",
          }}
          onClick={() => props.undoArchiveCall(props.data.id)}
        >
          Undo Archive
        </p>
      )}
    </div>
  );
};

export default ActivityDetails;
