import React, { useState } from 'react';
import { Download, X, Clock as Click } from 'lucide-react';
import img1 from "./img1.png"
import img2 from "./img2.png"
import logo from "./logo.png"

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

  const handleDownload = (id, e) => {
    e.stopPropagation();
    console.log(`Downloading image ${id}`);
    // Add your download logic here
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header with Logo */}
      <div className="max-w-7xl mx-auto px-4 pt-6 mb-12">
        <div className=" items-end">
          <div className="w-24"></div> {/* Spacer for balance */}
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
            <span className="text-pink-500 ml-2">Festiva</span>
          </h2>
          <p className="text-gray-600">
            Browse through our curated collection and click any design to download
          </p>
        </div>

        {/* Gallery Grid - iStock Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="relative cursor-pointer group"
              onClick={() => handleImageClick(image.id)}
            >
              <div className="aspect-[9/16] bg-white rounded-xl overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {/* <Click className="w-8 h-8 text-white animate-bounce" /> */}
                </div>

                {/* Selection Overlay */}
                {selectedImage === image.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 transition-all flex flex-col items-center justify-center">
                    <button 
                      onClick={(e) => handleDownload(image.id, e)}
                      className="mb-2 px-6 py-2 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-all duration-200 flex items-center gap-2 hover:scale-105"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Now</span>
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                      }}
                      className="mt-2 text-white text-sm hover:text-pink-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Image Label */}
              <div className="absolute bottom-2 left-2 right-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
            </div>
          ))}
        </div>

        {/* How it Works Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-serif mb-3 text-center">
              How it <span className="text-pink-500">works</span>?
            </h2>
            <div className="text-gray-600 text-center text-sm space-y-2">
              <p className="flex items-center justify-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">1</span>
                Click on any design you like to select it
              </p>
              <p className="flex items-center justify-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">2</span>
                Click the Download button to buy you design 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivaGallery;