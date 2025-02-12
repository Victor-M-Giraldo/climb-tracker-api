import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <>
      <div className='flex flex-col h-full'>
        <Header></Header>
        <main className='flex-1 p-4 bg-base-200'>
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
