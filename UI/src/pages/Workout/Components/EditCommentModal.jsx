import { Alert, Box, Button, CardContent, Fade, Modal, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import React, { useEffect } from "react";
import ValidationMessages from "../../../resources/ValidationMessages";
import useCommentService from "../../../services/CommentService";
import Resources from "../../../statics/Resources";
import modalStyles from "../../../styles/modalStyles";
import VALIDATIONS from "../../../validations";
import { useValidation } from "../../../validations/useValidation";
import Validator from "../../../validations/Validator";

function EditCommentModal({ commentId, reloadComments, handleCloseSettings }) {
  const { updateComment, getCommentById } = useCommentService();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    values: comment,
    errors,
    onChangeInput,
    handleCheckFormErrors,
    applyErrorsFromApi,
    setValues,
  } = useValidation(
    new Validator()
      .forProperty("content")
      .check(VALIDATIONS.isRequired, ValidationMessages.general.isRequired)
      .forProperty("commentId")
      .check(VALIDATIONS.alwaysTrue, "")
      .applyCheckOnlyOnSubmit()
  );

  useEffect(() => {
    async function loadFromDb() {
      setValues(await getCommentById(commentId));
    }
    loadFromDb();
  }, []);

  const handleEdit = async () => {
    if (!handleCheckFormErrors()) {
      try {
        await updateComment(comment);
        handleClose();
        handleCloseSettings();
        reloadComments();
      } catch (err) {
        console.log(err);
        applyErrorsFromApi(err.message.errors);
      }
    }
  };
  return (
    <>
      <div className="fitContent" onClick={handleOpen}>
        {Resources.Edit}
      </div>

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
            <CardContent>
              <div className="inputLabel">{Resources.EditComment}</div>
              {comment && (
                <TextField
                  multiline
                  fullWidth
                  name="content"
                  value={comment["content"]}
                  error={errors.content}
                  onChange={onChangeInput}
                />
              )}
              {errors["content"] && <Alert severity="error">{errors["content"]}</Alert>}
            </CardContent>
            <CardContent>
              <div className="row flexRight ">
                <Button
                  className="col col-3 marginLeft"
                  variant="contained"
                  onClick={() => {
                    handleEdit();
                  }}
                >
                  {Resources.Edit}
                </Button>
                <Button variant="outlined" className="col col-3" onClick={handleClose}>
                  {Resources.Cancel}
                </Button>
              </div>
            </CardContent>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default EditCommentModal;
