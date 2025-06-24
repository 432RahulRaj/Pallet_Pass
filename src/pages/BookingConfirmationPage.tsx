import React from 'react';
import { CheckCircle, Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function BookingConfirmationPage() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-green-50 p-8 text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-3xl font-serif text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your booking. A confirmation email has been sent to {user.email}.
            </p>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h2 className="text-xl font-medium mb-4">Booking Details</h2>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3" />
                    <span>Saturday, March 15, 2024 at 2:00 PM</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3" />
                    <span>200 Central Park West, New York, NY 10024</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-3" />
                    <span>2 Adult tickets (₹4,000), 1 Student ticket (₹1,000)</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-4">Important Information</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• Please arrive 15 minutes before your scheduled time</li>
                  <li>• Bring a valid ID for student/senior tickets</li>
                  <li>• Face masks are recommended but not required</li>
                  <li>• Large bags must be checked at the coat check</li>
                </ul>
              </div>

              <div className="border-t pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/visit"
                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-center flex items-center justify-center"
                  >
                    Plan Your Visit
                    <ArrowRight size={20} className="ml-2" />
                  </Link>
                  <Link
                    to="/exhibitions"
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 text-center"
                  >
                    View Exhibitions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}