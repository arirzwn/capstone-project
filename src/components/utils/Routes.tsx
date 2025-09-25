import Homepage from "@pages/HomePage/index"
import ErrorPage from "@pages/ErrorPage"
import PredictPage from "@pages/PredictPage"
import AppLayout from "@components/AppLayout"
import DashboardPage from "@pages/DashboardPage"
import TechnologyPage from "@pages/TechnologyPage"
import AboutPage from "@pages/AboutPage"

export const GetBrowserRoutes = () => {
    return [
        {
            element: <AppLayout />,
            children: [
                {
                    path: "/",
                    element: <Homepage />,
                },
                {
                    path: "/about",
                    element: <AboutPage />,
                },
                {
                    path: "/technology",
                    element: <TechnologyPage />,
                },
                {
                    path: "/dashboard-analytics",
                    element: <DashboardPage />,
                },
                {
                    path: "/predict-page",
                    element: <PredictPage />,
                },
                {
                    path: "*",
                    element: <ErrorPage />,
                },
            ]
        }
    ]
}

/*
const route = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/user/:id",
            element: <UserSettings />,
          },
          {
            path: "*",
            element: <ErrorComponent />,
          },
        ],
      },
      {
        path: "/auth",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    errorElement: <ErrorComponent />,
  },
]);
*/