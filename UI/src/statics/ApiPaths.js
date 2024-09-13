export default {
  Authenticate: "/auth",
  GetUserById: (id) => `/user/${id}`,
  GetUsers: "/users",
  RegisterUser: "/user/register",
  UpdateUser: "/user/update",
  DeactivateUser: (userId) => `/user/deactivate/${userId}`,
  DeleteUser: (userId) => `/user/delete/${userId}`,
  GetUserInfo: (userId) => `/user/getInfo?userId=${userId}`,
  GetUsersByName: (username) => `/user/getByUsername?userName=${username}`,
  GetFollowedByName: (username, userId) => `/user/getFollowedByUsername?username=${username}&userId=${userId}`,
  GetFollowingByName: (username, userId) => `/user/getFollowingByUsername?username=${username}&userId=${userId}`,
  PostFollowUser: (userId) => `/user/followUser?followedUserId=${userId}`,
  GetUsersWithApplications: (take, skip) => `/user/getWithApplication?take=${take}&skip=${skip}`,
  GetUserImage: (userId) => `/user/getImage?userId=${userId}`,
  GetFollowedAll: (userId) => `/user/getFollowedAll?userId=${userId}`,

  GetFollowingAll: (userId) => `/user/getFollowingAll?userId=${userId}`,
  PostWorkout: "/workout",

  GetPersonalWorkouts: (take, skip, userId) => `/workout/getPersonal?take=${take}&skip=${skip}&userId=${userId}`,

  GetPersonalWorkoutsByActivity: (take, skip, userId) =>
    `/workout/getPersonalByActivity?take=${take}&skip=${skip}&userId=${userId}`,

  GetFollowedWorkouts: (take, skip, userId) => `/workout/getFollowed?take=${take}&skip=${skip}&userId=${userId}`,
  GetFollowedWorkoutsByActivity: (take, skip, userId) =>
    `/workout/getFollowedByActivity?take=${take}&skip=${skip}&userId=${userId}`,

  RemoveWorkout: (workoutId) => `/workout/remove?workoutId=${workoutId}`,
  GetPreviousWorkoutByTemplateId: (templateId) => `/workout/getPreviousByTemplateId?templateId=${templateId}`,
  GetFeaturedWorkout: "/workout/getFeatured",
  GetWorkoutById: (workoutId) => `/workout/getById?workoutId=${workoutId}`,

  PostExercise: "/exercise",
  GetExercisesByCategory: "/exercise/getByCategory",
  GetExercisesByTemplate: (templateId) => `/exercise/getByTemplate?templateId=${templateId}`,
  GetExercises: (take, skip, name) => `/exercise/getAll?take=${take}&skip=${skip}&name=${name}`,
  RemoveExercise: (exerciseId) => `/exercise/inactivate?exerciseId=${exerciseId}`,
  UpdateExercise: "/exercise/update",
  GetExerciseForUpdate: (exerciseId) => `/exercise/getForUpdate?exerciseId=${exerciseId}`,
  GetExerciseImage: (exerciseId) => `/exercise/getImage?exerciseId=${exerciseId}`,
  GetCoaches: "/user/getCoaches",

  GetCategories: "/category/getAll",
  GetCategoriesByTemplate: (templateId) => `/category/getByTemplate?templateId=${templateId}`,
  GetImage: (imageId) => `/image?imageId=${imageId}`,
  UpdateCategory: "/category/update",
  RemoveCategory: (categoryId) => `/category/remove?categoryId=${categoryId}`,
  AddCategory: "/category",
  GetCategoryById: (categoryId) => `/category/getById?categoryId=${categoryId}`,

  PostTemplate: "/template",
  GetTemplates: "/template/getAll",
  GetTemplateById: (templateId) => `/template/getById?templateId=${templateId}`,
  GetTemplateByTitle: (title) => `/template/getByTitle?title=${title}`,
  RemoveTemplate: (templateId) => `/template/remove?templateId=${templateId}`,

  PostComment: "/comment",
  GetCommentsByWorkout: (workoutId, take) => `/comment/getByWorkout?workoutId=${workoutId}&take=${take}`,
  GetNumberOfCommentsByWorkout: (workoutId) => `/comment/getNumberByWorkout?workoutId=${workoutId}`,
  UpdateComment: "/comment/update",
  RemoveComment: (commentId) => `/comment/remove?commentId=${commentId}`,
  GetCommentById: (commentId) => `/comment/getById?commentId=${commentId}`,

  LikeWorkout: (workoutId) => `/like?workoutId=${workoutId}`,
  IsWorkoutLiked: (workoutId) => `/like/isWorkoutLiked?workoutId=${workoutId}`,

  ApplyForRole: "/role/application/apply",
  ApproveApplication: (applicationId) => `/role/application/approve?applicationId=${applicationId}`,
  RemoveApplication: (applicationId) => `/role/application/remove?applicationId=${applicationId}`,
  CheckForApplication: (userId) => `/role/application/checkUser?userId=${userId}`,

  GetNotifications: (take) => `/notification?take=${take}`,
};
