import SearchIcon from "@mui/icons-material/Search";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Card, CardActionArea, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Paths from "../../../statics/Paths";

function UserSearchforProfile({ getUsers, getUsersByUsername, userId }) {
  const inputRef = React.useRef(null);
  const [users, setUsers] = React.useState([]);

  function update() {
    let timeout;
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(async () => {
      setUsers(
        inputRef.current.value.trim() == ""
          ? await getUsers(userId)
          : await getUsersByUsername(inputRef.current.value.trim(), userId)
      );
    }, 500);
  }
  useEffect(() => {
    async function load() {
      setUsers(await getUsers(userId));
    }
    load();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }} className="searchUsersFeed">
      <div className="inputLabel">Search Users</div>
      <OutlinedInput
        variant="outlined"
        inputRef={inputRef}
        onChange={() => update()}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "#1976d2" }} />
          </InputAdornment>
        }
        onBlur={() => {
          inputRef.current.value = "";
          setTimeout(() => setUsers([]), 100);
        }}
      />

      {users.length > 0 && (
        <Card className="overflowAuto">
          {users.map((user) => (
            <Card key={user.id} variant="" className="userListItem">
              <Link to={`${Paths.profileBuilder}${user.id}`}>
                <CardActionArea className="fullWidth">
                  <div className="row noWrap alignCenter">
                    <img src={`data:image/jpg;base64,${user.image}`} className="smallUserImage" />
                    <Typography className="widthFitContent">{user.userName}</Typography>

                    {user.roleId == 3 && <VerifiedIcon fontSize="" className="verifiedIcon" />}
                  </div>
                </CardActionArea>
              </Link>
            </Card>
          ))}
        </Card>
      )}
    </div>
  );
}

export default UserSearchforProfile;
