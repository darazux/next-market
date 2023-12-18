import Footer from '@/components/footer';
import Header from '@/components/header';
import '@/styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <div className="container">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default App;
