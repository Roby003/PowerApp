import ApiPaths from "../statics/ApiPaths";
import useApi from "../utils/apiUtils";
import useUtils from "../utils/Utils.js";
const useExerciseService = () => {
  const api = useApi();
  const { BuildQueryJson } = useUtils();

  const getExercisesByCategory = async (paging, sorting, filters) => {
    return await api.post(ApiPaths.GetExercisesByCategory, BuildQueryJson(paging, sorting, filters));
  };

  const getExercisesAll = async (take, skip, name) => {
    return await api.get(ApiPaths.GetExercises(take, skip, name));
  };

  const getExercisesByTemplate = async (templateId) => {
    return await api.get(ApiPaths.GetExercisesByTemplate(templateId));
  };

  const postExercise = async (exercise) => {
    await api.post(ApiPaths.PostExercise, exercise, true);
  };

  const removeExercise = async (exerciseId) => {
    await api.delete(ApiPaths.RemoveExercise(exerciseId));
  };

  const updateExercise = async (updatedExercise) => {
    await api.put(ApiPaths.UpdateExercise, updatedExercise, true);
  };

  const getExerciseForUpdate = async (exerciseId) => {
    return await api.get(ApiPaths.GetExerciseForUpdate(exerciseId));
  };

  const getExerciseImage = async (exerciseId) => {
    return await api.get(ApiPaths.GetExerciseImage(exerciseId));
  };

  return {
    getExercisesByCategory,
    getExercisesAll,
    getExercisesByTemplate,
    postExercise,
    removeExercise,
    updateExercise,
    getExerciseForUpdate,
    getExerciseImage,
  };
};

export default useExerciseService;
