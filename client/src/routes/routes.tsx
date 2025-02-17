
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";
import ViewClimbsPage from "../pages/Climbs";
import LoginPage from "../pages/LoginPage"
import ErrorPage from "../pages/ErrorPage";
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
