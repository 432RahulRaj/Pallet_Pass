import React from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { CreditCard, Calendar } from 'lucide-react';

export function PaymentPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!bookingDetails) {
    return <Navigate to="/booking" />;
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Update booking status to paid
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'paid' })
        .eq('user_id', user.id)
        .eq('event_date', bookingDetails.date)
        .eq('event_time', bookingDetails.time);

      if (error) throw error;

      toast.success('Payment successful!');
      navigate('/booking/confirmation');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 px-8 py-6 text-white">
            <h1 className="text-3xl font-serif">Complete Payment</h1>
            <p className="text-indigo-100 mt-2">Secure payment processing</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Payment Form */}
              <div>
                <h2 className="text-xl font-medium mb-6">Payment Details</h2>
                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Pay ₹{bookingDetails.totalAmount}
                  </button>
                </form>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={20} className="mr-2" />
                    <div>
                      <p className="font-medium">{bookingDetails.date}</p>
                      <p className="text-sm">{bookingDetails.time}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    {bookingDetails.tickets.adult > 0 && (
                      <div className="flex justify-between mb-2">
                        <span>Adult x {bookingDetails.tickets.adult}</span>
                        <span>₹{bookingDetails.tickets.adult * 2000}</span>
                      </div>
                    )}
                    {bookingDetails.tickets.senior > 0 && (
                      <div className="flex justify-between mb-2">
                        <span>Senior x {bookingDetails.tickets.senior}</span>
                        <span>₹{bookingDetails.tickets.senior * 1400}</span>
                      </div>
                    )}
                    {bookingDetails.tickets.student > 0 && (
                      <div className="flex justify-between mb-2">
                        <span>Student x {bookingDetails.tickets.student}</span>
                        <span>₹{bookingDetails.tickets.student * 1000}</span>
                      </div>
                    )}
                    {bookingDetails.tickets.child > 0 && (
                      <div className="flex justify-between mb-2">
                        <span>Child x {bookingDetails.tickets.child}</span>
                        <span>Free</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>₹{bookingDetails.totalAmount}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
                  <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                    <li>• Please arrive 15 minutes before your scheduled time</li>
                    <li>• Bring valid ID for student/senior tickets</li>
                    <li>• Tickets are non-refundable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}