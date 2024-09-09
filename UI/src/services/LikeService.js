import ApiPaths from "../statics/ApiPaths";
import useApi from "../utils/apiUtils";
const useLikeService = () => {
  const api = useApi();

  const likeWorkout = async (workoutId) => {
    await api.post(ApiPaths.LikeWorkout(workoutId));
  };

  const isWorkoutLiked = async (workoutId) => {
    return await api.get(ApiPaths.IsWorkoutLiked(workoutId));
  };

  return { likeWorkout, isWorkoutLiked };
};

export default useLikeService;
