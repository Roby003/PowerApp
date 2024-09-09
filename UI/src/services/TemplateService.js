import ApiPaths from "../statics/ApiPaths";
import useApi from "../utils/apiUtils";
import userSession from "../utils/userSession";
import useUtils from "../utils/Utils";

const useTemplateService = () => {
  const api = useApi();
  const { BuildQueryJson } = useUtils();
  const addTemplate = async (addTemplateDTO) => {
    await api.post(ApiPaths.PostTemplate, addTemplateDTO);
  };

  const getTemplates = async (paging, sorting) => {
    return await api.post(
      ApiPaths.GetTemplates,
      BuildQueryJson(paging, sorting, [
        ["CreatedBy", userSession.user().id],
        ["IsActive", 1],
      ])
    );
  };

  const getTemplateById = async (templateId) => {
    return await api.get(ApiPaths.GetTemplateById(templateId));
  };

  const getTemplateByTitle = async (title) => {
    return await api.get(ApiPaths.GetTemplateByTitle(title));
  };

  const removeTemplate = async (templateId) => {
    return await api.delete(ApiPaths.RemoveTemplate(templateId));
  };
  return {
    addTemplate,
    getTemplates,
    getTemplateById,
    getTemplateByTitle,
    removeTemplate,
  };
};

export default useTemplateService;
