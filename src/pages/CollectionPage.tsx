import React, { useEffect, useRef } from 'react';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import images
import heroImage from '../assets/indian-art-exhibition-picture-outdoors.jpg';
import pattachitraImage from '../assets/pattachitra-depiction-focus hlght.jpg';
import warliImage from '../assets/warli-art-depiction hlght.jpg';
import madhubaniImage from '../assets/madhubani-art-depiction-with-people-reviewing-it-b.jpg';
import highlight1 from '../assets/large-warli-art-depiction hlght.jpg';
import highlight2 from '../assets/focus-on-a-human-reviewing-indian-art-and-paint-ex.jpg';
import highlight3 from '../assets/art-after-dark-themed preview.jpg';
import highlight4 from '../assets/udaya-kala-art-at-sunrise preview.jpg';

const collections = [
  {
    id: 1,
    title: "Pattachitra Art & Heritage",
    period: "15th Century-Present",
    image: pattachitraImage,
    count: "2,500+ Works",
    description: "A comprehensive collection of Pattachitra paintings from Odisha, showcasing traditional cloth-based scroll paintings with mythological and folk narratives",
    details: {
      highlights: [
        "Traditional Jagannath Paintings",
        "Ramayana and Mahabharata Scrolls",
        "Contemporary Pattachitra Interpretations",
        "Master Artist Collaborations"
      ],
      periods: [
        "Traditional Period",
        "Colonial Revival",
        "Modern Adaptations",
        "Contemporary Works"
      ],
      featured: {
        title: "The Sacred Art of Pattachitra",
        description: "Experience the divine narratives told through the intricate art of Pattachitra, where every line carries spiritual significance."
      }
    }
  },
  {
    id: 2,
    title: "Warli Tribal Art",
    period: "Ancient to Contemporary",
    image: warliImage,
    count: "1,800+ Works",
    description: "Ancient geometric art traditions from Maharashtra's tribal communities, depicting daily life, nature, and spiritual beliefs",
    details: {
      highlights: [
        "Traditional Warli Circle Paintings",
        "Harvest Festival Depictions",
        "Nature and Wildlife Themes",
        "Contemporary Warli Adaptations"
      ],
      periods: [
        "Ancient Traditions",
        "Colonial Documentation",
        "Modern Revival",
        "Contemporary Art"
      ]
    }
  },
  {
    id: 3,
    title: "Madhubani Folk Art",
    period: "Traditional to Modern",
    image: madhubaniImage,
    count: "2,200+ Works",
    description: "Vibrant folk paintings from Bihar featuring mythological themes, nature motifs, and festival celebrations in distinctive geometric patterns",
    details: {
      highlights: [
        "Traditional Kohbar Paintings",
        "Festival and Ritual Art",
        "Nature and Animal Motifs",
        "Modern Madhubani Interpretations"
      ],
      periods: [
        "Traditional Folk",
        "Cultural Revival",
        "Contemporary Fusion",
        "International Recognition"
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
          src={heroImage}
          alt="Indian Art Collection Gallery"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4 hero-content">
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Our Collection</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Explore over 5,000 years of Indian artistic heritage through our comprehensive collection
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
            {[highlight1, highlight2, highlight3, highlight4].map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105"
              >
                <img
                  src={image}
                  alt={`Indian Art Highlight ${index + 1}`}
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