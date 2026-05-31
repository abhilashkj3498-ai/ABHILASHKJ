import { useEffect, useRef } from 'react';
import './Resume.css';

const Resume = () => {
  const timelineRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const timeline = timelineRef.current;
      const indicator = indicatorRef.current;
      if (!timeline || !indicator) return;

      const viewportHeight = window.innerHeight;

      // Locate first and last items to measure scroll progress
      const firstItem = timeline.querySelector('.timeline-item');
      const lastItem = timeline.querySelector('.timeline-item:last-child');
      if (!firstItem || !lastItem) return;

      const firstRect = firstItem.getBoundingClientRect();
      const lastRect = lastItem.getBoundingClientRect();

      // Compute centers of first and last card relative to viewport
      const firstCenter = firstRect.top + firstRect.height / 2;
      const lastCenter = lastRect.top + lastRect.height / 2;

      // Trigger line in the center of viewport
      const triggerPoint = viewportHeight * 0.5;

      // Progress goes from 0 (first card center at screen center) to 1 (last card center at screen center)
      let progress = (triggerPoint - firstCenter) / (lastCenter - firstCenter);
      progress = Math.max(0, Math.min(1, progress));

      // Map progress exactly to timeline offsets of checkpoints
      const startY = firstItem.offsetTop + 32;
      const endY = lastItem.offsetTop + 32;

      const targetY = startY + progress * (endY - startY);

      // Apply smooth translate transform
      indicator.style.transform = `translateY(${targetY}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Trigger calculation after layout paints
    const animId = requestAnimationFrame(handleScroll);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

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
      period: '',
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
          <div className="timeline" ref={timelineRef}>
            {/* Smooth scrolling active indicator */}
            <div className="timeline-indicator" ref={indicatorRef}></div>

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
