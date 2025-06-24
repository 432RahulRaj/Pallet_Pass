import React, { useEffect, useRef } from 'react';
import { ArrowRight, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import images
import heroImage from '../assets/indian-art-exhibition-picture-outdoors.jpg';
import parallaxImage from '../assets/indian-art-and-paint-outdoor-exhibition-in-day-tim.jpg';
import mughalImage from '../assets/pattachitra-depiction-focus hlght.jpg';
import danceImage from '../assets/focus-on-a-human-reviewing-indian-art-and-paint-ex (1).jpg';
import contemporaryImage from '../assets/warli-art-depiction hlght.jpg';
import event1Image from '../assets/art-after-dark-themed-indian-art-event.jpg';
import event2Image from '../assets/chitra-divas-indian-art-event.jpg';
import event3Image from '../assets/udaya-kala-art-at-sunrise--indian-art-event.jpg';
import event4Image from '../assets/madhubani-art-depiction-with-people-reviewing-it-b.jpg';

export function HomePage() {
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

  return (
    <div className="overflow-x-hidden">
      <section className="relative h-screen">
        <img
          src={heroImage}
          alt="Indian Art Gallery"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4 hero-content">
            <h2 className="text-6xl md:text-8xl font-serif mb-8">Experience Art Differently</h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
              Discover our world-class collection spanning over 5,000 years of Indian creativity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/booking"
                className="bg-white text-black px-8 py-4 text-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 group"
              >
                Book Your Visit 
                <ArrowRight size={20} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link 
                to="/exhibitions"
                className="bg-transparent border-2 border-white text-white px-8 py-4 text-lg flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
              >
                View Exhibitions
                <ArrowRight size={20} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: "Opening Hours", desc: "Open Daily 10:00 AM - 5:30 PM" },
              { icon: MapPin, title: "Location", desc: "KIIT UNIVERSITY Patia Bhubneswar Odisha 751024" },
              { icon: Calendar, title: "Special Events", desc: "Check our calendar" },
              { icon: Users, title: "Guided Tours", desc: "Available daily at 11 AM & 2 PM" }
            ].map((item, index) => (
              <div 
                key={item.title}
                className="bg-white p-6 rounded-lg shadow-lg animate-on-scroll opacity-0 transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <item.icon size={32} className="text-indigo-600 mb-4" />
                <h3 className="text-xl font-serif mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="parallax-section h-[40vh]" style={{ backgroundImage: `url(${parallaxImage})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4 animate-on-scroll opacity-0">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Start Your Journey Today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book your tickets now and explore our extraordinary exhibitions
            </p>
            <Link 
              to="/booking"
              className="bg-white text-black px-8 py-3 text-lg inline-flex items-center hover:bg-gray-100 transition-all duration-300 group"
            >
              Book Now
              <ArrowRight size={20} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-serif mb-12 text-center animate-on-scroll opacity-0">
            Current Exhibitions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Pattachitra Heritage",
                image: mughalImage,
                date: "Through December 31, 2024",
                desc: "Explore the traditional art of Pattachitra from Odisha",
                slug: "pattachitra-heritage"
              },
              {
                title: "Classical Dance Forms",
                image: danceImage,
                date: "Through January 15, 2025",
                desc: "Journey through India's rich tradition of classical dance",
                slug: "classical-dance-forms"
              },
              {
                title: "Warli Folk Art",
                image: contemporaryImage,
                date: "Through March 1, 2025",
                desc: "Traditional tribal art from Maharashtra",
                slug: "warli-folk-art"
              }
            ].map((exhibition, index) => (
              <Link 
                key={exhibition.slug}
                to={`/exhibitions/${exhibition.slug}`}
                className="exhibition-card rounded-lg overflow-hidden animate-on-scroll opacity-0"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={exhibition.image}
                    alt={exhibition.title}
                    className="exhibition-image w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h4 className="text-2xl font-serif mb-2">{exhibition.title}</h4>
                  <p className="text-gray-600 mb-3">{exhibition.desc}</p>
                  <p className="text-indigo-600">{exhibition.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0">
              <h3 className="text-4xl font-serif mb-6">Upcoming Events</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Art After Dark",
                    date: "March 15, 2024",
                    time: "6:00 PM - 9:00 PM",
                    desc: "Evening of art, music, and classical performances"
                  },
                  {
                    title: "Chitra Divas Celebration",
                    date: "March 20, 2024",
                    time: "2:00 PM - 3:30 PM",
                    desc: "Celebrating the richness of Indian visual arts"
                  },
                  {
                    title: "Udaya Kala - Art at Sunrise",
                    date: "March 23, 2024",
                    time: "10:00 AM - 12:00 PM",
                    desc: "Traditional craft activities for all ages"
                  }
                ].map((event, index) => (
                  <div 
                    key={event.title}
                    className="border-l-4 border-indigo-500 pl-4 animate-on-scroll opacity-0"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <h4 className="text-xl font-serif mb-2">{event.title}</h4>
                    <p className="text-gray-400">{event.date} | {event.time}</p>
                    <p className="text-gray-300 mt-1">{event.desc}</p>
                  </div>
                ))}
              </div>
              <Link 
                to="/events"
                className="inline-flex items-center text-indigo-400 mt-8 hover:text-indigo-300 transition-colors duration-300 group"
              >
                View All Events
                <ArrowRight size={20} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-on-scroll opacity-0">
              <img 
                src={event1Image} 
                alt="Art After Dark Event"
                className="w-full h-48 object-cover rounded-lg"
                loading="lazy"
              />
              <img 
                src={event2Image} 
                alt="Chitra Divas Event"
                className="w-full h-48 object-cover rounded-lg mt-8"
                loading="lazy"
              />
              <img 
                src={event3Image} 
                alt="Udaya Kala Event"
                className="w-full h-48 object-cover rounded-lg"
                loading="lazy"
              />
              <img 
                src={event4Image} 
                alt="Madhubani Art Event"
                className="w-full h-48 object-cover rounded-lg mt-8"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}