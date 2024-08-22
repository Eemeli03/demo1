import React from 'react';
import './FinalScreen.css';

interface FinalScreenProps {
  onRetry: () => void;
  onUploadAnother: () => void;
}

const FinalScreen: React.FC<FinalScreenProps> = ({ onRetry, onUploadAnother }) => {
  return (
    <div className="final-screen-container">
      <button className="final-button" onClick={onUploadAnother}>
        <span>Upload file</span>
      </button>
      <button className="final-button" onClick={onRetry}>
        <span>Replay</span>
      </button>
    </div>
  );
};

export default FinalScreen;
