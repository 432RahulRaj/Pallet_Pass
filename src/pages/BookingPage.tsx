import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, Users, CreditCard, ArrowRight } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const bookingSchema = z.object({
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  tickets: z.object({
    adult: z.number().min(0),
    senior: z.number().min(0),
    student: z.number().min(0),
    child: z.number().min(0),
  }).refine(data => {
    const total = data.adult + data.senior + data.student + data.child;
    return total > 0;
  }, {
    message: 'Please select at least one ticket',
  }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const PRICES = {
  adult: 2000,
  senior: 1400,
  student: 1000,
  child: 0
};

export function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" state={{ from: '/booking' }} />;
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      tickets: {
        adult: 0,
        senior: 0,
        student: 0,
        child: 0,
      }
    }
  });

  const tickets = watch('tickets');
  const totalAmount = 
    tickets.adult * PRICES.adult + 
    tickets.senior * PRICES.senior + 
    tickets.student * PRICES.student;

  const availableTimes = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
    '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const onSubmit = async (data: BookingFormData) => {
    try {
      // Create the booking in the database
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: user.id,
            event_date: data.date,
            event_time: data.time,
            adult_tickets: data.tickets.adult,
            senior_tickets: data.tickets.senior,
            student_tickets: data.tickets.student,
            child_tickets: data.tickets.child,
            total_amount: totalAmount,
            status: 'confirmed'
          }
        ]);

      if (error) throw error;

      // Navigate to payment page with booking details
      navigate('/booking/payment', {
        state: {
          bookingDetails: {
            ...data,
            totalAmount,
            userId: user.id
          }
        }
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to process booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gray-900 text-white px-8 py-6">
            <h1 className="text-3xl font-serif">Book Your Visit</h1>
            <p className="text-gray-400 mt-2">Select your tickets and preferred time</p>
          </div>

          {/* Progress Steps */}
          <div className="px-8 py-4 border-b">
            <div className="flex items-center">
              <div className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className="rounded-full transition duration-500 ease-in-out h-8 w-8 py-1 border-2 border-indigo-600 flex items-center justify-center">
                  1
                </div>
                <div className="ml-2">Tickets</div>
              </div>
              <div className={`flex-1 border-t-2 transition duration-500 ease-in-out ${step >= 2 ? 'border-indigo-600' : 'border-gray-300'}`}></div>
              <div className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className="rounded-full transition duration-500 ease-in-out h-8 w-8 py-1 border-2 border-indigo-600 flex items-center justify-center">
                  2
                </div>
                <div className="ml-2">Details</div>
              </div>
              <div className={`flex-1 border-t-2 transition duration-500 ease-in-out ${step >= 3 ? 'border-indigo-600' : 'border-gray-300'}`}></div>
              <div className={`flex items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className="rounded-full transition duration-500 ease-in-out h-8 w-8 py-1 border-2 border-indigo-600 flex items-center justify-center">
                  3
                </div>
                <div className="ml-2">Review</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="date"
                      {...register('date')}
                      min={new Date().toISOString().split('T')[0]}
                      className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      {...register('time')}
                      className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select a time</option>
                      {availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Tickets
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Adult</p>
                        <p className="text-sm text-gray-500">Ages 18-64</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600">₹{PRICES.adult}</span>
                        <input
                          type="number"
                          {...register('tickets.adult', { valueAsNumber: true })}
                          min="0"
                          className="w-16 p-1 border rounded text-center"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Senior</p>
                        <p className="text-sm text-gray-500">Ages 65+</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600">₹{PRICES.senior}</span>
                        <input
                          type="number"
                          {...register('tickets.senior', { valueAsNumber: true })}
                          min="0"
                          className="w-16 p-1 border rounded text-center"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Student</p>
                        <p className="text-sm text-gray-500">Valid ID required</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600">₹{PRICES.student}</span>
                        <input
                          type="number"
                          {...register('tickets.student', { valueAsNumber: true })}
                          min="0"
                          className="w-16 p-1 border rounded text-center"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Child</p>
                        <p className="text-sm text-gray-500">Under 12</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600">Free</span>
                        <input
                          type="number"
                          {...register('tickets.child', { valueAsNumber: true })}
                          min="0"
                          className="w-16 p-1 border rounded text-center"
                        />
                      </div>
                    </div>
                  </div>
                  {errors.tickets && (
                    <p className="mt-2 text-sm text-red-600">{errors.tickets.message}</p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={20} className="mr-2" />
                      <span>Date: {watch('date')}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock size={20} className="mr-2" />
                      <span>Time: {watch('time')}</span>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      {tickets.adult > 0 && (
                        <div className="flex justify-between mb-2">
                          <span>Adult x {tickets.adult}</span>
                          <span>₹{tickets.adult * PRICES.adult}</span>
                        </div>
                      )}
                      {tickets.senior > 0 && (
                        <div className="flex justify-between mb-2">
                          <span>Senior x {tickets.senior}</span>
                          <span>₹{tickets.senior * PRICES.senior}</span>
                        </div>
                      )}
                      {tickets.student > 0 && (
                        <div className="flex justify-between mb-2">
                          <span>Student x {tickets.student}</span>
                          <span>₹{tickets.student * PRICES.student}</span>
                        </div>
                      )}
                      {tickets.child > 0 && (
                        <div className="flex justify-between mb-2">
                          <span>Child x {tickets.child}</span>
                          <span>Free</span>
                        </div>
                      )}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>₹{totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Final Review</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={20} className="mr-2" />
                      <span>Date: {watch('date')}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock size={20} className="mr-2" />
                      <span>Time: {watch('time')}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users size={20} className="mr-2" />
                      <span>Total Tickets: {
                        tickets.adult + tickets.senior + tickets.student + tickets.child
                      }</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total Amount</span>
                        <span>₹{totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-yellow-800">Important Information</h4>
                  <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                    <li>• Please arrive 15 minutes before your scheduled time</li>
                    <li>• Bring valid ID for student/senior tickets</li>
                    <li>• Tickets are non-refundable</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="ml-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center"
                >
                  Next
                  <ArrowRight size={20} className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center"
                >
                  Proceed to Payment
                  <ArrowRight size={20} className="ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}