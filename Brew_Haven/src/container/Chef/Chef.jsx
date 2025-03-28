import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Chef.css';

const Chef = () => (
  <div className="app__bg app__wrapper section__padding">
    <div className="app__chef-container">
      <div className="app__chef-image">
        <img src={images.chef} alt="chef_image" />
        {/* <div className="experience-badge">
          <span>15+</span>
          <p>Years of Excellence</p>
        </div> */}
      </div>
      <div className="app__chef-content">
        <SubHeading title="Master Chef" />
        <h1 className="headtext__cormorant">Culinary Mastery</h1>
        <div className="quote-block">
          <img src={images.quote} alt="quote" />
          <p className="p__opensans">Cooking is an art that transforms simple ingredients into extraordinary experiences.</p>
        </div>
        <p className="p__opensans">With passion for culinary excellence, we blend traditional techniques with modern innovation. Every dish tells a unique story.</p>
        <div className="app__chef-signature">
          <p>Kevin   </p>
          <p className="p__opensans">Executive Chef</p>
          <img src={images.sign} alt="signature" />
        </div>
      </div>
    </div>
  </div>
);

export default Chef;
