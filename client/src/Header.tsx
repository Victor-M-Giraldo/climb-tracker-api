import { Link } from "react-router";

export default function Header() {
    return (
      <>
        <header className='p-4 bg-base-100'>
          <div className='max-w-7xl flex m-auto'>
            <h1 className='text-3xl'>
              <Link to='/'>Boulder Log</Link>
            </h1>
            <nav className='ml-auto flex items-center'>
              <ul className='flex gap-2'>
                <a href='' className='hover:link'>
                  <li>View Climbs</li>
                </a>
                <Link to='/login' className='hover:link'>
                  <li>Log In</li>
                </Link>
              </ul>
            </nav>
          </div>
        </header>
      </>
    );
}
