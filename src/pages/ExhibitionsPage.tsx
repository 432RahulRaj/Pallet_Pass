import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import images
import heroImage from '../assets/indian-art-exhibition-picture-that-can-be-put-up-a (1).jpg';
import pattachitraImage from '../assets/pattachitra-depiction-focus--with-people-reviewing.jpg';
import danceImage from '../assets/focus-on-a-human-reviewing-indian-art-and-paint-ex (2).jpg';
import warliImage from '../assets/large-warli-art-depiction-with-people-reviewing-it.jpg';
import upcomingImage1 from '../assets/indian-art-and-paint-outdoor hlght.jpg';
import upcomingImage2 from '../assets/indian-art-exhibition-picture-that-can-be-put-up-a.jpg';

export function ExhibitionsPage() {
  const exhibitions = [
    {
      id: 1,
      title: "Pattachitra Heritage",
      subtitle: "Traditional Art of Odisha",
      image: pattachitraImage,
      date: "Through December 31, 2024",
      description: "Explore the ancient art of Pattachitra, traditional cloth-based scroll painting from Odisha. This comprehensive exhibition showcases over 100 masterpieces depicting mythological narratives and folk tales.",
      category: "Current",
      location: "Main Gallery"
    },
    {
      id: 2,
      title: "Classical Indian Dance",
      subtitle: "Expressions of Divine Movement",
      image: danceImage,
      date: "Through January 15, 2025",
      description: "Journey through India's rich tradition of classical dance forms including Bharatanatyam, Kathak, Odissi, and Kuchipudi. Experience the spiritual and artistic heritage through sculptures, paintings, and live performances.",
      category: "Current",
      location: "East Wing"
    },
    {
      id: 3,
      title: "Warli Folk Art",
      subtitle: "Tribal Heritage of Maharashtra",
      image: warliImage,
      date: "Through March 1, 2025",
      description: "Discover the ancient Warli painting tradition of Maharashtra's tribal communities. These geometric art forms tell stories of daily life, nature, and spirituality through simple yet profound imagery.",
      category: "Current",
      location: "Folk Art Gallery"
    }
  ];

  const upcomingExhibitions = [
    {
      id: 4,
      title: "Outdoor Art Installations",
      date: "Opening April 15, 2024",
      image: upcomingImage1,
      description: "Contemporary Indian art in natural settings"
    },
    {
      id: 5,
      title: "Traditional Craft Revival",
      date: "Opening May 1, 2024",
      image: upcomingImage2,
      description: "Master craftsmen preserving ancient techniques"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <img
          src={heroImage}
          alt="Indian Art Exhibition Hall"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4 animate-[fadeInUp_1s_ease-out]">
            <h1 className="text-5xl md:text-7xl font-serif mb-6">Exhibitions</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Discover extraordinary exhibitions celebrating India's rich cultural heritage
            </p>
          </div>
        </div>
      </section>

      {/* Current Exhibitions */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif mb-12 animate-[fadeInUp_1s_ease-out]">
            Current Exhibitions
          </h2>
          <div className="grid grid-cols-1 gap-12">
            {exhibitions.map((exhibition, index) => (
              <div 
                key={exhibition.id}
                className="group grid md:grid-cols-2 gap-8 items-center animate-[fadeInUp_1s_ease-out]"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={exhibition.image}
                    alt={exhibition.title}
                    className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <Calendar className="text-indigo-600 mr-2" size={20} />
                    <span className="text-indigo-600">{exhibition.date}</span>
                  </div>
                  <h3 className="text-3xl font-serif mb-2">{exhibition.title}</h3>
                  <p className="text-xl text-gray-600 mb-4">{exhibition.subtitle}</p>
                  <p className="text-gray-700 mb-6">{exhibition.description}</p>
                  <Link
                    to="/booking"
                    className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Book Now
                    <ArrowRight size={20} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Exhibitions */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif mb-12 animate-[fadeInUp_1s_ease-out]">
            Upcoming Exhibitions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingExhibitions.map((exhibition, index) => (
              <div
                key={exhibition.id}
                className="group bg-white rounded-lg overflow-hidden shadow-lg animate-[fadeInUp_1s_ease-out]"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={exhibition.image}
                    alt={exhibition.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif mb-2">{exhibition.title}</h3>
                  <p className="text-indigo-600 mb-3">{exhibition.date}</p>
                  <p className="text-gray-700">{exhibition.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}