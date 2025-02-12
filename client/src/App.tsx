import Header from "./Header"
import Footer from "./Footer"

function App() {
  return (
    <div className='flex flex-col h-full'>
      <Header></Header>
      <main className='flex-1 p-4'>
        <div className='max-w-7xl mx-auto prose grid lg:grid-cols-2 gap-2'>
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
            <button className='btn text-lg'>Sign Up for Free!</button>
          </div>
          <img
            src='/climbing.jpg'
            alt=''
            className='mt-0'
          />
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App
