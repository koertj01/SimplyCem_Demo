import React from 'react';
import { Button } from '@mui/material';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-description">Oops! The page you're looking for doesn't exist.</p>
        <div className="not-found-animation">
          <div className="ghost">
            <div className="face">
              <div className="eye"></div>
              <div className="eye right"></div>
              <div className="mouth"></div>
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.href = '/'}
        >
          Go Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
