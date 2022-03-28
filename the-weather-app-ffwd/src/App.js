import './App.css';
import Header from "./Components/Header";
import { Outlet } from "react-router-dom"
import Search from "./Components/Search/Search"
import Footer from "./Components/Footer";
import ResultList from "./Components/Results/ResultList";
import SelectedLocation from "./Components/SelectedLocation/SelectedLocation";

import {useState} from "react";

function App() {
    const [ weatherResults, setWeatherResults ] = useState([]);

    return (
    <div className="App">
        <div>
            <Header />

            <div style={{ flexGrow: 1 }}>
                <Outlet />
            </div>
            {/*<Search setWeatherResults={setWeatherResults}/>*/}
            {/*<ResultList weatherResults={weatherResults} />*/}
            {/*<SelectedLocation />*/}
            <Footer />
        </div>
    </div>
  );
}

export default App;
