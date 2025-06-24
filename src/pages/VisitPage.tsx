import React, { useEffect, useRef } from 'react';
import { Clock, MapPin, Calendar, Users, Ticket, ArrowRight, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function VisitPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const visitInfo = [
    {
      icon: Clock,
      title: "Hours",
      details: [
        "Monday - Thursday: 10:00 AM - 5:30 PM",
        "Friday: 10:00 AM - 9:00 PM",
        "Saturday - Sunday: 10:00 AM - 5:30 PM"
      ]
    },
    {
      icon: Ticket,
      title: "Admission",
      details: [
        "Adults: ₹2000",
        "Seniors (65+): ₹1400",
        "Students: ₹1000",
        "Children (under 12): Free"
      ]
    },
    {
      icon: MapPin,
      title: "Location",
      details: [
        "200 Central Park West",
        "New York, NY 10024",
        "United States"
      ]
    }
  ];

  const guidelines = [
    "Photography without flash is permitted",
    "Large bags and backpacks must be checked",
    "Food and drinks are not allowed in galleries",
    "Sketching is permitted with pencils only",
    "Please maintain appropriate distance from artworks",
    "Guided tours available daily at 11 AM and 2 PM"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <img
          src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=2940"
          alt="Museum Exterior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4 hero-content">
            <h1 className="text-5xl md:text-7xl font-serif mb-6">Plan Your Visit</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Experience world-class art in the heart of the city
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Book Tickets
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Visit Information Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visitInfo.map((info, index) => (
              <div
                key={info.title}
                className="bg-white p-8 rounded-lg shadow-lg animate-on-scroll opacity-0 transition-all duration-500 hover:shadow-xl"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <info.icon size={40} className="text-indigo-600 mb-6" />
                <h3 className="text-2xl font-serif mb-4">{info.title}</h3>
                <ul className="space-y-2">
                  {info.details.map((detail, i) => (
                    <li key={i} className="text-gray-600">{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif mb-12 text-center animate-on-scroll opacity-0">
            Visitor Guidelines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidelines.map((guideline, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 animate-on-scroll opacity-0"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="h-2 w-2 bg-indigo-600 rounded-full mt-2"></div>
                <p className="text-gray-700">{guideline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0">
              <h2 className="text-4xl font-serif mb-6">Getting Here</h2>
              <p className="text-gray-600 mb-8">
                Located in the heart of the city, our museum is easily accessible by public transportation or car.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-indigo-600" />
                  <span>200 Central Park West, New York, NY 10024</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-indigo-600" />
                  <span>+1 (212) 555-0123</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-indigo-600" />
                  <span>info@museum.com</span>
                </div>
              </div>
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300">
                Get Directions
              </button>
            </div>
            <div className="h-[400px] bg-gray-200 rounded-lg animate-on-scroll opacity-0">
              {/* Map will be integrated here */}
              <div className="w-full h-full rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1577083552431-6e5fd01988f7?auto=format&fit=crop&q=80&w=2940"
                  alt="Museum Location"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}