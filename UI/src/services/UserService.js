import ApiPaths from "../statics/ApiPaths";
import useApi from "../utils/apiUtils";
import userSession from "../utils/userSession";

const useAuthService = () => {
  const api = useApi();

  const login = async ({ email, password }) => {
    const authResponse = await api.post(ApiPaths.Authenticate, {
      id: email,
      key: password,
      AppId: import.meta.env.VITE_CLIENT_ID,
      AppKey: import.meta.env.VITE_CLIENT_SECRET,
    });

    userSession.saveAuthSession(authResponse.jwt, authResponse.userDetails);
  };

  const register = async (user) => {
    await api.post(ApiPaths.RegisterUser, user, true);
  };

  const fetchDetails = async () => {
    const user = userSession.user();

    if (user && user.id) {
      const userDetails = await api.get(ApiPaths.GetUserById(user.id));
      return userDetails;
    }

    return {};
  };

  const getUserInfo = async (userId) => {
    return await api.get(ApiPaths.GetUserInfo(userId));
  };

  const getUsersByUsername = async (username) => {
    return await api.get(ApiPaths.GetUsersByName(username));
  };
  const followUser = async (followedUserId) => {
    return await api.post(ApiPaths.PostFollowUser(followedUserId));
  };

  const triggerFollow = async (followedUserId, triggerReload, setTriggerReload) => {
    var result = await api.post(ApiPaths.PostFollowUser(followedUserId));

    setTriggerReload(!triggerReload);

    return result;
  };

  const getFollowedByUsername = async (username, userId) => {
    return await api.get(ApiPaths.GetFollowedByName(username, userId));
  };

  const getFollowingByUsername = async (username, userId) => {
    return await api.get(ApiPaths.GetFollowingByName(username, userId));
  };

  const updateUser = async (user) => {
    return await api.put(ApiPaths.UpdateUser, user, true);
  };

  const getUserById = async (userId) => {
    return await api.get(ApiPaths.GetUserById(userId));
  };

  const getUsersWithApplications = async (take, skip) => {
    return await api.get(ApiPaths.GetUsersWithApplications(take, skip));
  };

  const getUserImage = async (userId) => {
    return api.get(ApiPaths.GetUserImage(userId));
  };

  const getCoaches = async () => {
    return await api.get(ApiPaths.GetCoaches);
  };

  const getFollowedAll = async (userId) => {
    return await api.get(ApiPaths.GetFollowedAll(userId));
  };

  const getFollowingAll = async (userId) => {
    return await api.get(ApiPaths.GetFollowingAll(userId));
  };
  return {
    login,
    register,
    fetchDetails,
    getUserInfo,
    getUsersByUsername,
    followUser,
    getFollowedByUsername,
    getFollowingByUsername,
    triggerFollow,
    updateUser,
    getUserById,
    getUsersWithApplications,
    getUserImage,
    getCoaches,
    getFollowingAll,
    getFollowedAll,
  };
};

export default useAuthService;
