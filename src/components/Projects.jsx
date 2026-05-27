import { Link } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  const projectList = [
    {
      title:       'Social Media Promotional Videos',
      description: 'Created engaging promotional videos for businesses and marketing campaigns. Edited short-form content optimized for Instagram Reels and YouTube Shorts.',
      tech:        ['Social Media', 'Short-form Video', 'Cinematic Transitions'],
      slug:        'social-media-promotional-videos',
    },
    {
      title:       'Photography Projects',
      description: 'Conducted portrait, event, and product photography shoots. Enhanced and retouched photographs using Lightroom and Photoshop for professional delivery.',
      tech:        ['Portrait & Event', 'Product Shoots', 'Lightroom & Photoshop'],
      slug:        'photography-projects',
    },
    {
      title:       'Video Editing Works',
      description: 'Professional video editing projects featuring seamless transitions, cinematic color grading, and precise audio synchronization.',
      tech:        ['Premiere Pro', 'DaVinci Resolve', 'Color Correction'],
      slug:        'video-editing-works',
    },
    {
      title:       'Motion Graphic Works',
      description: 'A collection of dynamic motion graphics showcasing visual storytelling, smooth typography animations, and promotional digital assets.',
      tech:        ['After Effects', 'Keyframe Animation', 'Visual Storytelling'],
      slug:        'motion-graphic-works',
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="section-title">
        <h2>My Work</h2>
        <div className="line" />
      </div>

      <div className="projects-grid">
        {projectList.map((project, index) => {
          const cardContent = (
            <div className={`project-card glass ${project.slug ? 'project-card--clickable' : ''}`}>
              <div className="project-top">
                {/* Folder icon */}
                <div className="folder-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>

                {/* External-link icon — shown only for clickable cards */}
                {project.slug && (
                  <span className="view-gallery-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                )}
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              <ul className="project-tech-list">
                {project.tech.map((tech, i) => <li key={i}>{tech}</li>)}
              </ul>

              {project.slug && <span className="view-gallery-label">View Gallery →</span>}
            </div>
          );

          return project.slug ? (
            <Link
              to={`/projects/${project.slug}`}
              key={index}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              {cardContent}
            </Link>
          ) : (
            <div key={index}>{cardContent}</div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
