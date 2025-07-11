import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

const TermsModal = () => {
  const [accepted, setAccepted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Check if terms were accepted
  useEffect(() => {
    const acceptedTerms = localStorage.getItem("acceptedTerms");
    if (acceptedTerms === "true") {
      setAccepted(true);
    } else {
      // Add slight delay for better UX when page loads
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("acceptedTerms", "true");
    setIsVisible(false);
    // Wait for animation to complete before setting accepted
    setTimeout(() => setAccepted(true), 300);
  };

  const handleDecline = () => {
    // More elegant way to handle decline
    window.location.href = "https://www.google.com";
  };

  if (accepted) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className={`bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl transform transition-all duration-300 ${
          isVisible ? 'scale-100' : 'scale-95'
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Terms & Conditions</h2>
          <button 
            onClick={handleDecline}
            aria-label="Close terms modal"
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <p className="mb-6 text-gray-600">
          By using our website, you agree to our{" "}
          <Link 
            to="/terms" 
            className="text-indigo-600 hover:text-indigo-800 underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms & Conditions
          </Link>{" "}
          and acknowledge our{" "}
          <Link 
            to="/privacy" 
            className="text-indigo-600 hover:text-indigo-800 underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </Link>.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={handleAccept}
            className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Accept & Continue
          </button>
          <button
            onClick={handleDecline}
            className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Decline
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          You must accept to use this service
        </p>
      </div>
    </div>
  );
};

export default TermsModal;