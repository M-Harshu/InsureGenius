import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { Send, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export const Chat = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "agent" },
    { id: 2, text: "I'm interested in life insurance policies.", sender: "user" },
    { id: 3, text: "Great! I can help you understand our life insurance options. Would you like to schedule a call to discuss this in detail?", sender: "agent" }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, sender: "user" }
      ]);
      setMessage('');
    }
  };

  const handleBookAppointment = async () => {
    if (!appointmentDate || !currentUser) {
      toast.error('Please select a date and time');
      return;
    }

    setIsBooking(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          user_id: currentUser.uid,
          agent_name: "Priya Sharma",
          appointment_date: appointmentDate.toISOString(),
          status: "Scheduled"
        });

      if (error) throw error;

      // Add confirmation message to chat
      setMessages([
        ...messages,
        { 
          id: messages.length + 1, 
          text: `Your appointment has been scheduled for ${appointmentDate.toLocaleString()}`, 
          sender: "agent" 
        }
      ]);

      // Show success message and close modal
      toast.success('Appointment booked successfully!');
      setShowAppointmentModal(false);
      setAppointmentDate(null);

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-5rem)] flex flex-col bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center flex-1 min-w-0">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-600 font-semibold">PS</span>
              </div>
              <div className="ml-3 truncate">
                <h2 className="text-lg font-semibold text-gray-900">Priya Sharma</h2>
                <p className="text-sm text-gray-600">LIC Agent • Online</p>
              </div>
            </div>
            <button
              onClick={() => setShowAppointmentModal(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Calendar className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Book Appointment</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-md p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex-shrink-0"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Book an Appointment</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date and Time
              </label>
              <DatePicker
                selected={appointmentDate}
                onChange={(date) => setAppointmentDate(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleBookAppointment}
                disabled={isBooking || !appointmentDate}
                className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBooking ? 'Booking...' : 'Book Appointment'}
              </button>
              <button
                onClick={() => setShowAppointmentModal(false)}
                disabled={isBooking}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};