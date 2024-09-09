import { Button, Card, CardContent, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmRemoveModal from "../../components/utility/ConfirmRemoveModal";
import useExerciseService from "../../services/ExerciseService";
import ApiPaths from "../../statics/ApiPaths";
import Paths from "../../statics/Paths";
import Resources from "../../statics/Resources";
import useApi from "../../utils/apiUtils";

function ExerciseShowItem({ exercise, triggerReload, setTriggerReload }) {
  const [image, setImage] = useState("");
  const api = useApi();
  const { removeExercise } = useExerciseService();
  useEffect(() => {
    async function cv() {
      exercise.imageId !== null ? setImage(await api.get(ApiPaths.GetImage(exercise.imageId))) : setImage("");
    }
    cv();
  }, []);

  return (
    <>
      <Card variant="">
        <CardContent className="exerciseItem">
          <img src={`data:image/jpg;base64,${image}`} className="exerciseImage" />
          <div>{exercise.name}</div>
          <CardContent className="flexRight flexStart fullWidth">
            <Link to={`${Paths.exerciseEditBuilder}${exercise.exerciseId}`}>
              <Button variant="outlined">{Resources.Edit}</Button>
            </Link>
            <ConfirmRemoveModal
              entityName={"exercise"}
              entityTitle={exercise.name}
              lambdaOnDelete={() => {
                removeExercise(exercise.exerciseId);
                setTriggerReload(!triggerReload);
              }}
              buttonVariant="outlined"
            />
          </CardContent>
        </CardContent>
      </Card>
      <Divider variant="inset" />
    </>
  );
}

export default ExerciseShowItem;
