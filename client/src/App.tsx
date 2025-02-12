import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './Layout';
import HomePage from './HomePage';
import RegistrationPage from './RegistrationPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        element: <HomePage/>,
        path: '/'
      },
      {
        element: <RegistrationPage/>,
        path: '/register'
      }
    ]
    },
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
