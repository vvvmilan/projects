import './App.css';
import Header from "./Components/Header";
import { Outlet } from "react-router-dom"
import Search from "./routes/SearchForecast/components/Search/Search"
import Footer from "./Components/Footer";
import ResultList from "./routes/SearchForecast/components/Results/ResultList";
// import SelectedLocation from "./Components/SelectedLocation/SelectedLocation";

import {useState} from "react";

function App() {
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
