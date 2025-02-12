import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './Layout';
import HomePage from './HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        element: <HomePage/>,
        path: '/'
      }
    ]
    },
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
