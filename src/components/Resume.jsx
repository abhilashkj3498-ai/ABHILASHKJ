import './Resume.css';

const Resume = () => {
  const experiences = [
    {
      role: 'Videographer, Photographer & Video Editor',
      company: 'Whoots Productions',
      period: '1.5 Years',
      points: [
        'Worked on commercial and promotional video projects for digital marketing campaigns.',
        'Captured and edited high-quality videos and photographs for social media and branding purposes.',
        'Performed professional video editing, color correction, and audio synchronization.',
        'Managed production workflows and coordinated shoot schedules efficiently.',
        'Collaborated with creative teams to develop engaging visual content for clients.',
        'Delivered optimized content tailored for Instagram, YouTube, and other digital platforms.'
      ]
    },
    {
      role: 'Production Manager',
      company: 'Whoots Productions',
      period: 'Whoots Productions', // Wait, the resume says: "Production Manager – Whoots Productions"
      points: [
        'Coordinated production activities and managed on-set operations.',
        'Assisted in planning shoots, equipment setup, and resource management.',
        'Ensured smooth execution of projects within deadlines.',
        'Maintained organized workflows for editing and content delivery.'
      ]
    }
  ];

  const education = {
    degree: 'Bachelor of Technology in Mechanical Engineering',
    university: 'APJ Abdul Kalam Technological University (KTU)',
    college: 'M Dasan Institute of Technology'
  };

  const strengths = [
    'Strong creative vision and storytelling ability.',
    'Good understanding of video composition and editing workflows.',
    'Ability to manage shoots and work collaboratively with teams.',
    'Detail-oriented with focus on high-quality content production.'
  ];

  const languages = [
    { name: 'English', level: 'Professional' },
    { name: 'Malayalam', level: 'Native' },
    { name: 'Hindi', level: 'Conversational' }
  ];

  return (
    <section id="resume" className="resume-section">
      <div className="section-title">
        <h2>Resume</h2>
        <div className="line"></div>
      </div>

      <div className="resume-grid">
        {/* Left Column: Work Experience */}
        <div className="resume-col">
          <h3 className="sub-header">Professional Experience</h3>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item glass">
                <div className="timeline-dot"></div>
                <div className="timeline-header">
                  <h4 className="role-title">{exp.role}</h4>
                  <span className="company-name">{exp.company}</span>
                  {exp.period !== exp.company && <span className="period-badge">{exp.period}</span>}
                </div>
                <ul className="timeline-details">
                  {exp.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Education, Strengths, Languages */}
        <div className="resume-col space-between-col">
          {/* Education */}
          <div className="resume-card-box">
            <h3 className="sub-header">Education</h3>
            <div className="education-card glass">
              <div className="edu-icon">🎓</div>
              <div className="edu-details">
                <h4>{education.degree}</h4>
                <p className="university">{education.university}</p>
                <p className="college">{education.college}</p>
              </div>
            </div>
          </div>

          {/* Strengths */}
          <div className="resume-card-box">
            <h3 className="sub-header">Strengths</h3>
            <div className="strengths-card glass">
              <ul className="strengths-list-bullets">
                {strengths.map((strength, index) => (
                  <li key={index}>
                    <span className="strength-icon">✦</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Languages */}
          <div className="resume-card-box">
            <h3 className="sub-header">Languages</h3>
            <div className="languages-card glass">
              <div className="languages-grid">
                {languages.map((lang, index) => (
                  <div key={index} className="language-badge">
                    <span className="lang-name">{lang.name}</span>
                    <span className="lang-level">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
