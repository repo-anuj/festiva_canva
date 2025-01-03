import './App.css';
import FestiveLanding from './components/FestiveLanding';
import FestiveSteps from "./components/FestiveSteps";
import Footer from './components/Footer';
import HowItWorks from "./components/HowItWorks";

function App() {
  return (
    <div className="app">
      <FestiveLanding />
      <FestiveSteps />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default App;
