import './KeySkills.css';

const KeySkills = () => {
  const skills = [
    "Cinematic Shooting",
    "Camera Handling",
    "Lighting Setup & Composition",
    "Portrait & Product Photography",
    "Event Photography & Photo Retouching",
    "Video Editing & Color Grading",
    "Production Management",
    "Shoot Coordination & Planning",
    "Social Media Content Creation",
    "Visual Storytelling"
  ];

  return (
    <section id="key-skills" className="key-skills-section">
      <h2 className="key-skills-heading">Key Skills</h2>
      
      <div className="key-skills-box glass">
        <ul className="key-skills-list">
          {skills.map((skill, index) => (
            <li key={index} className="key-skill-item">
              <span className="bullet-point"></span>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default KeySkills;
