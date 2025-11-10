import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

//  Slides defined outside the component (no re-creation)
const slides = [
  {
    // Optimized Unsplash images with parameters
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    title: "Latest Arrivals",
    subtitle: "Our Bestsellers",
    description: "Discover trending fashion pieces"
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    title: "Summer Collection",
    subtitle: "Hot This Season",
    description: "Stay cool with our summer styles"
  },
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
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
        
        {/* Left Side - Content */}
        <div className="w-full sm:w-1/2 flex justify-center items-center py-10 sm:py-0 px-6 sm:px-10 bg-gradient-to-br from-gray-50 to-white">
          <div className="text-[#414141] max-w-md">
            
            {/* Subtitle with line */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 md:w-11 h-[2px] bg-[#414141]" aria-hidden="true"></span>
              <p className="font-medium text-sm md:text-base tracking-wider uppercase">
                {currentSlideData.subtitle}
              </p>
            </div>

            {/* Main title */}
            <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed font-bold text-gray-900 mb-4">
              {currentSlideData.title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
              {currentSlideData.description}
            </p>

            {/* CTA Button */}
            <Link 
              to="/collection"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <span>Shop Now</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Slide indicators -  OPTIMIZED */}
            <div className="flex gap-2 mt-6" role="tablist" aria-label="Carousel navigation">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide 
                      ? 'bg-black w-8 h-3' 
                      : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentSlide}
                  role="tab"
                  //  Minimum touch target size (44x44px)
                  style={{ 
                    minWidth: '44px', 
                    minHeight: '44px',
                    padding: '15px 10px'
                  }}
                />
              ))}
            </div>

          </div>
        </div>

        {/* Right Side - Image Slider  OPTIMIZED */}
        <div className="w-full sm:w-1/2 relative overflow-hidden min-h-[300px] sm:min-h-[400px]">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={slide.title}
             
              width="800"
              height="525"
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
      
              loading={index === 0 ? 'eager' : 'lazy'}
           
              fetchPriority={index === 0 ? 'high' : 'low'}
        
              decoding="async"
       
              srcSet={`
                ${slide.image}&w=400 400w,
                ${slide.image}&w=800 800w,
                ${slide.image}&w=1200 1200w
              `}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;