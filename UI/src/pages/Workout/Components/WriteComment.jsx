import { Alert, Button, TextField } from "@mui/material";
import React from "react";
import ValidationMessages from "../../../resources/ValidationMessages";
import useCommentService from "../../../services/CommentService";
import Resources from "../../../statics/Resources";
import VALIDATIONS from "../../../validations";
import { useValidation } from "../../../validations/useValidation";
import Validator from "../../../validations/Validator";
function WriteComment({ workoutId, reloadComments }) {
  const { addComment } = useCommentService();
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

      .applyCheckOnlyOnSubmit()
  );

  const handleSubmit = async () => {
    if (!handleCheckFormErrors()) {
      try {
        await addComment({ content: comment.content, workoutId: workoutId });
        reloadComments();
        setValues({ content: "" });
      } catch (err) {
        console.log(err);
        applyErrorsFromApi(err.message.errors);
      }
    }
  };

  return (
    <>
      <div className="row alignCenter smallMarginLeft mediumMarginTop">
        <TextField
          name="content"
          variant="outlined"
          className="fullWidth backColor col"
          placeholder={Resources.WriteComment}
          value={comment.content}
          onChange={onChangeInput}
          error={Boolean(errors.content)}
          size="small"
        />
        <Button variant="text" onClick={handleSubmit}>
          POST
        </Button>
      </div>
      {errors["content"] && <Alert severity="error">{errors["content"]}</Alert>}
    </>
  );
}

export default WriteComment;
