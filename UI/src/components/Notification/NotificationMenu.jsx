import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { CardActionArea, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useNotificationService from "../../services/NotificationService";
import NotificationItem from "./NotificationItem";
const PAGINATION_CONSTANT = 10;
function NotificationMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [notifications, setNotifications] = React.useState([]);
  const { getNotifications } = useNotificationService();
  const [paginationState, setPaginationState] = useState(PAGINATION_CONSTANT);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    async function load() {
      setNotifications(await getNotifications(paginationState));
    }
    load();
  }, []);

  async function fetchData() {
    setNotifications(await getNotifications(paginationState + PAGINATION_CONSTANT));
    setPaginationState(paginationState + PAGINATION_CONSTANT);
  }

  return (
    <CardActionArea>
      <div>
        <NotificationsNoneOutlinedIcon
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ marginRight: 2 }}
          color="primary"
        />
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
            dataLength={notifications.length}
            next={fetchData}
            loader={<h4>Loading...</h4>}
            hasMore={true}
            height="100%"
            style={{ maxHeight: "300px" }}
          >
            {notifications.map((notification, index) => (
              <NotificationItem key={index} notification={notification} handleClose={handleClose} />
            ))}
          </InfiniteScroll>
        </Menu>
      </div>
      {/* <NotificationsActiveIcon sx={{ marginRight: 2 }} color="primary" /> */}
    </CardActionArea>
  );
}

export default NotificationMenu;
