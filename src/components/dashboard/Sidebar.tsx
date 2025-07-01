import { Home, User, FileText, MessageSquare, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { toast } from 'react-hot-toast';

export const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(t('message.logoutSuccess'));
      navigate('/login');
    } catch (error) {
      toast.error(t('message.logoutError'));
    }
  };

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-violet-600">InsureGenius</h1>
      </div>
      
      <nav className="mt-6">
        <a href="/dashboard" className="flex items-center px-6 py-3 text-gray-700 hover:bg-violet-50 hover:text-violet-600">
          <Home className="h-5 w-5 mr-3" />
          {t('nav.dashboard')}
        </a>
        <a href="/dashboard/profile" className="flex items-center px-6 py-3 text-gray-700 hover:bg-violet-50 hover:text-violet-600">
          <User className="h-5 w-5 mr-3" />
          {t('nav.profile')}
        </a>
        <a href="/dashboard/policies" className="flex items-center px-6 py-3 text-gray-700 hover:bg-violet-50 hover:text-violet-600">
          <FileText className="h-5 w-5 mr-3" />
          {t('nav.policies')}
        </a>
        <a href="/dashboard/chat" className="flex items-center px-6 py-3 text-gray-700 hover:bg-violet-50 hover:text-violet-600">
          <MessageSquare className="h-5 w-5 mr-3" />
          {t('nav.chat')}
        </a>
      </nav>

      <div className="absolute bottom-0 w-full p-6">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-gray-700 hover:text-red-600 w-full"
        >
          <LogOut className="h-5 w-5 mr-3" />
          {t('nav.logout')}
        </button>
      </div>
    </div>
  );
};