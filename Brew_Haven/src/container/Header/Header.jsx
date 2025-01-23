// import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// import { SubHeading } from '../../components';
// import { images } from '../../constants';
// import './Header.css';

// const Header = () => (
//   <div className="app__header app__wrapper section__padding" id="home">
//     <div className="app__wrapper_info">
//       <SubHeading title="Chase the new flavour" />
//       <h1 className="app__header-h1">The Key To Fine Dining</h1>
//       <p className="p__opensans" style={{ margin: '2rem 0' }}>
//         Sit tellus lobortis sed senectus vivamus molestie. Condimentum volutpat morbi facilisis quam scelerisque sapien. Et, penatibus aliquam amet tellus
//       </p>
//       {/* Wrap the button with Link and set it to navigate to the /menu route */}
//       <Link to="/menu">
//         <button type="button" className="custom__button">Explore Menu</button>
//       </Link>
//     </div>

//     <div className="app__wrapper_img">
//       <img src={images.welcome} alt="header_img" />
//     </div>
//   </div>
// );

// export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const Header = () => (
  <div className="app__header app__wrapper section__padding" id="home">
    <div className="app__wrapper_info">
      <SubHeading title="Experience Culinary Excellence" />
      <h1 className="app__header-h1">Modern Fine Dining in the Heart of the City</h1>
      <p className="p__opensans" style={{ margin: '2rem 0', lineHeight: '1.8' }}>
        Welcome to an extraordinary dining experience where tradition meets innovation. Our master chefs craft each dish with passion, using the finest locally-sourced ingredients to create memorable culinary moments.
      </p>
      <div className="app__header-buttons" style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/menu">
          <button 
            type="button" 
            className="custom__button"
            style={{
              background: 'transparent',
              color: 'var(--color-golden)',
              padding: '0.75rem 2rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              borderRadius: '5px',
              border: '2px solid var(--color-golden)',
              transition: 'all 0.3s ease'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'var(--color-golden)';
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'var(--color-golden)';
              e.target.style.color = 'var(--color-black)';
            }}
          >
            View Menu
          </button>
        </Link>
        <Link to="/book-table">
          <button 
            type="button" 
            className="custom__button"
            style={{
              background: 'transparent',
              color: 'var(--color-golden)',
              padding: '0.75rem 2rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              borderRadius: '5px',
              border: '2px solid var(--color-golden)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'var(--color-golden)';
              e.target.style.color = 'var(--color-black)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'var(--color-golden)';
            }}
          >
            Book a Table
          </button>
        </Link>
      </div>
      <div className="app__header-features" style={{ marginTop: '3rem', display: 'flex', gap: '2rem' }}>
        <div className="feature">
          <img src={images.award02} alt="award" style={{ width: '45px' }} />
          <p className="p__cormorant" style={{ color: 'var(--color-golden)', marginTop: '0.5rem' }}>
            Fine Dining
          </p>
        </div>
        <div className="feature">
          <img src={images.award01} alt="award" style={{ width: '45px' }} />
          <p className="p__cormorant" style={{ color: 'var(--color-golden)', marginTop: '0.5rem' }}>
            Master Chefs
          </p>
        </div>
        <div className="feature">
          <img src={images.award05} alt="award" style={{ width: '45px' }} />
          <p className="p__cormorant" style={{ color: 'var(--color-golden)', marginTop: '0.5rem' }}>
            Premium Service
          </p>
        </div>
      </div>
    </div>

    <div className="app__wrapper_img">
      <div className="header-image-container" style={{ position: 'relative' }}>
        <img src={images.welcome} alt="header_img" style={{ maxWidth: '100%', borderRadius: '15px' }} />
        <div className="image-overlay" style={{ 
          position: 'absolute',
          bottom: '20px',
          right: '-20px',
          background: 'var(--color-black)',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}>
          <p className="p__cormorant" style={{ color: 'var(--color-golden)' }}>
            Open Hours
          </p>
          <p className="p__opensans">
            Mon - Fri: 10:00 am - 11:00 pm
          </p>
          <p className="p__opensans">
            Sat - Sun: 10:00 am - 12:00 am
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Header;




