import { Mail, Phone } from 'lucide-react';
import './Contact.css';

// Standard Lucide SVG for Instagram
const InstagramIcon = ({ size = 26, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Standard Lucide SVG for LinkedIn
const LinkedinIcon = ({ size = 26, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Get In Touch</h2>
      <p className="contact-desc">
        I'm always open to discussing new projects, creative opportunities, or collaborations.
        Whether it's a brand film, a shoot, or a social media campaign — let's create something great together!
      </p>

      <div className="contact-glass glass">
        <div className="social-icons-container">
          <a
            href="https://www.instagram.com/abhilash_kj_?igsh=aTQxZWd2bWozMGlr"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            data-tooltip="Instagram: @abhilash_kj_"
            aria-label="Instagram"
          >
            <InstagramIcon size={26} />
          </a>

          <a
            href="https://www.linkedin.com/in/abhilash-kj-355a52299?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            data-tooltip="LinkedIn: Abhilash K J"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={26} />
          </a>

          <a
            href="mailto:backupdmemories@gmail.com"
            className="social-link"
            data-tooltip="backupdmemories@gmail.com"
            aria-label="Email Backup"
          >
            <Mail size={26} />
          </a>

          <a
            href="mailto:abhilashkj3498@gmail.com"
            className="social-link"
            data-tooltip="abhilashkj3498@gmail.com"
            aria-label="Email Primary"
          >
            <Mail size={26} />
          </a>

          <a
            href="tel:+917306442716"
            className="social-link"
            data-tooltip="+91 7306442716"
            aria-label="Phone"
          >
            <Phone size={26} />
          </a>
        </div>
      </div>

      <footer className="footer">
        <p>© Abhilash. Videographer, Photographer & Video Editor.</p>
      </footer>
    </section>
  );
};

export default Contact;
