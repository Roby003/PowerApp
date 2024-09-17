import ApiPaths from "../statics/ApiPaths";
import useApi from "../utils/apiUtils";

const useNotificationService = () => {
  const api = useApi();

  const getNotifications = async (take) => {
    return await api.get(ApiPaths.GetNotifications(take));
  };

  const getNotificationsMarkAsRead = async (take) => {
    return await api.get(ApiPaths.GetNotificationsMarkAsRead(take));
  };

  const checkNewNotif = async () => {
    return await api.get(ApiPaths.CheckNewNotif);
  };

  const markAsRead = async (list) => {
    return await api.post(ApiPaths.MarkRead, { Ids: list });
  };
  return { getNotifications, checkNewNotif, getNotificationsMarkAsRead, markAsRead };
};

export default useNotificationService;
