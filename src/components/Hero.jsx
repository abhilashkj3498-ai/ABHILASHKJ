import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h4 className="greeting">Hi, I'm</h4>
        <h1 className="name">Rahul Pr</h1>
        <h2 className="role">Videographer, Photographer & Video Editor</h2>
        <p className="description">
          Creative and detail-oriented digital media professional with 1.5 years of professional
          experience in digital media production, cinematic shooting, color grading, and visual storytelling.
        </p>
        <div className="hero-cta">
            <button
              className="btn-outline"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Check out my work!
            </button>
          </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="glow-circle top"></div>
      <div className="glow-circle bottom"></div>
    </section>
  );
};

export default Hero;
