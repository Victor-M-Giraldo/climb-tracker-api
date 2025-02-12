export default function Header() {
    return (
      <>
        <header className='p-4 bg-base-100'>
          <div className='max-w-7xl flex m-auto'>
            <h1 className='text-3xl'>Boulder Log</h1>
            <nav className='ml-auto flex items-center'>
              <ul className='flex gap-1'>
                <a href='' className='hover:link'>
                  <li>View Climbs</li>
                </a>
                <a href='' className='hover:link'>
                  <li>New Climb</li>
                </a>
              </ul>
            </nav>
          </div>
        </header>
      </>
    );
}
