import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import farookImage from '../assets/images/farook.png';
import './About.css';

const About: React.FC = () => {
  const location = useLocation();
  return (
    <div className="about-page">
      <header className="header-bar">
        <Link to="/" className="logo-link" style={{ width: '200px', minWidth: '200px' }}>
          <span className="logo-text">withFarook</span>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
          <Link to="/contact-us" className={`nav-link ${location.pathname === '/contact-us' ? 'active' : ''}`}>Contact Us</Link>
        </nav>
      </header>
      <main className="about-main">
        <div className="about-hero-grid">
          <div className="about-image-container">
            <div className="about-image-border"></div>
            <div className="about-image" style={{ backgroundImage: `url(${farookImage})` }}>
            <div className="about-image-overlay">
              <p className="about-image-name">Farook</p>
              <p className="about-image-label">The Chief</p>
            </div>
            </div>
          </div>
          <div className="about-hero-content">
            <div className="about-hero-header">
              <h1 className="about-hero-title">
                WHO ARE<br/>WE
              </h1>
              <div className="about-hero-divider"></div>
            </div>
            <div className="about-hero-text">
              <p className="about-hero-lead">
                withFarook is more than a personal portfolio—it's a commitment to the community that helped me grow.
              </p>
              <div className="about-hero-description">
                <p>
                  I'm passionate about nurturing future tech talent, sharing knowledge, and creating opportunities for the next generation of builders and innovators.
                </p>
                <p>But it's not just about teaching; it's about listening.</p>
                <p>
                  
                  I love hearing the stories of people I meet—their challenges, their dreams, their unique perspectives—and helping bring their ideas to life.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="about-ecosystem">
          <div className="about-ecosystem-header">
            <div className="about-ecosystem-title-section">
              <h2 className="about-ecosystem-title">OUR ECOSYSTEM</h2>
              <p className="about-ecosystem-subtitle">Specialized verticals working in synergy to provide a comprehensive 360° creative solution for modern industry leaders.</p>
            </div>
            <div className="about-ecosystem-divider"></div>
            <div className="about-ecosystem-label">
              <span>Verticals 01-04</span>
            </div>
          </div>
          <div className="about-ecosystem-grid">
            <div className="about-ecosystem-card">
              <div className="about-ecosystem-icon-wrapper">
                <span className="material-symbols-outlined about-ecosystem-icon">terminal</span>
              </div>
              <div className="about-ecosystem-card-content">
                <h3 className="about-ecosystem-card-title">CODE <span className="about-ecosystem-cursive">withFarook</span></h3>
                <p className="about-ecosystem-card-text">Bespoke software and high-end technical architecture.</p>
              </div>
            </div>
            <div className="about-ecosystem-card">
              <div className="about-ecosystem-icon-wrapper">
                <span className="material-symbols-outlined about-ecosystem-icon">rocket_launch</span>
              </div>
              <div className="about-ecosystem-card-content">
                <h3 className="about-ecosystem-card-title">NEXTGEN <span className="about-ecosystem-cursive">withFarook</span></h3>
                <p className="about-ecosystem-card-text">Incubating innovation and future-tech methodologies.</p>
              </div>
            </div>
            <div className="about-ecosystem-card">
              <div className="about-ecosystem-icon-wrapper">
                <span className="material-symbols-outlined about-ecosystem-icon">token</span>
              </div>
              <div className="about-ecosystem-card-content">
                <h3 className="about-ecosystem-card-title">BRAND <span className="about-ecosystem-cursive">withFarook</span></h3>
                <p className="about-ecosystem-card-text">Visual identity and architectural brand philosophy.</p>
              </div>
            </div>
            <div className="about-ecosystem-card">
              <div className="about-ecosystem-icon-wrapper">
                <span className="material-symbols-outlined about-ecosystem-icon">movie_filter</span>
              </div>
              <div className="about-ecosystem-card-content">
                <h3 className="about-ecosystem-card-title">STORIES <span className="about-ecosystem-cursive">withFarook</span></h3>
                <p className="about-ecosystem-card-text">Narrative content production and digital storytelling.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="about-footer">
        <div className="about-footer-content">
          <div className="about-footer-copyright">
            © 2024 WITHFAROOK AGENCY. ALL RIGHTS RESERVED.
          </div>
          <div className="about-footer-links">
            <a href="#" className="about-footer-link">Instagram</a>
            <a href="#" className="about-footer-link">Behance</a>
            <a href="#" className="about-footer-link">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
