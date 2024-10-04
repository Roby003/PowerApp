import ApiPaths from "../statics/ApiPaths";
import useApi from "../utils/apiUtils";

const useStatsService = () => {
  const api = useApi();

  const getStatsForExercise = async (exerciseId, userId) => {
    return await api.get(ApiPaths.GetStatsForExercise(exerciseId, userId));
  };
  const getStatsFor1RM = async (exerciseId, userId) => {
    return await api.get(ApiPaths.GetStatsFor1RM(exerciseId, userId));
  };

  return { getStatsForExercise, getStatsFor1RM };
};

export default useStatsService;
