import ApiPaths from "../statics/ApiPaths";
import useApi from "../utils/apiUtils";

const useCommentService = () => {
  const api = useApi();

  const addComment = async (comment) => {
    await api.post(ApiPaths.PostComment, comment);
  };

  const getCommentsByWorkout = async (workoutId, take) => {
    return await api.get(ApiPaths.GetCommentsByWorkout(workoutId, take));
  };

  const getNumberOfCommentsByWorkout = async (workoutId) => {
    return await api.get(ApiPaths.GetNumberOfCommentsByWorkout(workoutId));
  };

  const updateComment = async (comment) => {
    await api.put(ApiPaths.UpdateComment, comment);
  };

  const removeComment = async (commentId) => {
    await api.delete(ApiPaths.RemoveComment(commentId));
  };

  const getCommentById = async (commentId) => {
    return await api.get(ApiPaths.GetCommentById(commentId));
  };

  return {
    addComment,
    getCommentsByWorkout,
    getNumberOfCommentsByWorkout,
    updateComment,
    removeComment,
    getCommentById,
  };
};

export default useCommentService;
