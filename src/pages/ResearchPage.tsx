import React, { useEffect, useRef } from 'react';
import { Book, Library, Search, Download, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ResearchPage() {
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

  const resources = [
    {
      icon: Library,
      title: "Digital Archives",
      description: "Access our extensive digital collection of historical documents, photographs, and manuscripts.",
      link: "/research/archives"
    },
    {
      icon: Book,
      title: "Publications",
      description: "Explore scholarly publications, exhibition catalogs, and research papers.",
      link: "/research/publications"
    },
    {
      icon: Users,
      title: "Academic Programs",
      description: "Information about fellowships, internships, and research opportunities.",
      link: "/research/programs"
    }
  ];

  const publications = [
    {
      title: "Modern Art in Context",
      author: "Dr. Sarah Chen",
      date: "2024",
      image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988f7?auto=format&fit=crop&q=80&w=800",
      description: "An comprehensive analysis of modern art movements"
    },
    {
      title: "Renaissance Masters",
      author: "Prof. Michael Roberts",
      date: "2023",
      image: "https://images.unsplash.com/photo-1578321272125-4e4c4c3643c5?auto=format&fit=crop&q=80&w=800",
      description: "New perspectives on Renaissance art and society"
    },
    {
      title: "Contemporary Art Practices",
      author: "Dr. Emily Wong",
      date: "2024",
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800",
      description: "Exploring current trends in contemporary art"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh]">
        <img
          src="https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?auto=format&fit=crop&q=80&w=2940"
          alt="Research Library"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4 hero-content">
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Research & Resources</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover our extensive collection of resources for scholars, students, and art enthusiasts
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div
                key={resource.title}
                className="bg-white p-8 rounded-lg shadow-lg animate-on-scroll opacity-0 transition-all duration-500 hover:shadow-xl"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <resource.icon size={40} className="text-indigo-600 mb-6" />
                <h3 className="text-2xl font-serif mb-4">{resource.title}</h3>
                <p className="text-gray-600 mb-6">{resource.description}</p>
                <Link
                  to={resource.link}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-300 group"
                >
                  Learn More
                  <ArrowRight size={20} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif mb-12 text-center animate-on-scroll opacity-0">Latest Publications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {publications.map((publication, index) => (
              <div
                key={publication.title}
                className="bg-white rounded-lg overflow-hidden shadow-lg animate-on-scroll opacity-0 transition-all duration-500 hover:shadow-xl"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={publication.image}
                    alt={publication.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2">{publication.title}</h3>
                  <p className="text-gray-600 mb-2">{publication.author}</p>
                  <p className="text-indigo-600 text-sm mb-4">{publication.date}</p>
                  <p className="text-gray-700">{publication.description}</p>
                  <button className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-300">
                    <Download size={20} className="mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Support */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0">
              <h2 className="text-4xl font-serif mb-6">Research Support</h2>
              <p className="text-xl text-gray-300 mb-8">
                Our team of librarians and research specialists are here to assist you with your research needs.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-indigo-500 rounded-full mr-3"></div>
                  Research consultations
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-indigo-500 rounded-full mr-3"></div>
                  Database access
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-indigo-500 rounded-full mr-3"></div>
                  Interlibrary loan services
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-indigo-500 rounded-full mr-3"></div>
                  Digital resource training
                </li>
              </ul>
              <button className="mt-8 bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-on-scroll opacity-0">
              <img
                src="https://images.unsplash.com/photo-1577083552431-6e5fd01988f7?auto=format&fit=crop&q=80&w=800"
                alt="Research Support 1"
                className="w-full h-48 object-cover rounded-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1578321272125-4e4c4c3643c5?auto=format&fit=crop&q=80&w=800"
                alt="Research Support 2"
                className="w-full h-48 object-cover rounded-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}