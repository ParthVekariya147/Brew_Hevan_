import React from 'react';
import './FindUs.css';
import { SubHeading } from '../../components';
import { images } from '../../constants';

const FindUs = () => (
  <div className="findUs__container" id="contact">
    <div className="findUs__content">
      <div className="findUs__info">
        <SubHeading title="Contact" />
        <h1 className="headtext__cormorant">Find Us</h1>
        
        <div className="findUs__address">
          <p className="p__opensans">
            1234, Brew Haven Lane
            <br />Vesu Main Road
            <br />Vesu, Surat
            <br />Gujarat 395007
            </p>
        </div>

        <div className="findUs__hours">
          <h3 className="findUs__hours-title">Opening Hours</h3>
          <div className="findUs__hours-item">
            <span>Monday - Friday</span>
            <span>10:00 am - 02:00 am</span>
          </div>
          <div className="findUs__hours-item">
            <span>Saturday - Sunday</span>
            <span>10:00 am - 03:00 am</span>
          </div>
        </div>

        <button type="button" className="findUs__button">
          Visit Us
        </button>
      </div>

      <div className="findUs__image">
        <img src={images.findus} alt="find us" />
      </div>
    </div>
  </div>
);

export default FindUs;
