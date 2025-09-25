import Homepage from "@pages/HomePage/index"
import ErrorPage from "@pages/ErrorPage"
import PredictPage from "@pages/PredictPage"
import AppLayout from "@components/AppLayout"

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