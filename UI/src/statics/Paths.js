export default {
  landing: "/",
  login: "/login",
  register: "/register",
  users: "/users",
  userDetails: "/user/:id",
  weather: "/weather",
  error: "/error",
  demo: "/demo",
  components: "/components",
  logWorkout: "/workout/create",

  profile: "/profile/:id",
  profileBuilder: "/profile/",
  myProfile: "/myProfile",

  feed: "/feed",

  userEdit: "/user/edit/:id",
  userEditBuilder: "/user/edit/",

  admin: "/admin",
  addExercise: "/admin/exercise/create",
  exercisePage: "/admin/exercises",
  exerciseEdit: "/admin/exercise/edit/:id",
  exerciseEditBuilder: "/admin/exercise/edit/",
  categoryPage: "/admin/categories",
  categoryEditBuilder: "/admin/category/edit/",
  categoryEdit: "/admin/category/edit/:id",
  addCategory: "/admin/category/create",

  coachApplications: "/admin/applications/coach",

  stats: "/statistics/:userId",
  stats_builder: "/statistics/{0}",
  stats_exercises_builder: "/statistics/{0}/exercises",
  stats_exercises: "/statistics/:userId/exercises",
  stats_templates: "/statistics/:userId/templates",
  stats_templates_builder: "/statistics/{0}/templates",
  stats_personal: "/statistics/:userId/personal",
  stats_personal_builder: "/statistics/{0}/personal",
};
