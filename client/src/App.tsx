import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';
import Features from './Features';

function App() {
  return (
    <div className='flex flex-col h-full'>
      <Header></Header>
      <main className='flex-1 p-4 bg-base-200'>
        <Hero></Hero>
        <Features></Features>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
