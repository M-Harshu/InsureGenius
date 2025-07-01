import { Home, User, FileText, MessageSquare, LogOut, Video } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { LanguageToggle } from '../LanguageToggle';

export const TopNav = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Successfully logged out');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-violet-600">InsureGenius</h1>
            <div className="hidden md:flex items-center space-x-4 ml-10">
              <Link 
                to="/dashboard" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-md"
              >
                <Home className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
              <Link 
                to="/dashboard/profile" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-md"
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </Link>
              <Link 
                to="/dashboard/policies" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-md"
              >
                <FileText className="h-5 w-5 mr-2" />
                Policies
              </Link>
              <Link 
                to="/dashboard/videos" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-md"
              >
                <Video className="h-5 w-5 mr-2" />
                Videos
              </Link>
              <Link 
                to="/dashboard/chat" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-md"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Chat
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};