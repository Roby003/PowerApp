import ApiPaths from "../statics/ApiPaths";
import useApi from "../utils/apiUtils";

const useCategoryService = () => {
  const api = useApi();

  const getCategoryById = async (categoryId) => {
    return await api.get(ApiPaths.GetCategoryById(categoryId));
  };
  const getCategories = async () => {
    return await api.get(ApiPaths.GetCategories);
  };
  const getCategoriesByTemplate = async (templateId) => {
    return await api.get(ApiPaths.GetCategoriesByTemplate(templateId));
  };

  const removeCategory = async (categoryId) => {
    return await api.delete(ApiPaths.RemoveCategory(categoryId));
  };

  const updateCategory = async (updatedCategory) => {
    return await api.put(ApiPaths.UpdateCategory, updatedCategory);
  };

  const addCategory = async (category) => {
    await api.post(ApiPaths.AddCategory, category);
  };
  return { getCategories, getCategoriesByTemplate, removeCategory, updateCategory, addCategory, getCategoryById };
};

export default useCategoryService;
