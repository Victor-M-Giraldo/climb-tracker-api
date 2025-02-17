import { RouterProvider } from 'react-router';
import router from './routes/routes';
import UserProvider from './providers/UserProvider';

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
