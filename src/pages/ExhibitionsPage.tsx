import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ExhibitionsPage() {
  const exhibitions = [
    {
      id: 1,
      title: "Modern Masters",
      subtitle: "Revolutionary Works of the 20th Century",
      image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988f7?auto=format&fit=crop&q=80&w=2940",
      date: "Through December 31, 2024",
      description: "Explore groundbreaking works by Picasso, Matisse, and other pioneers who shaped modern art. This comprehensive exhibition showcases over 100 masterpieces.",
      category: "Current",
      location: "Main Gallery"
    },
    {
      id: 2,
      title: "Renaissance Revelations",
      subtitle: "Italian Masters Rediscovered",
      image: "https://images.unsplash.com/photo-1578321272125-4e4c4c3643c5?auto=format&fit=crop&q=80&w=2940",
      date: "Through January 15, 2025",
      description: "Journey through the Italian Renaissance with newly restored masterpieces. Experience the brilliance of da Vinci, Michelangelo, and their contemporaries.",
      category: "Current",
      location: "East Wing"
    },
    {
      id: 3,
      title: "Contemporary Visions",
      subtitle: "New Perspectives in Art",
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=2940",
      date: "Through March 1, 2025",
      description: "Discover emerging artists pushing boundaries in contemporary art. Features multimedia installations, digital art, and experimental works.",
      category: "Current",
      location: "Contemporary Gallery"
    }
  ];

  const upcomingExhibitions = [
    {
      id: 4,
      title: "Digital Frontiers",
      date: "Opening April 15, 2024",
      image: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?auto=format&fit=crop&q=80&w=2940",
      description: "Exploring the intersection of art and technology"
    },
    {
      id: 5,
      title: "Nature's Canvas",
      date: "Opening May 1, 2024",
      image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=2940",
      description: "Environmental art and natural inspirations"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <img
          src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=2940"
          alt="Exhibition Hall"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4 animate-[fadeInUp_1s_ease-out]">
            <h1 className="text-5xl md:text-7xl font-serif mb-6">Exhibitions</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Discover extraordinary exhibitions that inspire, educate, and transform
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