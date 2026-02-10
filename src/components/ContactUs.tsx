import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ContactUs.css';

const ContactUs: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    typeOfQuery: '',
    projectBrief: ''
  });
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const interests = ['CODE', 'NEXTGEN', 'BRAND', 'STORIES'];
  const queryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'project', label: 'Project Proposal' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'support', label: 'Support' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQueryTypeSelect = (value: string) => {
    setFormData({
      ...formData,
      typeOfQuery: value
    });
    setIsDropdownOpen(false);
  };

  const getQueryTypeLabel = () => {
    const selected = queryTypes.find(type => type.value === formData.typeOfQuery);
    return selected ? selected.label : 'Select...';
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, interests: selectedInterests });
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', typeOfQuery: '', projectBrief: '' });
    setSelectedInterests([]);
  };

  return (
    <div className="contact-page">
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
      <main className="contact-main">
        <div className="contact-form-glow"></div>
        <div className="contact-container">
          <div className="contact-header">
            <h1 className="contact-title">
              LET'S TALK
            </h1>
            <p className="contact-subtitle">
              Ready to build something amazing together.
            </p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                name="name"
                className="form-input-large"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-input-large"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Type of Query</label>
                <div className="custom-dropdown" ref={dropdownRef}>
                  <button
                    type="button"
                    className={`custom-dropdown-toggle ${formData.typeOfQuery ? 'has-value' : ''} ${isDropdownOpen ? 'open' : ''}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span>{getQueryTypeLabel()}</span>
                    <span className="dropdown-arrow">▼</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="custom-dropdown-menu">
                      {queryTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          className={`custom-dropdown-option ${formData.typeOfQuery === type.value ? 'selected' : ''}`}
                          onClick={() => handleQueryTypeSelect(type.value)}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <input
                    type="hidden"
                    name="typeOfQuery"
                    value={formData.typeOfQuery}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Related to</label>
              <div className="interest-chips">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    className={`interest-chip ${selectedInterests.includes(interest) ? 'active' : ''}`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">MESSAGE</label>
              <textarea
                name="projectBrief"
                className="form-textarea-large"
                placeholder="Tell us about your vision..."
                rows={2}
                value={formData.projectBrief}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-submit-group">
              <button type="submit" className="submit-button-simple">
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
      <footer className="contact-footer">
        <div className="contact-footer-content">
          <div className="contact-footer-copyright">
            © 2024 WITHFAROOK AGENCY. ALL RIGHTS RESERVED.
          </div>
          <div className="contact-footer-links">
            <a href="#" className="contact-footer-link">Instagram</a>
            <a href="#" className="contact-footer-link">Behance</a>
            <a href="#" className="contact-footer-link">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
