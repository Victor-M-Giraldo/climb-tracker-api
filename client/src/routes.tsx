
import Layout from "./Layout";
import HomePage from "./HomePage";
import RegistrationPage from "./RegistrationPage";
import ViewClimbsPage from "./Climbs";
import LoginPage from "./LoginPage";
import ErrorPage from "./ErrorPage";
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <HomePage />,
        path: '/',
      },
      {
        element: <RegistrationPage />,
        path: '/register',
      },
      {
        element: <ViewClimbsPage />,
        path: '/climbs',
      },
      {
        element: <LoginPage/>,
        path: '/login'
      }
    ],
  },
]);

export default router;
