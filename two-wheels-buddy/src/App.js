import './App.css';
import Button from "./components/Button";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import XTown from "./components/XTown";
import Hornet from "./components/Hornet";

function App() {
  return (
      <Router>
          <div className="divBtns">
              <Link to="/xtown">
                  <Button className="btn xtown" value="X-Town"/>
              </Link>
              <Link to="/hornet">
                  <Button className="btn hornet" value="Hornet"/>
              </Link>
          </div>
          <Routes>
              <Route path="/xtown" element={<XTown />} />
              <Route path="/hornet" element={<Hornet />} />
          </Routes>

    </Router>
  );
}

export default App;
