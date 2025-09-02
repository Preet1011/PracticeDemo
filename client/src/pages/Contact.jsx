import React from 'react';

export default function Contact() {
  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent (demo)');
  };

  return (
    <div className="col-md-8 mx-auto">
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input 
            className="form-control" 
            placeholder="Name" 
            required 
          />
        </div>

        <div className="mb-2">
          <input 
            className="form-control" 
            placeholder="Email" 
            type="email" 
            required 
          />
        </div>

        <div className="mb-2">
          <textarea 
            className="form-control" 
            rows="5" 
            placeholder="Message" 
            required 
          ></textarea>
        </div>

        <button className="btn btn-primary">Send</button>
      </form>
    </div>
  );
}
