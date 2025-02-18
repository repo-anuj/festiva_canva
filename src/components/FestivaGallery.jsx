import React from 'react';
import { Download, ArrowRight } from 'lucide-react';
import img1 from "./img1.png"
import img2 from "./img2.png"
import logo from "./logo.png"

const FestivaGallery = () => {
  const images = [
    {
      id: 1,
      src: img1,
      alt: "Festival Moment 1"
    },
    {
      id: 2,
      src: img2,
      alt: "Festival Moment 2"
    },
    {
      id: 3,
      src: img1,
      alt: "Festival Moment 3"
    },
    {
      id: 4,
      src: img2,
      alt: "Festival Moment 4"
    },
    {
      id: 5,
      src: img1,
      alt: "Festival Moment 5"
    },
    {
      id: 6,
      src: img2,
      alt: "Festival Moment 6"
    }
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header with Logo */}
      <div className="max-w-7xl mx-auto px-4 pt-6 mb-12">
        <div className="flex justify-between items-center">
          <div className="w-28 h-16">
          <img
            src={logo}
            alt="Festiva Logo"
            className="h-28 md:h-25 object-contain"
          />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Message Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif mb-3">
            Create your perfect festival moments with
            <span className="text-pink-500 ml-2">Festiva</span>
          </h2>
          <p className="text-gray-600">
            Browse through our curated collection of festival-ready designs
          </p>
        </div>

        {/* Gallery Grid - More Compact */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <div className="aspect-[9/16] bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button className="absolute bottom-3 right-3 p-3 bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-500 hover:text-white">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Download All Button */}
        <div className="text-center mb-16">
          <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-pink-500 text-white rounded-full font-medium shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:bg-pink-600 transition-all duration-300">
            <span>Download All Designs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* How it Works Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-serif mb-3 text-center">
              How it <span className="text-pink-500">works</span>?
            </h2>
            <p className="text-gray-600 text-center text-sm">
              Browse through our collection, find your perfect festival designs, and download them instantly. 
              Create stunning social media content that captures the spirit of your event!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivaGallery;