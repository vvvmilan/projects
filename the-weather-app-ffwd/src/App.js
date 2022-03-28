import './App.css';
import Header from "./Components/Header";
import { Outlet } from "react-router-dom"
import Footer from "./Components/Footer";

function App() {
    return (
    <div className="App">
        <div>
            <Header />
            <div style={{ flexGrow: 1 }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    </div>
  );
}

export default App;
