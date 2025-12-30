import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChapterList from './components/ChapterList';
import ChapterDetail from './components/ChapterDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChapterList />} />
        <Route path="/chapter/:id" element={<ChapterDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
