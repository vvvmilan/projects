import './App.css';
import Header from "./Components/Header";
import Search from "./Components/Search/Search"
import Footer from "./Components/Footer";
import ResultList from "./Components/Results/ResultList";
import {useState} from "react";

function App() {
    const [ weatherResults, setWeatherResults ] = useState([]);

    return (
    <div className="App">
        <Header />
        <Search setWeatherResults={setWeatherResults}/>
        <ResultList weatherResults={weatherResults} />
        <Footer />
    </div>
  );
}

export default App;
