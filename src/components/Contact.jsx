import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Get In Touch</h2>
      <p className="contact-desc">
        I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
      </p>
      
      <div className="contact-glass glass">
        <div style={{ marginBottom: '20px' }}>
          <p><strong>Email:</strong> rahulpr167@gmail.com</p>
          <p><strong>Phone:</strong> +91 9605224904</p>
          <p><strong>Location:</strong> Mananthavady, India</p>
          <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/rahul-pr-" target="_blank" rel="noreferrer" style={{color: 'var(--accent)'}}>linkedin.com/in/rahul-pr-</a></p>
        </div>
        <a href="mailto:rahulpr167@gmail.com" className="btn-primary" style={{ display: 'inline-block' }}>
          Say Hello
        </a>
      </div>
      
      <footer className="footer">
        <p>Built by Rahul Pr. Videographer, Photographer & Video Editor.</p>
      </footer>
    </section>
  );
};

export default Contact;
