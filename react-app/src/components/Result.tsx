import React, { useEffect, useState } from 'react';
import './Result.css';

interface ResultProps {
  correctAnswers: number;
  totalQuestions: number;
}

const Result: React.FC<ResultProps> = ({
  correctAnswers,
  totalQuestions,
}) => {
  const radius = 60; // Kiinteä arvo CSS:ssä määritetyn SVG:n koon perusteella
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  const percentage = (correctAnswers / totalQuestions) * 100;

  useEffect(() => {
    let start = 0;
    const duration = 3500; // Animaation kesto millisekunteina (3.5 sekuntia)
    const frameDuration = 16;
    const totalFrames = Math.round(duration / frameDuration);
    let currentFrame = 0;

    const animate = () => {
      const progressPercentage = easeOutQuad(currentFrame / totalFrames) * percentage;
      setProgress(progressPercentage);
      setDisplayedPercentage(Math.round(progressPercentage));

      if (currentFrame < totalFrames) {
        currentFrame++;
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [percentage]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const easeOutQuad = (t: number) => t * (2 - t);

  return (
    <div className="result-container">
      <svg
        className="result-svg"
        viewBox="0 0 150 150" /* Muista muuttaa viewBox vastaamaan SVG:n kokoa */
      >
        <circle
          className="circle-bg"
          r={radius}
          cx="75" /* SVG:n puoliväli, koska viewBox on 0 0 150 150 */
          cy="75" /* SVG:n puoliväli, koska viewBox on 0 0 150 150 */
        />
        <circle
          className="circle-fg"
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={radius}
          cx="75" /* SVG:n puoliväli, koska viewBox on 0 0 150 150 */
          cy="75" /* SVG:n puoliväli, koska viewBox on 0 0 150 150 */
        />
      </svg>
      <div className="percentage-text">
        {displayedPercentage}%
      </div>
    </div>
  );
};

export default Result;
