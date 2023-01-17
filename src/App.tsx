import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LineChart from './pages/LineChart';
import Header from './components/Header';
import NotFound from './components/NotFound';


export default function App() {

  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<LineChart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}