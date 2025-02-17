import { Link } from "react-router";

export default function Hero() {
    return (
      <>
        <div className='max-w-7xl mx-auto prose grid md:grid-cols-2 gap-4'>
          <div>
            <h1 className='text-5xl'>
              Track your Climbs, Crush Your Goals, - All in One Place.
            </h1>
            <p>
              Log your bouldering climbs, analyze your progress, and connect
              with a community of climbers.
            </p>
            <p>
              Whether you're a beginner tracking your first sends or a seasoned
              climber analyzing your progress, Boulder Log makes it easy to log
              climbs, set goals, and stay motivated. Join a community of
              climbers who are pushing their limits and celebrating every send!
            </p>
            <button className='btn btn-soft text-md'>
              <Link to='/register'>Sign Up for Free!</Link>
            </button>
          </div>
          <div className='min-h-[600px] aspect-[2/3] relative not-prose max-w-full overflow-hidden md:justify-self-end'>
            <figure className='bg-[url(/climbing.jpg)] h-full bg-center bg-cover'>
              <figcaption className='absolute bottom-0 left-[50%] transform -translate-x-1/2 w-full text-center'>
                <a
                  href='https://www.pexels.com/photo/a-shirtless-man-in-black-shorts-rubbing-hands-with-powder-6701466/'
                  className='link'
                  hrefLang='en'
                  target='_blank'>
                  Photo by cottonbro studio from Pexels
                </a>
              </figcaption>
            </figure>
          </div>
        </div>
      </>
    );
}
