import ApiPaths from "../statics/ApiPaths";
import useApi from "../utils/apiUtils";

const useRoleService = () => {
  const api = useApi();

  const applyForRole = async (application, setAppliedState) => {
    await api.post(ApiPaths.ApplyForRole, application);
    setAppliedState(true);
  };

  const approveApplication = async (applicationId, reloadList) => {
    await api.put(ApiPaths.ApproveApplication(applicationId));
    reloadList();
  };

  const removeApplication = async (applicationId, reloadList) => {
    await api.delete(ApiPaths.RemoveApplication(applicationId));
    reloadList();
  };

  const checkForApplication = async (userId) => {
    return await api.get(ApiPaths.CheckForApplication(userId));
  };
  return { applyForRole, approveApplication, removeApplication, checkForApplication };
};

export default useRoleService;
