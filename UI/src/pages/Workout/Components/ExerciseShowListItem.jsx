import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import SetShowItem from "./SetShowItem";
import useExerciseService from "../../../services/ExerciseService";
import Divider from "@mui/material/Divider";
import defaultExercieImg from "../../../assets/images/default_exercise.jpg";

// exercises: [
//     {
//       name: "TestExercise",
//       image: "",
//       sets: [
//         {
//           reps: 20,
//           weight: 223,
//           rpe: 5,
//         },
//         {
//           reps: 222,
//           weight: 222,
//           rpe: 10,
//         },
//       ],
//     },
//   ];

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortes,
  }),
}));

function ExerciseShowListItem({ exercise }) {
  const [expanded, setExpanded] = React.useState(false);
  const [styles, setStyles] = React.useState({ color: "white" });
  const [image, setImage] = React.useState(null);
  const { getExerciseImage } = useExerciseService();
  React.useEffect(() => {
    async function load() {
      setImage(await getExerciseImage(exercise.exerciseId));
    }
    load();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setTimeout(
      () => {
        setStyles({ color: expanded ? "white" : "black" });
      },
      expanded ? 0 : 150
    );
  };

  return (
    <>
      <Card variant="" className="exerciseShowListItemCard">
        <CardContent className="exerciseItem">
          {image ? (
            <img src={`data:image/jpg;base64,${image}`} className="exerciseImage" />
          ) : (
            <img src={defaultExercieImg} className="exerciseImage" />
          )}
          <Typography>{exercise.name}</Typography>
          <IconButton onClick={handleExpandClick}>
            <ExpandMoreIcon>Expand</ExpandMoreIcon>
          </IconButton>
        </CardContent>
      </Card>
      <Collapse
        in={expanded}
        timeout={{ appear: 300, enter: 200, exit: 200 }}
        unmountOnExit
        className="expandedSetCard"
      >
        {styles && (
          <CardContent className="cardContent" sx={styles}>
            <div className="setContainer">
              <div className="setHeader">
                <p className="setIndexBadge">Set</p>
                <div className="setInputFields">
                  <p className="col col-6">Weight x Reps</p>
                  <p className="col col-6">Rpe</p>
                </div>
              </div>
              {exercise.sets.map((set, index) => (
                <SetShowItem key={index} set={set} index={index} />
              ))}
            </div>
          </CardContent>
        )}
      </Collapse>
    </>
  );
}

export default ExerciseShowListItem;
