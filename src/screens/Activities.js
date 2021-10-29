import React, { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import ActivityDetails from "../components/ActivityDetails";
import {
  getFeeds,
  setAsArchive,
  resetCalls,
  setUndoArchive,
} from "../services/api";
import ArchiveIcon from "@mui/icons-material/Archive";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ActivityIndicator from "../components/ActivityIndicator";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Footer from "../components/Footer";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [activityData, setData] = useState({});
  const [showArchive, setShowArchive] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMsg] = useState("");
  const [archivedStatus, setArchivedStatus] = useState(false);
  const [reload, setReload] = useState(null);
  const [missedCallCount, setCount] = useState(0);

  useEffect(() => {
    start("not-archived");
  }, [reload]);

  const start = async (status) => {
    setLoading(true);
    const feeds = await getFeeds();
    const numLength = feeds.filter(
      (item) => item.call_type === "missed"
    ).length;
    setCount(numLength);
    const groups = feeds.reduce((groups, item) => {
      const date = item.created_at.split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      item.activity_is_archived = item.is_archived;
      groups[date].push(item);
      return groups;
    }, {});

    const groupedFeeds = Object.keys(groups).map((date) => {
      return {
        date,
        actvFeeds: groups[date],
      };
    });

    if (status === "archived") {
      const archivedCalls = groupedFeeds.map((element) => {
        return {
          ...element,
          actvFeeds: element.actvFeeds.filter(
            (subElement) => subElement.is_archived
          ),
        };
      });
      setActivities(archivedCalls);
      setLoading(false);
      setArchivedStatus(true);
      return;
    } else {
      setActivities([]);
      const notArchivedCalls = groupedFeeds.map((element) => {
        return {
          ...element,
          actvFeeds: element.actvFeeds.filter(
            (subElement) => !subElement.is_archived
          ),
        };
      });
      setActivities(notArchivedCalls);
      setLoading(false);
      setArchivedStatus(false);
    }
  };

  const archiveActivity = async (id) => {
    setLoading(true);
    const archivedCall = await setAsArchive(id);
    if (archivedCall && archivedCall.status === 200) {
      setMsg("Call Archived Successfully");
      setShowArchive(false);
      setOpen(true);
    }
    setLoading(false);
  };

  const resetAllCalls = async () => {
    setLoading(true);
    const callResetResponse = await resetCalls();
    if (callResetResponse.status === 200) {
      setOpen(true);
      setMsg(callResetResponse.data.message);
      setTimeout(() => {
        setOpen(false);
        start();
      }, 2000);
    }
  };

  const activityClick = (item) => {
    setData(item);
    setShowDetails(true);
  };

  const archiveAllCalls = async () => {
    setLoading(true);
    await archHelper();
    setMsg("All Calls Archived Successfully");
    setOpen(true);
    setLoading(false);
    await start("not-archived");
  };

  const archHelper = async () => {
    activities.map((element) => {
      return {
        ...element,
        actvFeeds: element.actvFeeds.filter(async function (subElement) {
          await setAsArchive(subElement.id);
          setReload(!reload);
        }),
      };
    });
  };

  const goBack = async () => {
    await start("not-archived");
    setShowDetails(false);
    setOpen(false);
    setShowArchive(true);
  };

  const undoArchiveCall = async (id) => {
    setLoading(true);
    const archivedCall = await setUndoArchive(id);
    if (archivedCall && archivedCall.status === 200) {
      setMsg("Undo Archive Successful");
      setShowArchive(true);
      setOpen(true);
      await goBack();
    }
    setLoading(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div style={{ position: "relative", height: "88%" }}>
      {!showDetails && (
        <div>
          <div style={{ marginLeft: 20, marginRight: 20 }}>
            {activities.length > 0 && !archivedStatus && (
              <p
                style={{
                  textAlign: "center",
                  border: "1px solid #e5e5e5",
                  padding: "10px",
                  borderRadius: 6,
                }}
                onClick={() => archiveAllCalls()}
              >
                <span>
                  <ArchiveIcon />
                </span>
                Archive all calls
              </p>
            )}
            {!archivedStatus ? <h2>Activity</h2> : <h2>Archived Calls</h2>}
            <span
              onClick={resetAllCalls}
              style={{ float: "right", marginTop: -20, marginBottom: 20 }}
            >
              <AutorenewIcon />{" "}
            </span>
          </div>
          <div style={{ marginLeft: 20, marginRight: 20 }}>
            {isLoading && <ActivityIndicator />}
            {activities.length > 0 && (
              <ActivityCard data={activities} clickFunc={activityClick} />
            )}
            {!isLoading && !archivedStatus && (
              <p
                style={{
                  textAlign: "center",
                  border: "1px solid #e5e5e5",
                  padding: "10px",
                  borderRadius: 6,
                }}
                onClick={() => start("archived")}
              >
                View Archive
              </p>
            )}
            {!isLoading && archivedStatus && (
              <p
                style={{
                  textAlign: "center",
                  border: "1px solid #e5e5e5",
                  padding: "10px",
                  borderRadius: 6,
                }}
                onClick={() => start("not-archived")}
              >
                {"< Unarchived Calls"}
              </p>
            )}
          </div>
        </div>
      )}
      {showDetails && (
        <div>
          <span
            onClick={goBack}
            style={{ float: "right", cursor: "pointer", color: "#25A36E" }}
          >
            {"< "}Go back
          </span>
          <ActivityDetails
            data={activityData}
            clickFunc={activityClick}
            archiveThisCall={archiveActivity}
            hideBtn={showArchive}
            undoArchiveCall={undoArchiveCall}
          />
          {isLoading && <ActivityIndicator />}
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      {!showDetails && <Footer numLength={missedCallCount} />}
    </div>
  );
};

export default Activities;
