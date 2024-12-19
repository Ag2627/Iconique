import React from 'react';
import './AboutUs.css';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Header Section */}
      <header className="header-section">
        <h1>About Us</h1>
        <p>Your journey to know us better starts here.</p>
      </header>

      {/* Story Section */}
      <section className="story-section">
        <h2>Our Story</h2>
        <p>
          {/* Add a placeholder for a story here */}
          We started with a mission to bring people closer through technology. Our goal is to innovate and inspire change across the industry.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          {/* Add a placeholder for mission content here */}
          Our mission is to foster a community that encourages creativity, inclusivity, and progress.
        </p>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-carousel">
          {/* This could be a map of team members for dynamic rendering */}
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h3>Ananya Gupta</h3>
        
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h3>Khushboo Solanki</h3>
         
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h3>Vani Charpe</h3>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Want to join our journey?</h2>
        <Link to='/contact'>
        <button className="cta-button">Contact Us</button>
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
