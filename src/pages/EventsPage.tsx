import React, { useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EventsPage() {
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

  const events = [
    {
      id: 1,
      title: "Classical Music Evening",
      category: "Special Event",
      date: "March 15, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Main Gallery",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&q=80&w=2940",
      description: "Join us for an evening of Indian classical music performances among the art collections. Experience the harmony of visual and musical arts with renowned musicians.",
      price: "₹2000",
      capacity: "200 people"
    },
    {
      id: 2,
      title: "Artist Talk: Madhubani Masters",
      category: "Lecture",
      date: "March 20, 2024",
      time: "2:00 PM - 3:30 PM",
      location: "Lecture Hall",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=2940",
      description: "Master artists from Bihar discuss the ancient art of Madhubani painting, its cultural significance, and contemporary adaptations.",
      price: "Free with admission",
      capacity: "150 people"
    },
    {
      id: 3,
      title: "Family Workshop: Indian Folk Art",
      category: "Workshop",
      date: "March 23, 2024",
      time: "10:00 AM - 12:00 PM",
      location: "Education Center",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=2940",
      description: "A hands-on workshop for families to explore traditional Indian folk art techniques including Warli and Gond art styles. All materials provided.",
      price: "₹1500 per family",
      capacity: "30 families"
    }
  ];

  const categories = ["All Events", "Exhibitions", "Lectures", "Workshops", "Special Events", "Member Events"];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh]">
        <img
          src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&q=80&w=2940"
          alt="Indian Cultural Events"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4 hero-content">
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Events & Programs</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Join us for exciting cultural events, workshops, lectures, and traditional performances
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 bg-gray-50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 hover:text-indigo-600"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-12">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="group bg-white rounded-lg overflow-hidden shadow-lg animate-on-scroll opacity-0 transition-all duration-500 hover:shadow-xl"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
                      {event.category}
                    </span>
                    <h3 className="text-3xl font-serif mb-4">{event.title}</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Calendar size={20} className="mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock size={20} className="mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin size={20} className="mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users size={20} className="mr-2" />
                        {event.capacity}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold">{event.price}</span>
                      <Link
                        to="/booking"
                        className="inline-flex items-center bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 group"
                      >
                        Book Now
                        <ArrowRight size={20} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0">
              <h2 className="text-4xl font-serif mb-6">Upcoming Cultural Calendar</h2>
              <p className="text-xl text-gray-300 mb-8">
                Plan your visit with our comprehensive cultural events calendar. Experience the best of Indian arts, music, and traditions.
              </p>
              <Link 
                to="/booking"
                className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center w-fit"
              >
                <Calendar size={20} className="mr-2" />
                Book an Event
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-on-scroll opacity-0">
              <img
                src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&q=80&w=800"
                alt="Classical Dance Performance"
                className="w-full h-48 object-cover rounded-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=800"
                alt="Traditional Art Workshop"
                className="w-full h-48 object-cover rounded-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}