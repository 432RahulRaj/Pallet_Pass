import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const collections = [
  {
    id: 1,
    title: "Modern Masters",
    period: "20th Century",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=2940",
    count: "2,500+ Works",
    description: "A comprehensive collection of groundbreaking works by the most influential artists of the 20th century",
    details: {
      highlights: [
        "Pablo Picasso's 'Cubist Compositions'",
        "Henri Matisse's 'The Dance Series'",
        "Salvador Dalí's 'Surrealist Dreams'",
        "Georgia O'Keeffe's 'Flower Studies'"
      ],
      periods: [
        "Fauvism",
        "Cubism",
        "Surrealism",
        "Abstract Expressionism",
        "Pop Art"
      ],
      featured: {
        title: "The Evolution of Modern Art",
        description: "Trace the revolutionary developments in artistic expression through the 20th century, from the early avant-garde movements to the emergence of abstract expressionism."
      }
    }
  },
  {
    id: 2,
    title: "Asian Art",
    period: "3000 BCE-Present",
    image: "https://images.unsplash.com/photo-1464185613589-f8b1c3a26ff6?auto=format&fit=crop&q=80&w=2940",
    count: "4,000+ Works",
    description: "Chinese, Japanese, Korean, and South Asian artworks spanning millennia of cultural heritage",
    details: {
      highlights: [
        "Ming Dynasty Porcelain Collection",
        "Japanese Edo Period Screens",
        "Korean Celadon Ceramics",
        "Contemporary Asian Installations"
      ],
      periods: [
        "Ancient China",
        "Edo Period Japan",
        "Joseon Dynasty Korea",
        "Modern Asian Art"
      ]
    }
  },
  {
    id: 3,
    title: "Contemporary Visions",
    period: "1970-Present",
    image: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?auto=format&fit=crop&q=80&w=2940",
    count: "3,000+ Works",
    description: "Cutting-edge contemporary art pushing boundaries and challenging perspectives",
    details: {
      highlights: [
        "Digital Art Installations",
        "Mixed Media Sculptures",
        "Video Art Collection",
        "Performance Art Documentation"
      ],
      periods: [
        "Postmodernism",
        "Neo-Expressionism",
        "Digital Age",
        "Contemporary"
      ]
    }
  }
];

export function CollectionPage() {
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh]">
        <img
          src="https://images.unsplash.com/photo-1594799295965-0b44e343c6b3?auto=format&fit=crop&q=80&w=2940"
          alt="Collection Gallery"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4 hero-content">
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Our Collection</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Explore over 10,000 years of human creativity through our comprehensive collection
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4 bg-gray-50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search the collection..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <button className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300">
              <Filter size={20} className="mr-2" />
              Filter Results
            </button>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-12">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className="group bg-white rounded-lg overflow-hidden shadow-lg animate-on-scroll opacity-0 transition-all duration-500 hover:shadow-xl"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl font-serif">{collection.title}</h3>
                      <span className="text-sm text-indigo-600 font-medium">{collection.count}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{collection.period}</p>
                    <p className="text-gray-700 mb-6">{collection.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-2">Highlights</h4>
                      <ul className="space-y-1">
                        {collection.details.highlights.map((highlight, i) => (
                          <li key={i} className="text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-2">Time Periods</h4>
                      <div className="flex flex-wrap gap-2">
                        {collection.details.periods.map((period, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {period}
                          </span>
                        ))}
                      </div>
                    </div>

                    {collection.details.featured && (
                      <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                        <h4 className="text-lg font-semibold mb-2 text-indigo-900">
                          {collection.details.featured.title}
                        </h4>
                        <p className="text-indigo-700">
                          {collection.details.featured.description}
                        </p>
                      </div>
                    )}

                    <Link
                      to={`/collection/${collection.id}`}
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-300 group"
                    >
                      View Collection
                      <ArrowRight size={20} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif mb-12 text-center animate-on-scroll opacity-0">Collection Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-on-scroll opacity-0">
            {[
              "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1464185613589-f8b1c3a26ff6?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1594799295965-0b44e343c6b3?auto=format&fit=crop&q=80&w=800"
            ].map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105"
              >
                <img
                  src={image}
                  alt={`Highlight ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}