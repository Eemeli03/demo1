import React from 'react';
import './App.css';
import Upload from './components/Upload';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Upload />
      </header>
    </div>
  );
};

export default App;
