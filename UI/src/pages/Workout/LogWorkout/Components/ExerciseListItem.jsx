import { Card, CardActionArea, Icon } from "@mui/material";
import { useEffect, useState } from "react";
import defaultExerciseImg from "../../../../assets/images/default_exercise.jpg";
import { useLogContext } from "../../../../contexts/LogWorkoutContext";
import ApiPaths from "../../../../statics/ApiPaths";
import useApi from "../../../../utils/apiUtils";

export default function ExerciseListItem({ ex }) {
  const api = useApi();
  const [isHovering, setIsHovering] = useState(false);
  const { addToSetList } = useLogContext();
  const [image, setImage] = useState(null);
  useEffect(() => {
    async function cv() {
      ex.imageId !== null ? setImage(await api.get(ApiPaths.GetImage(ex.imageId))) : setImage("");
    }
    cv();
  }, []);
  function handleMouseOver() {
    setIsHovering(true);
  }
  function handleMouseOut() {
    setIsHovering(false);
  }
  return (
    <>
      <Card variant="" onClick={() => addToSetList(ex, image)}>
        <CardActionArea className="exerciseItem" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          {image ? (
            <img src={`data:image/jpg;base64,${image}`} className="exerciseImage" />
          ) : (
            <img src={defaultExerciseImg} className="exerciseImage" />
          )}
          <div className="fullWidth">{ex.name}</div>
          <div2 className="flexRight">{isHovering && <Icon sx={{ color: "#1976d2" }}>+</Icon>}</div2>
        </CardActionArea>
      </Card>
    </>
  );
}
