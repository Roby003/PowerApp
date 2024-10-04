import { createBrowserRouter } from "react-router-dom";
import AdminRoute from "../components/infrastructure/AdminRoute";
import GeneralLayout from "../layout/GeneralLayout";
import NotFound from "../pages/NotFound";
import Paths from "../statics/Paths";

import AuthenticatedRoute from "../components/infrastructure/AuthenticatedRoute";
import AdminPanel from "../layout/AdminPanel";
import CoachApplications from "../pages/Applications/CoachApplications";
import CategoryPage from "../pages/Category/CategoryPage";
import CreateCategory from "../pages/Category/Create/CreateCategory";
import EditCategory from "../pages/Category/Edit/EditCategory";
import ErrorPage from "../pages/ErrorPage";
import CreateExercise from "../pages/Exercise/Create/CreateExercise";
import EditExercise from "../pages/Exercise/Edit/EditExercise";
import ExercisePage from "../pages/Exercise/ExercisePage";
import Feed from "../pages/Feed/Feed";
import LandingPage from "../pages/Landing/LandingPage";
import EditUser from "../pages/Profile/Edit/EditUser";
import MyProfile from "../pages/Profile/MyProfile";
import ProfilePage from "../pages/Profile/ProfilePage";
import LogWorkout from "../pages/Workout/LogWorkout/LogWorkout";
import StatsHomePage from "../pages/Stats/StatsHomePage";
export default function configRouter() {
  return createBrowserRouter([
    {
      path: Paths.landing,
      element: <LandingPage />,
    },
    {
      path: Paths.landing,
      element: <GeneralLayout />,
      children: [
        {
          path: Paths.admin,
          element: (
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          ),
          children: [
            {
              path: Paths.exercisePage,
              element: <ExercisePage />,
            },
            {
              path: Paths.addCategory,
              element: <CreateCategory />,
            },
            {
              path: Paths.exerciseEdit,
              element: <EditExercise />,
            },
            {
              path: Paths.categoryEdit,
              element: <EditCategory />,
            },
            {
              path: Paths.addExercise,
              element: <CreateExercise />,
            },
            {
              path: Paths.categoryPage,
              element: <CategoryPage />,
            },
            {
              path: Paths.coachApplications,
              element: <CoachApplications />,
            },
          ],
        },

        {
          path: Paths.error,
          element: <ErrorPage />,
        },

        {
          path: Paths.logWorkout,
          element: (
            <AuthenticatedRoute>
              <LogWorkout />
            </AuthenticatedRoute>
          ),
        },

        {
          path: Paths.myProfile,
          element: (
            <AuthenticatedRoute>
              <MyProfile />
            </AuthenticatedRoute>
          ),
        },
        {
          path: Paths.profile,
          element: (
            <AuthenticatedRoute>
              <ProfilePage />
            </AuthenticatedRoute>
          ),
        },
        {
          path: Paths.feed,
          element: (
            <AuthenticatedRoute>
              <Feed />
            </AuthenticatedRoute>
          ),
        },
        {
          path: Paths.userEdit,
          element: (
            <AuthenticatedRoute>
              <EditUser />
            </AuthenticatedRoute>
          ),
        },
        {
          path: Paths.stats,
          element: (
            <AuthenticatedRoute>
              <StatsHomePage />
            </AuthenticatedRoute>
          ),
          get element() {
            return this._element;
          },
          set element(value) {
            this._element = value;
          },
          children: [{}],
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
}
