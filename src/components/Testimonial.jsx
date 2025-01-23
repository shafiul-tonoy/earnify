import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonial() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "John Martin",
      role: "Freelancer",
      image: "https://i.ibb.co.com/CH0QFL2/austin-distel-7uo-Mmz-Pd2-JA-unsplash.jpg",
      quote: "This platform has been a game-changer for me. The interface is user-friendly, and the opportunities are endless!",
      rating: 5
    },
    {
      id: 2,
      name: "Atik Hassan",
      role: "Digital Marketer",
      image: "https://i.ibb.co.com/vxpnVBM/aatik-tasneem-7om-HUGhhm-Z0-unsplash.jpg",
      quote: "I love how easy it is to find and complete tasks. The payments are quick, and the support team is fantastic!",
      rating: 5
    },
    {
      id: 3,
      name: "Alex Johnson",
      role: "Content Creator",
      image: "https://i.ibb.co.com/nr8kkzk/ali-morshedlou-WMD64t-Mfc4k-unsplash.jpg",
      quote: "A fantastic experience! I've recommended this platform to all my friends.",
      rating: 4
    },
    {
      id: 4,
      name: "Mahfuz Anam",
      role: "Virtual Assistant",
      image: "https://i.ibb.co.com/3mz6djg/farhan-shaikh-MWhi-Dt-ea4-unsplash.jpg",
      quote: "Reliable, efficient, and rewarding! I couldn't be happier with my experience here.",
      rating: 5
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          What Our Users Say
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover why thousands of professionals choose our platform for their work needs
        </p>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-xl shadow-lg p-8 h-full transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center mb-6">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex mb-4">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                      <p className="text-gray-600 italic flex-grow">
                        "{testimonial.quote}"
                      </p>
                      
                      <div className="mt-6 flex justify-end">
                        <div className="w-8 h-1 bg-blue-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}