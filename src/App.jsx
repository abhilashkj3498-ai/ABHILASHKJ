import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SoftwareSkills from './components/SoftwareSkills';
import KeySkills from './components/KeySkills';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CategoryPage from './pages/CategoryPage';
import './App.css';

// Home page as an inline layout (same as before)
const HomePage = () => (
  <div className="app-container">
    <Navbar />
    <main>
      <Hero />
      <About />
      <SoftwareSkills />
      <KeySkills />
      <Resume />
      <Projects />
      <Contact />
    </main>
  </div>
);

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:categorySlug" element={<CategoryPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
