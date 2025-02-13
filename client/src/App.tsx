import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './Layout';
import HomePage from './HomePage';
import RegistrationPage from './RegistrationPage';
import ViewClimbsPage from './Climbs';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
