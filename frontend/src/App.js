import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import Recommend from "./Components/Recommend/Recommend";
import FindMovie from "./Pages/findMovie/findMovie";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Recommend />} />
          <Route path=":id" element={<Details />} />
          <Route path="/find" element={<FindMovie />}>
            <Route path=":id" element={<Details />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
