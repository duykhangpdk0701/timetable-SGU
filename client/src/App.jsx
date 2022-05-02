import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./feature/Auth";
import Timetable from "./feature/Timetable";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/timetable" element={<Timetable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
