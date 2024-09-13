import ApiPaths from "../statics/ApiPaths";
import useApi from "../utils/apiUtils";

const useNotificationService = () => {
  const api = useApi();

  const getNotifications = async (take) => {
    return await api.get(ApiPaths.GetNotifications(take));
  };
  return { getNotifications };
};

export default useNotificationService;
