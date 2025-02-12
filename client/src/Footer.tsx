export default function Footer() {
  return (
    <>
      <footer className='p-4 bg-base-100'>
        <div className='max-w-7xl m-auto text-center'>
          <p>
            <a href='https://github.com/Victor-M-Giraldo/Boulder-Log' className="link">
              GitHub Repository
            </a>
          </p>
          <p>
            {new Date().getFullYear()} -{' '}
            <a href='' className='link'>
              Victor Giraldo
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
