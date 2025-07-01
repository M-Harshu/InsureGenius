import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { ExternalLink, Calendar } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  language: string;
}

const videos: Video[] = [
  {
    id: "hZC0vDX4R_Q",
    title: "LIC Policy Plans Guide",
    description: "Comprehensive guide to understanding LIC policy plans and their benefits.",
    language: "English"
  },
  {
    id: "xcntH6tZL-E",
    title: "ಗೃಹಿಣಿಯರಿಗೆ ಎಲ್‌ಐಸಿ ವಿಮೆ ಯೋಜನೆಗಳು",
    description: "ಮಹಿಳೆಯರು ಮತ್ತು ಗೃಹಿಣಿಯರಿಗಾಗಿ ವಿಶೇಷ ಎಲ್‌ಐಸಿ ವಿಮೆ ಯೋಜನೆಗಳು.",
    language: "Kannada"
  },
  {
    id: "64-gFl34Hkc",
    title: "ಎಲ್‌ಐಸಿ ವಿಮೆ - ವಿವರವಾದ ಮಾರ್ಗದರ್ಶನ",
    description: "ಎಲ್‌ಐಸಿ ವಿಮೆ ಯೋಜನೆಗಳ ಕುರಿತು ವಿವರವಾದ ಮಾಹಿತಿ.",
    language: "Kannada"
  },
  {
    id: "swXHv0khiWY",
    title: "Financial Literacy Guide",
    description: "Essential guide to financial literacy and insurance planning.",
    language: "English"
  }
];

export const Videos = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Educational Videos</h1>
          <p className="text-gray-600 mt-1">Learn about LIC policies and financial planning in English and Kannada</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{video.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    video.language === 'Kannada' 
                      ? 'bg-violet-100 text-violet-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {video.language}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{video.description}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-3 text-sm text-violet-600 hover:text-violet-700"
                >
                  Watch on YouTube
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl p-6 text-white mt-8">
          <div className="flex items-start space-x-4">
            <div className="bg-white/10 rounded-lg p-3">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Live and Online Webinars</h2>
              <p className="mt-4 text-white/90">
                For a more comprehensive understanding of our insurance policies, we conduct regular live and online webinars in both English and Kannada. These interactive sessions provide you with the opportunity to:
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  Ask questions directly to our insurance experts
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  Get personalized policy recommendations
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  Learn about the latest insurance products and features
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};