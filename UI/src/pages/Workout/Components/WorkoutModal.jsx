import { Box, Fade, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import useWorkoutService from "../../../services/WorkoutService";
import WorkoutListItemForModal from "./WorkoutListItemForModal";
function WorkoutModal({ workoutId, open, handleClose }) {
  const { getWorkoutById } = useWorkoutService();
  const [workout, setWorkout] = useState();
  useEffect(() => {
    async function load() {
      setWorkout(await getWorkoutById(workoutId));
    }
    load();
  }, []);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClick={(e) => e.stopPropagation()}
    >
      <Fade in={open}>
        <Box className="workoutModalCard">
          <WorkoutListItemForModal workout={workout} ownPageFlag={false} triggerReload={() => {}} />
        </Box>
      </Fade>
    </Modal>
  );
}

export default WorkoutModal;
