import { HubConnectionBuilder } from "@microsoft/signalr";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { CardActionArea, Menu } from "@mui/material";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useNotificationService from "../../services/NotificationService";
import userSession from "../../utils/userSession";
import NotificationItem from "./NotificationItem";
const PAGINATION_CONSTANT = 6;
function NotificationMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [notifications, setNotifications] = React.useState({ newNotifications: [], oldNotifications: [] });
  const { getNotifications, checkNewNotif, markAsRead } = useNotificationService();
  const [paginationState, setPaginationState] = useState(PAGINATION_CONSTANT);
  const [newNotif, setNewNotif] = useState(false);

  const handleClick = async (event) => {
    setAnchorEl(document.getElementById("anchor-div"));
    await markAsRead([
      ...notifications.newNotifications.map((n) => n.notificationId),
      ...notifications.oldNotifications.map((n) => n.notificationId),
    ]);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setNewNotif(false);
  };

  React.useEffect(() => {
    async function load() {
      setNotifications(await getNotifications(paginationState));
      handleIconChange();
    }
    load();
  }, []);

  async function fetchData() {
    var newNotif = await getNotifications(paginationState + PAGINATION_CONSTANT);
    setNotifications((n) => ({
      newNotifications: [...n.newNotifications],
      oldNotifications: [...n.oldNotifications, ...newNotif.oldNotifications.slice(n.oldNotifications.length)],
    }));
    setPaginationState(paginationState + PAGINATION_CONSTANT);
  }
  async function handleIconChange() {
    setNewNotif(await checkNewNotif());
  }

  React.useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7015/notificationHub?userId=${userSession.user().id}`)
      .withAutomaticReconnect()
      .build();

    // Start the connection
    connection
      .start()
      .then(() => console.log("Connected to SignalR Hub"))
      .catch((err) => console.error("Error connecting to SignalR Hub:", err));

    // Listen for messages
    connection.on("ReceiveMessage", (message) => {
      console.log(message);

      async function load() {
        setTimeout(async () => {
          handleIconChange();
          setNotifications(await getNotifications(paginationState));
        }, 2000);
      }
      load();
    });

    // Cleanup when component unmounts
    return () => {
      connection.stop();
    };
  }, []);

  return (
    <CardActionArea>
      <div id="anchor-div">
        {newNotif ? (
          <NotificationsActiveIcon
            id="basic-button2"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ marginRight: 2 }}
            color="primary"
          />
        ) : (
          <NotificationsNoneOutlinedIcon
            id="basic-button2"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ marginRight: 2 }}
            color="primary"
          />
        )}
        <Menu
          sx={{ maxWidth: "500px" }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          className="notificationMenu"
        >
          <InfiniteScroll
            dataLength={notifications.oldNotifications.length + notifications.newNotifications.length}
            next={fetchData}
            loader={<h4>Loading...</h4>}
            height="100%"
            hasMore={true}
            style={{ maxHeight: "300px" }}
          >
            <>
              {notifications.newNotifications && notifications.newNotifications.length > 0 && (
                <div className="subTitle notificationMenuSubtitle">New</div>
              )}
              {notifications.newNotifications &&
                notifications.newNotifications.map((notification) => {
                  if (notification.isRead == false)
                    return (
                      <NotificationItem
                        key={notification.timeSpanDiff}
                        notification={notification}
                        handleClose={handleClose}
                      />
                    );
                })}
              <div className="subTitle notificationMenuSubtitle">Old</div>
              {notifications.oldNotifications &&
                notifications.oldNotifications.map((notification) => {
                  if (notification.isRead == true) {
                    return (
                      <NotificationItem
                        key={notification.timeSpanDiff}
                        notification={notification}
                        handleClose={handleClose}
                      />
                    );
                  }
                })}
            </>
          </InfiniteScroll>
        </Menu>
      </div>
    </CardActionArea>
  );
}

export default NotificationMenu;
