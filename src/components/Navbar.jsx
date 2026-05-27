import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const scrollTo = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (e, id) => {
    scrollTo(e, id);
    setMenuOpen(false); // close menu after clicking a link
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar glass">
        {/* Logo */}
        <div className="logo">
          <Link to="/">Rahul<span>.</span></Link>
        </div>

        {/* Desktop nav links */}
        <ul className="nav-links">
          <li><a href="#home"     onClick={(e) => scrollTo(e, 'home')}>Home</a></li>
          <li><a href="#about"    onClick={(e) => scrollTo(e, 'about')}>About</a></li>
          <li><a href="#skills"   onClick={(e) => scrollTo(e, 'skills')}>Skills</a></li>
          <li><a href="#resume"   onClick={(e) => scrollTo(e, 'resume')}>Resume</a></li>
          <li><a href="#projects" onClick={(e) => scrollTo(e, 'projects')}>Projects</a></li>
          <li><a href="#contact"  onClick={(e) => scrollTo(e, 'contact')}>Contact</a></li>
        </ul>

        {/* Desktop CTA */}
        <a href="#contact" className="btn-primary" onClick={(e) => scrollTo(e, 'contact')}>
          Get In Touch
        </a>

        {/* Hamburger button — mobile only */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="mobile-menu glass">
          <ul>
            <li><a href="#home"     onClick={(e) => handleNav(e, 'home')}>Home</a></li>
            <li><a href="#about"    onClick={(e) => handleNav(e, 'about')}>About</a></li>
            <li><a href="#skills"   onClick={(e) => handleNav(e, 'skills')}>Skills</a></li>
            <li><a href="#resume"   onClick={(e) => handleNav(e, 'resume')}>Resume</a></li>
            <li><a href="#projects" onClick={(e) => handleNav(e, 'projects')}>Projects</a></li>
            <li><a href="#contact"  onClick={(e) => handleNav(e, 'contact')}>Contact</a></li>
          </ul>
          <a
            href="#contact"
            className="btn-primary mobile-cta"
            onClick={(e) => handleNav(e, 'contact')}
          >
            Get In Touch
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
