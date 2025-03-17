import React, { useState } from 'react';
import { Download, X } from 'lucide-react';
import img1 from "./img1.png";
import img2 from "./img2.png";
import logo from "./logo.png";

const FestivaGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
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

  const handleImageClick = (id) => {
    setSelectedImage(id === selectedImage ? null : id);
  };

  const handleDownload = (id) => {
    console.log(`Downloading image ${id}`);
    // Add your download logic here
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header with Logo */}
      <div className="max-w-7xl mx-auto px-4 pt-6 mb-12">
        <div className="flex items-end justify-center">
          <div className="w-24 h-24">
            <img 
              src={logo}
              alt="Festiva Logo" 
              className="object-contain w-24 h-24"
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
            <span className="text-pink-500 ml-2">Festiva Social</span>
          </h2>
          <p className="text-gray-600">
            Browse through our curated collection and click any design to download
          </p>
        </div>

        {/* Gallery Grid - Exactly 3 columns on all screen sizes */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-12">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="flex flex-col bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Image Container - Adjusted for consistent sizing */}
              <div className="aspect-[2/3] sm:aspect-[3/4] md:aspect-[9/16] relative cursor-pointer">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onClick={() => handleImageClick(image.id)}
                />
              </div>
              
              {/* Buttons - Responsive design for all screen sizes */}
              <div className="p-1 sm:p-2 flex flex-col xs:flex-row gap-1 justify-center">
                <button 
                  onClick={() => handleImageClick(image.id)}
                  className="px-1 sm:px-3 md:px-6 py-1 md:py-2 bg-pink-200 text-pink-700 rounded text-xs sm:text-sm font-medium hover:bg-pink-300 transition-all duration-200 whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  Preview
                </button>
                <button 
                  onClick={() => handleDownload(image.id)}
                  className="px-1 sm:px-3 md:px-6 py-1 md:py-2 bg-pink-500 text-white rounded text-xs sm:text-sm font-medium hover:bg-pink-600 transition-all duration-200 whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Preview */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-xl overflow-hidden">
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 text-gray-700 hover:text-pink-500 transition-colors p-1 sm:p-2 bg-white bg-opacity-70 rounded-full z-10"
              >
                <X className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3">
                  <img
                    src={images.find(img => img.id === selectedImage)?.src}
                    alt={images.find(img => img.id === selectedImage)?.alt}
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="p-3 md:p-4 md:w-1/3 flex flex-col justify-center">
                  {/* <h3 className="text-base sm:text-lg font-medium mb-2">
                    {images.find(img => img.id === selectedImage)?.alt}
                  </h3> */}
                  <button 
                    onClick={() => handleDownload(selectedImage)}
                    className="px-4 sm:px-6 py-1 sm:py-2 bg-pink-500 text-white rounded-md font-medium hover:bg-pink-600 transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Download Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How it Works Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-serif mb-3 text-center">
              How it <span className="text-pink-500">works</span>?
            </h2>
            <div className="text-gray-600 text-center text-xs sm:text-sm space-y-2">
              <p className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-xs sm:text-sm">1</span>
                Click on Preview to see the full design
              </p>
              <p className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-xs sm:text-sm">2</span>
                Click the Download button to buy your design 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivaGallery;