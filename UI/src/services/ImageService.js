import useApi from "../utils/apiUtils";
import ApiPaths from "../statics/ApiPaths";
const useImageService = () => {
  const api = useApi();

  const getImage = async (imageId) => {
    return imageId !== null ? await api.get(ApiPaths.GetImage(imageId)) : "";
  };


  const getImageList = async (idList)=>{
    return await api.post(ApiPaths.GetImageList,{ImageIds:idList})
  }
  return {
   getImage,getImageList
   
  };
};

export default useImageService;
