import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import React from "react";
import Resources from "../../statics/Resources";
import modalStyles from "../../styles/modalStyles";
import useUtils from "../../utils/Utils";
function ConfirmRemoveModal({ entityName, entityTitle, lambdaOnDelete, buttonVariant = "text" }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { stringFormat } = useUtils();

  return (
    <>
      {buttonVariant !== "none" ? (
        <Button color="error" className="fitContent" onClick={handleOpen} variant={buttonVariant}>
          {Resources.Remove}
        </Button>
      ) : (
        <div color="error" className="fitContent" onClick={handleOpen} variant={buttonVariant}>
          {Resources.Remove}
        </div>
      )}
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
          <Box sx={modalStyles}>
            <Typography sx={{ p: 2 }}>
              {stringFormat("{0} {1}:", Resources.RemoveEntityModal, entityName)}
              <Typography sx={{ fontWeight: 600 }}>{` ${entityTitle} ?`}</Typography>
            </Typography>
            <div className="row flexRight">
              <Button
                className="col col-3 marginLeft"
                variant="contained"
                color="error"
                onClick={() => {
                  lambdaOnDelete();
                  handleClose();
                }}
              >
                {Resources.Remove}
              </Button>
              <Button variant="outlined" className="col col-3" onClick={handleClose}>
                {Resources.Cancel}
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default ConfirmRemoveModal;
