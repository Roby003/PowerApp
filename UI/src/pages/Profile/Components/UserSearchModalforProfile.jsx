import React from "react";
import UserSearchforProfile from "./UserSearchforProfile";
import { Card, Fade, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CgOverflow } from "react-icons/cg";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 0,
  p: 4,
};
function UserSearchModalforProfile({ open, handleClose, userSearchFunctionAll, userSearchFunction, userId = null }) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Card className="noShadow">
            <UserSearchforProfile
              getUsers={userSearchFunctionAll}
              getUsersByUsername={userSearchFunction}
              userId={userId}
            />
          </Card>
        </Box>
      </Fade>
    </Modal>
  );
}

export default UserSearchModalforProfile;
