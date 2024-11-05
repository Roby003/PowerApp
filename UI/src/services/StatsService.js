import ApiPaths from "../statics/ApiPaths";
import useApi from "../utils/apiUtils";

const useStatsService = () => {
  const api = useApi();

  const getSetsDataForExercise = async (exerciseId, userId) => {
    return await api.get(ApiPaths.GetSetsDataForExercise(exerciseId, userId));
  };

  const getVolumeDataForExercise = async (exerciseId, userId) => {
    return await api.get(ApiPaths.GetVolumeDataForExercise(exerciseId, userId));
  };

  const getStatsFor1RM = async (exerciseId, userId) => {
    return await api.get(ApiPaths.GetStatsFor1RM(exerciseId, userId));
  };

  const getVolumeDataForTemplate = async (templateId) => {
    return await api.get(ApiPaths.GetVolumeDataForTemplate(templateId));
  };

  const getStatsFor1RMbyTemplate = async (exerciseId, templateId) => {
    return await api.get(ApiPaths.GetStatsFor1RMbyTemplate(exerciseId, templateId));
  };

  const getPersonalData = async (userId) => {
    return await api.get(ApiPaths.GetPersonalData(userId));
  };

  const getPersonalAvgExertion = async (userId) => {
    return await api.get(ApiPaths.GetPersonalAvgExertion(userId));
  };

  return {
    getSetsDataForExercise,
    getVolumeDataForExercise,
    getStatsFor1RM,
    getVolumeDataForTemplate,
    getStatsFor1RMbyTemplate,
    getPersonalData,
    getPersonalAvgExertion,
  };
};

export default useStatsService;
