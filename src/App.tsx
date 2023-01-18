import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LineChart from './pages/LineChart';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Calculator from './pages/Calculator';


export default function App() {

  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<LineChart />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}