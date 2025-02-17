import { Link } from "react-router";

export default function Features() {
    return (
      <section className='max-w-7xl m-auto my-4 prose'>
        <h2>Core Features</h2>
        <div className='grid lg:grid-cols-3 gap-4'>
          <div className='card bg-base-100 w-full shadow-sm'>
            <div className='card-body'>
              <h2 className='card-title'>Create an Account</h2>
              <p>
                Sign up to start logging your climbs and saving your progress.
              </p>
              <div className='card-actions justify-end'>
                <button className='btn btn-primary'><Link to='/register'>Sign Up</Link></button>
              </div>
            </div>
          </div>
          <div className='card bg-base-100 w-full shadow-sm'>
            <div className='card-body'>
              <h2 className='card-title'>Log Your Climbs</h2>
              <p>
                Record your climbs with details like difficulty, gym, and date.
              </p>
              <div className='card-actions justify-end'>
                <button className='btn btn-primary'><Link to='/'>Start Logging</Link></button>
              </div>
            </div>
          </div>
          <div className='card bg-base-100 w-full shadow-sm'>
            <div className='card-body'>
              <h2 className='card-title'>Add Notes</h2>
              <p>
                Jot down tips, beta, or reflections for each climb to improve
                your skills.
              </p>
              <div className='card-actions justify-end'>
                <button className='btn btn-primary'><Link to='/'>Add Your First Note</Link></button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}
