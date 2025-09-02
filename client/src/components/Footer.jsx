import React from 'react';

export default function Footer(){
  return (
    <footer className="mt-5 py-4">
      <div className="container text-center">
        <p className="mb-1">Made by Preet Tyagi © {new Date().getFullYear()}</p>
        <small className="text-muted">Interview friendly MERN demo</small>
      </div>
    </footer>
  );
}
