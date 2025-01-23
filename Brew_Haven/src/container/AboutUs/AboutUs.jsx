import React, { useEffect } from 'react';

import { images } from '../../constants';
import './AboutUs.css';

const AboutUs = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
      reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <div className="app__aboutus app__bg flex__center section__padding" id="about">
      <div className="app__aboutus-overlay flex__center">
        <img src={images.G} alt="G_overlay" />
      </div>

      <div className="app__aboutus-content flex__center">
        <div className="app__aboutus-content_about scroll-reveal">
          <h1 className="headtext__cormorant">About Us</h1>
          <img src={images.spoon} alt="about_spoon" className="spoon__img" />
          <p className="p__opensans">
            Welcome to Brew Haven, where we blend comfort with quality. Our café is more than just a place to enjoy a great cup of coffee; it's a community hub designed to offer a warm, inviting atmosphere for everyone. 
            Founded with a passion for crafting the perfect cup and providing a welcoming space, Brew Haven has become a cherished spot for locals and visitors alike.
          </p>
          <button type="button" className="custom__button">Discover More</button>
        </div>

        <div className="app__aboutus-content_knife flex__center scroll-reveal">
          <img src={images.knife} alt="about_knife" />
        </div>

        <div className="app__aboutus-content_history scroll-reveal">
          <h1 className="headtext__cormorant">Our History</h1>
          <img src={images.spoon} alt="about_spoon" className="spoon__img" />
          <p className="p__opensans">
            Brew Haven began with a simple vision: to create a place where exceptional coffee meets a cozy, communal space. Over the years, we've grown from a small local café into a beloved destination for those seeking quality and connection.
            Our commitment to using the finest ingredients and providing top-notch service has helped us build lasting relationships with our guests. We continue to innovate and evolve, always staying true to our core values of excellence and community.
          </p>
          <button type="button" className="custom__button">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
