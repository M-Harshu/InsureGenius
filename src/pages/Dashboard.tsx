import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { Wallet, TrendingUp, FileText, ShoppingBag, Gift, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Appointment } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User';

  useEffect(() => {
    if (!currentUser) return;

    const fetchAppointments = async () => {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .eq('user_id', currentUser.uid)
          .order('appointment_date', { ascending: true });

        if (error) throw error;
        setAppointments(data || []);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Failed to load appointments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel('appointments_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'appointments',
          filter: `user_id=eq.${currentUser.uid}`
        }, 
        fetchAppointments
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [currentUser]);

  const shoppingCredits = [
    {
      title: "Amazon Gift Card",
      value: "₹500",
      expiry: "March 31, 2024",
      icon: ShoppingBag,
      color: "amber",
      url: "https://www.amazon.in"
    },
    {
      title: "Flipkart Voucher",
      value: "₹1,000",
      expiry: "April 15, 2024",
      icon: Gift,
      color: "blue",
      url: "https://www.flipkart.com"
    },
    {
      title: "Myntra Discount",
      value: "20% off",
      expiry: "May 1, 2024",
      icon: Tag,
      color: "pink",
      url: "https://www.myntra.com"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {displayName}
          </h1>
          <p className="text-gray-600">{t('dashboard.overview')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-violet-50 p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-violet-600">{t('dashboard.activePolicies')}</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
              <div className="bg-violet-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-violet-600" />
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">{t('dashboard.totalInvestment')}</p>
                <p className="text-2xl font-semibold text-gray-900">₹50,000</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Wallet className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">{t('dashboard.returns')}</p>
                <p className="text-2xl font-semibold text-gray-900">₹75,000</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Shopping Credits Grid */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Shopping Credits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shoppingCredits.map((credit, index) => (
              <a
                key={index}
                href={credit.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block bg-${credit.color}-50 p-4 rounded-lg border border-${credit.color}-100 transition-transform hover:scale-105 hover:shadow-md`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`bg-${credit.color}-100 p-2 rounded-lg`}>
                    <credit.icon className={`h-5 w-5 text-${credit.color}-600`} />
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{credit.value}</span>
                </div>
                <h3 className="font-medium text-gray-900">{credit.title}</h3>
                <p className="text-sm text-gray-600 mt-1">Expires: {credit.expiry}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.recentPolicies')}</h2>
            <div className="space-y-4">
              {[
                { name: 'Life Insurance Plus', premium: '₹2,500/month', status: 'Active' },
                { name: 'Health Shield Pro', premium: '₹1,800/month', status: 'Active' },
                { name: 'Investment Plan', premium: '₹5,000/month', status: 'Pending' },
              ].map((policy, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-violet-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{policy.name}</p>
                    <p className="text-sm text-gray-600">{policy.premium}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    policy.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {policy.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.upcomingAppointments')}</h2>
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                </div>
              ) : appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-violet-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{appointment.agent_name}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.appointment_date).toLocaleString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      {appointment.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center py-4">No upcoming appointments</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};