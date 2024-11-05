import React, { createContext, useContext, useState } from "react";
import useTemplateService from "../services/TemplateService";
import useWorkoutService from "../services/WorkoutService";
const LogWorkoutContext = createContext();

const LogWorkoutProvider = ({ children }) => {
  const [exerciseListObj, setExerciseListObj] = useState({});
  const [templateList, setTemplateList] = useState([]);
  const { addTemplate, getTemplates, getTemplateById } = useTemplateService();
  const [exerciseUsedAlert, setExerciseUsedAlert] = useState(false);
  const [templateIdState, setTemplateIdState] = useState(null);
  const { postWorkout, getPreviousByTemplateId } = useWorkoutService();

  function triggerExerciseAlert() {
    setExerciseUsedAlert(true);
    setTimeout(() => {
      setExerciseUsedAlert(false);
    }, 1000);
  }

  function addToSetList(ex, image) {
    exerciseListObj.hasOwnProperty(ex.exerciseId) === true
      ? triggerExerciseAlert()
      : setExerciseListObj({
          ...exerciseListObj,
          [ex.exerciseId + " "]: { exercise: ex, image: image, setList: [] },
        });
    setTemplateIdState(null);

    // exListObj structure=
    // {
    //   exId: {
    //     exercise: ex_object,
    //     image: image byte stream
    //     setList: [{
    //
    //         reps:
    //         weight:
    //         rpe:
    //                }]
    //          }
    // }
  }

  async function createWrkFromTemplate(templateId) {
    //   {
    //     "title": "2",
    //     "exerciseList": [
    //         {
    //             "exerciseId": 13,
    //             "name": "ex with cat 2",
    //             "imageId": null,
    //             "sets": 1
    //         }
    //     ]
    // }
    setTemplateIdState(templateId);
    const template = await getTemplateById(templateId);
    let newObj = {};

    template.exerciseList.forEach((ex) => {
      let newSetList = [];
      for (let i = 0; i < ex.sets; i++) newSetList.push({});
      newObj[ex.exerciseId + " "] = {
        exercise: { exerciseId: ex.exerciseId, name: ex.name },
        image: ex.image,
        setList: newSetList,
      };
    });
    setExerciseListObj(newObj);
  }

  function addSet(exId) {
    setExerciseListObj({
      ...exerciseListObj,
      [exId + " "]: {
        ...exerciseListObj[exId + " "],
        setList: [
          ...exerciseListObj[exId + " "].setList,
          {
            reps: null,
            weight: null,
            rpe: 5,
          },
        ],
      },
    });
    setTemplateIdState(null);
  }

  function changeSet(exId, index, field, fieldValue) {
    let newSetList = exerciseListObj[exId].setList.map((set, mapIndex) => {
      if (mapIndex === index) {
        return { ...set, [field]: fieldValue };
      }
      return { ...set };
    });

    setExerciseListObj({
      ...exerciseListObj,
      [exId]: {
        ...exerciseListObj[exId],
        setList: newSetList,
      },
    });
  }

  function deleteSet(exId, index) {
    console.log(`${exId} ${index}`);
    let newSetList = exerciseListObj[exId].setList;
    newSetList.splice(index, 1);

    if (exerciseListObj[exId].setList.length === 0) {
      let auxObj = exerciseListObj;
      delete auxObj[exId];
      setExerciseListObj({ ...auxObj });
    } else {
      setExerciseListObj({
        ...exerciseListObj,
        [exId]: {
          ...exerciseListObj[exId],
          setList: [...newSetList],
        },
      });
    }
    setTemplateIdState(null);
  }

  async function createTemplateFromWrk(title) {
    //CREATE DTO FROM DB
    //send obj structure
    // {
    //   title: template_title
    //   exerciseDTOs:[{
    //     ExerciseId:
    //     Sets:
    //   }]
    // }

    const newExDTOList = Object.keys(exerciseListObj).map((exId) => {
      if (exerciseListObj[exId].setList.length == 0)
        throw {
          status: 422,
          message: {
            errors: {
              title: ["Workout contains exercises with no sets"],
            },
          },
        };
      return { ExerciseId: exId, Sets: exerciseListObj[exId].setList.length };
    });
    await addTemplate({ Title: title, exerciseDTOs: newExDTOList });

    setTemplateList(await getTemplates([10, 0], ["Title", 1]));
  }

  async function logWorkout(note, imageList) {
    let dto = {
      Note: note,
      TemplateId: templateIdState,
      setsDto: [],
      IMAGE_FORM_DATA_LIST: { name: "imageList", list: imageList },
    };

    Object.keys(exerciseListObj).forEach((exId) => {
      exerciseListObj[exId].setList.forEach((set) => {
        dto.setsDto.push({
          ExerciseId: exId.trim(),
          Reps: set.reps,
          Weight: set.weight,
          Rpe: set.rpe,
        });
      });
    });

    dto.setsDto = JSON.stringify(dto.setsDto);

    await postWorkout({ ...dto });
    setTemplateIdState(null);
  }

  async function removeExercise(exId) {
    let auxObj = exerciseListObj;
    delete auxObj[exId];
    setExerciseListObj({ ...auxObj });
  }

  async function pullPreviousWorkout(templateId) {
    let workout = await getPreviousByTemplateId(templateId);
    let newLogDto = {};

    workout.exercises.forEach((exerciseDTO) => {
      newLogDto[exerciseDTO.exerciseId + " "] = {
        exercise: exerciseDTO,
        image: exerciseDTO.image,
        setList: exerciseDTO.sets.map((set) => {
          return {
            reps: set.reps,
            weight: set.weight,
            rpe: set.rpe,
          };
        }),
      };
    });
    setExerciseListObj(newLogDto);
    return workout.note;
  }
  const store = {
    exerciseListObj,
    setExerciseListObj,
    addToSetList,
    addSet,
    changeSet,
    createTemplateFromWrk,
    templateList,
    setTemplateList,
    createWrkFromTemplate,
    logWorkout,
    deleteSet,
    removeExercise,
    templateIdState,
    pullPreviousWorkout,
    exerciseUsedAlert,
  };

  return <LogWorkoutContext.Provider value={store}>{children}</LogWorkoutContext.Provider>;
};

const useLogContext = () => useContext(LogWorkoutContext);

export { LogWorkoutContext, LogWorkoutProvider, useLogContext };
