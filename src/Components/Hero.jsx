import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    title: "Latest Arrivals",
    subtitle: "Our Bestsellers",
    description: "Discover trending fashion pieces"
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    title: "Summer Collection",
    subtitle: "Hot This Season",
    description: "Stay cool with our summer styles"
  },
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
    title: "New Accessories",
    subtitle: "Complete Your Look",
    description: "Perfect finishing touches"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Memoize current slide data
  const currentSlideData = useMemo(() => slides[currentSlide], [currentSlide]);

  // ✅ Memoize slide change function
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // ✅ Auto-slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mt-10 relative">
      <div className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        
        {/* Left Side */}
        <div className="w-full sm:w-1/2 flex justify-center items-center py-10 sm:py-0 px-6 sm:px-10 bg-gradient-to-br from-gray-50 to-white">
          <div className="text-[#414141] max-w-md">
            
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 md:w-11 h-[2px] bg-[#414141]"></span>
              <p className="font-medium text-sm md:text-base tracking-wider uppercase">
                {currentSlideData.subtitle}
              </p>
            </div>

            <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed font-bold text-gray-900 mb-4">
              {currentSlideData.title}
            </h1>

            <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
              {currentSlideData.description}
            </p>

            <Link 
              to="/collection"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <span>Shop Now</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <div className="flex gap-2 mt-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-black w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="w-full sm:w-1/2 relative overflow-hidden min-h-[300px] sm:min-h-[400px]">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={`${slide.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`}
              alt={slide.title}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;