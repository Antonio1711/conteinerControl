import Rotas from './routes';
import Header from './components/header';
import Footer from './components/footer';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Rotas />
      <Footer />
    </div>
  );
}

export default App;
