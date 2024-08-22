import React from 'react';
import './Loading.css';
import './CommonStyles.css';

const Loading: React.FC = () => {
  return (
    <div className="loading-container box flex-center">
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
    </div>
  );
};

export default Loading;
