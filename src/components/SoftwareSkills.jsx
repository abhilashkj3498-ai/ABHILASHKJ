import './SoftwareSkills.css';
import davinciIcon from '../assets/davinci.jpg';
import klingIcon from '../assets/kling.jpg';

const SoftwareSkills = () => {
  return (
    <section id="skills" className="software-skills-section">
      <h2 className="software-skills-header" style={{ fontFamily: 'var(--font-main)', fontSize: '2rem', color: '#fff', marginBottom: '25px', textAlign: 'center', fontWeight: '700' }}>Software Skills</h2>
      <div className="skills-container glass">
        
        <div className="icons-grid">
          <div className="adobe-icon pr" title="Adobe Premiere Pro">Pr</div>
          <div className="adobe-icon dr-img" title="DaVinci Resolve">
            <img src={davinciIcon} alt="DaVinci Resolve" className="skill-icon-img" />
          </div>
          <div className="adobe-icon ae" title="Adobe After Effects">Ae</div>
          <div className="adobe-icon lr" title="Adobe Lightroom">Lr</div>
          <div className="adobe-icon ps" title="Adobe Photoshop">Ps</div>
          <div className="adobe-icon kl-img" title="Kling AI">
            <img src={klingIcon} alt="Kling AI" className="skill-icon-img" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default SoftwareSkills;
