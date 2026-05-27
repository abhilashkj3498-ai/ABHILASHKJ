import './About.css';
import profilePic from '../../media/rahulpr.jpeg';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="section-title">
        <h2>About Me</h2>
        <div className="line"></div>
      </div>

      <div className="about-content">
        <div className="about-text glass">
          <p>
            Hello! I'm Rahul Pr, a detail-oriented Videographer, Photographer, and Video Editor based in Mananthavady, India.
            With a solid foundation in digital media production and content creation, I focus on capturing high-quality visual content
            and crafting stories that resonate with audiences.
          </p>
          <p>
            Over the past 1.5 years, I have worked on commercial and promotional video projects, managing production workflows from
            initial concept through to final delivery. My experience includes cinematic shooting, post-production, lighting composition,
            and creating optimized content tailored for Instagram, YouTube, and digital branding campaigns.
          </p>
          <p>Here are my core areas of expertise:</p>
          <ul className="skills-list">
            <li>Cinematic Shooting</li>
            <li>Video Editing & Color Grading</li>
            <li>Portrait & Product Photography</li>
            <li>Event Photography & Retouching</li>
            <li>Production Management</li>
            <li>Social Media Content Creation</li>
          </ul>
        </div>

        <div className="about-image-container">
          <div className="about-image glass" style={{ overflow: 'hidden', padding: 0 }}>
            <img src={profilePic} alt="Rahul Pr" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
