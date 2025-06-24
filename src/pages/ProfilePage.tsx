import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Calendar, Clock, Ticket, User, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

interface Booking {
  id: string;
  event_date: string;
  event_time: string;
  adult_tickets: number;
  senior_tickets: number;
  student_tickets: number;
  child_tickets: number;
  total_amount: number;
  status: string;
  created_at: string;
}

export function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileAndBookings() {
      if (!user) return;

      try {
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch bookings data
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('event_date', { ascending: true });

        if (bookingsError) throw bookingsError;
        setBookings(bookingsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    }

    fetchProfileAndBookings();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-indigo-600 px-8 py-12 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-4 rounded-full">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-serif mb-2">
                  {profile?.full_name || 'My Profile'}
                </h1>
                <div className="flex items-center text-indigo-100">
                  <Mail size={16} className="mr-2" />
                  <p>{profile?.email || user.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bookings Section */}
          <div className="p-8">
            <h2 className="text-2xl font-serif mb-6">My Bookings</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Ticket className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">No bookings found</p>
                <p className="text-sm text-gray-500">
                  Your upcoming visits will appear here once you make a booking.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="text-indigo-600" size={20} />
                        <span className="font-medium">
                          {formatDate(booking.event_date)}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="text-gray-400" size={20} />
                        <span className="text-gray-600">{booking.event_time}</span>
                      </div>
                      <div className="space-y-1">
                        {booking.adult_tickets > 0 && (
                          <p className="text-gray-600">Adult tickets: {booking.adult_tickets}</p>
                        )}
                        {booking.senior_tickets > 0 && (
                          <p className="text-gray-600">Senior tickets: {booking.senior_tickets}</p>
                        )}
                        {booking.student_tickets > 0 && (
                          <p className="text-gray-600">Student tickets: {booking.student_tickets}</p>
                        )}
                        {booking.child_tickets > 0 && (
                          <p className="text-gray-600">Child tickets: {booking.child_tickets}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Amount</span>
                        <span className="text-xl font-semibold">₹{booking.total_amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}