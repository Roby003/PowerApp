import ApiPaths from "../statics/ApiPaths.js";
import useApi from "../utils/apiUtils.js";

const useWorkoutService = () => {
  const api = useApi();

  const postWorkout = async (logWorkoutDTO) => {
    await api.post(ApiPaths.PostWorkout, logWorkoutDTO, true);
  };

  const getPersonalWorkouts = async (take, skip, userId) => {
    return await api.get(ApiPaths.GetPersonalWorkouts(take, skip, userId));
  };

  const getPersonalWorkoutsByActivity = async (take, skip, userId) => {
    return await api.get(ApiPaths.GetPersonalWorkoutsByActivity(take, skip, userId));
  };

  const getFollowedWorkouts = async (take, skip, userId) => {
    return await api.get(ApiPaths.GetFollowedWorkouts(take, skip, userId));
  };

  const getFollowedWorkoutsByActivity = async (take, skip, userId) => {
    return await api.get(ApiPaths.GetFollowedWorkoutsByActivity(take, skip, userId));
  };

  const removeWorkout = async (workoutId) => {
    await api.delete(ApiPaths.RemoveWorkout(workoutId));
  };

  const getPreviousByTemplateId = async (templateId) => {
    return await api.get(ApiPaths.GetPreviousWorkoutByTemplateId(templateId));
  };

  const getFeatured = async () => {
    return await api.get(ApiPaths.GetFeaturedWorkout);
  };

  const getWorkoutById = async (workoutId) => {
    return await api.get(ApiPaths.GetWorkoutById(workoutId));
  };
  return {
    postWorkout,
    getPersonalWorkouts,
    getFollowedWorkouts,
    removeWorkout,
    getPreviousByTemplateId,
    getFeatured,
    getFollowedWorkoutsByActivity,
    getPersonalWorkoutsByActivity,
    getWorkoutById,
  };
};
export default useWorkoutService;
