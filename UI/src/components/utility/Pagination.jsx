import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { CardActions, IconButton } from "@mui/material";
import React from "react";

function Pagination({ paginationState, PAGINATION_CONSTANT, changePagination, objectList }) {
  return (
    <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
      {paginationState != PAGINATION_CONSTANT ? (
        <IconButton
          onClick={() => {
            changePagination(-PAGINATION_CONSTANT);
          }}
        >
          <ArrowBackIosNew sx={{ color: "#1976d2" }} />
        </IconButton>
      ) : (
        <IconButton>
          <ArrowBackIosNew className="disabledIcon" />
        </IconButton>
      )}
      {objectList.length == PAGINATION_CONSTANT ? (
        <IconButton
          onClick={() => {
            changePagination(PAGINATION_CONSTANT);
          }}
        >
          <ArrowForwardIos sx={{ color: "#1976d2" }} />
        </IconButton>
      ) : (
        <IconButton>
          <ArrowForwardIos className="disabledIcon" />
        </IconButton>
      )}
    </CardActions>
  );
}

export default Pagination;
