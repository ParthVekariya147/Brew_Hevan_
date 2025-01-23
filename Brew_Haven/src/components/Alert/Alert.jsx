import React, { useEffect } from 'react';
import './Alert.css';

const Alert = ({ type = 'success', message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      <span className="alert-close" onClick={onClose}>&times;</span>
    </div>
  );
};

export default Alert;
