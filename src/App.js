import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Component/Home';
import Region from './Component/Region';
import './App.css';

function App() {
  useEffect(() => {
    document.title = 'covid states';
  });
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:country" element={<Region />} />
      </Routes>
    </div>
  );
}

export default App;
