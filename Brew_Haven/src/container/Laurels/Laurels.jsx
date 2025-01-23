import React from 'react';

import { SubHeading } from '../../components';
import { images, data } from '../../constants';
import './Laurels.css';

const AwardCard = ({ award: { imgUrl, title, subtitle } }) => (
  <div className="app__laurels_awards-card">
    <div className="award-content">
      <div className="award-icon">
        <img src={imgUrl} alt="award icon" />
      </div>
      <div className="award-details">
        <h3 className="p__cormorant">{title}</h3>
        <p className="p__opensans">{subtitle}</p>
      </div>
    </div>
    <div className="award-backdrop"></div>
  </div>
);

const Laurels = () => (
  <div className="app__bg app__wrapper section__padding" id="awards">
    <div className="app__wrapper_info">
      <SubHeading title="Awards & recognition" />
      <h1 className="headtext__cormorant">Our Laurels</h1>
      
      <div className="awards-container">
        <div className="awards-left">
          {data.awards.slice(0, 2).map((award) => (
            <AwardCard award={award} key={award.title} />
          ))}
        </div>
        <div className="awards-right">
          {data.awards.slice(2).map((award) => (
            <AwardCard award={award} key={award.title} />
          ))}
        </div>
      </div>
    </div>

    <div className="app__wrapper_img">
      <img src={images.laurels} alt="laurels" className="laurels-image" />
    </div>
  </div>
);

export default Laurels;
