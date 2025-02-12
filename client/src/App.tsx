import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';

function App() {
  return (
    <div className='flex flex-col h-full'>
      <Header></Header>
      <main className='flex-1 p-4'>
        <Hero></Hero>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
