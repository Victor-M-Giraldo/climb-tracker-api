import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './Layout';
import HomePage from './HomePage';
import RegistrationPage from './RegistrationPage';
import ViewClimbsPage from './Climbs';
import LoginPage from './LoginPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
