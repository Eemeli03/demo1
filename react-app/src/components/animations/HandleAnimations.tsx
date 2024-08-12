import React, { useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './HandleAnimations.css';

interface HandleAnimationsProps {
  in: boolean;
  children: React.ReactNode;
}

const HandleAnimations: React.FC<HandleAnimationsProps> = ({ in: inProp, children }) => {
  const nodeRef = useRef(null);

  return (
    <TransitionGroup component={null}>
      {inProp && (
        <CSSTransition nodeRef={nodeRef} key="content" timeout={300} classNames="fade">
          <div ref={nodeRef} className="transition-wrapper">
            {children}
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

export default HandleAnimations;
