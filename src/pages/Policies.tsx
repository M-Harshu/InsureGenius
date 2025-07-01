import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { Search, Filter, X, Calendar, IndianRupee, Clock, CheckCircle2, Users, Shield, Heart, Wallet, Activity, Umbrella, Gift, Stethoscope } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../utils/cn';
import { INSURANCE_POLICIES } from '../data/insurancePolicies';

const categories = [
  { 
    id: 'all',
    name: { en: 'All Categories', kn: 'ಎಲ್ಲಾ ವರ್ಗಗಳು' },
    icon: Shield,
    color: 'violet'
  },
  { 
    id: 'lifeInsurance',
    name: { en: 'Life Insurance', kn: 'ಜೀವ ವಿಮೆ' },
    icon: Heart,
    color: 'pink',
    description: { en: 'Protect your family\'s future', kn: 'ನಿಮ್ಮ ಕುಟುಂಬದ ಭವಿಷ್ಯವನ್ನು ರಕ್ಷಿಸಿ' }
  },
  { 
    id: 'savings',
    name: { en: 'Savings', kn: 'ಉಳಿತಾಯ' },
    icon: Wallet,
    color: 'emerald',
    description: { en: 'Grow your wealth', kn: 'ನಿಮ್ಮ ಸಂಪತ್ತನ್ನು ಬೆಳೆಸಿ' }
  },
  { 
    id: 'income',
    name: { en: 'Income', kn: 'ಆದಾಯ' },
    icon: Activity,
    color: 'amber',
    description: { en: 'Regular income plans', kn: 'ನಿಯಮಿತ ಆದಾಯ ಯೋಜನೆಗಳು' }
  },
  { 
    id: 'health',
    name: { en: 'Health', kn: 'ಆರೋಗ್ಯ' },
    icon: Stethoscope,
    color: 'blue',
    description: { en: 'Health protection plans', kn: 'ಆರೋಗ್ಯ ರಕ್ಷಣೆ ಯೋಜನೆಗಳು' }
  },
  { 
    id: 'endowment',
    name: { en: 'Endowment', kn: 'ಎಂಡೋಮೆಂಟ್' },
    icon: Umbrella,
    color: 'indigo',
    description: { en: 'Save with guaranteed returns', kn: 'ಖಾತರಿ ಲಾಭದೊಂದಿಗೆ ಉಳಿತಾಯ' }
  }
];

export const Policies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const { language, t } = useLanguage();

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const filteredPolicies = INSURANCE_POLICIES.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                          policy.category.toLowerCase().replace(/\s+/g, '') === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === 'en' ? 'LIC Insurance Plans' : 'ಎಲ್‌ಐಸಿ ವಿಮಾ ಯೋಜನೆಗಳು'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'en' 
                ? 'Secure your future with our trusted insurance plans' 
                : 'ನಿಮ್ಮ ಭವಿಷ್ಯವನ್ನು ನಮ್ಮ ವಿಶ್ವಾಸಾರ್ಹ ವಿಮಾ ಯೋಜನೆಗಳೊಂದಿಗೆ ಸುರಕ್ಷಿತಗೊಳಿಸಿ'}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder={language === 'en' ? 'Search plans...' : 'ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  "flex flex-col items-center p-4 rounded-lg transition-all",
                  selectedCategory === category.id
                    ? `bg-${category.color}-100 border-2 border-${category.color}-500`
                    : "bg-white border-2 border-transparent hover:bg-gray-50"
                )}
              >
                <div className={`p-3 rounded-full bg-${category.color}-100`}>
                  <Icon className={`h-6 w-6 text-${category.color}-600`} />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-900">
                  {category.name[language]}
                </span>
                {category.description && selectedCategory === category.id && (
                  <span className="mt-1 text-xs text-gray-600">
                    {category.description[language]}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.map((policy) => (
            <div 
              key={policy.id} 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-4">
                <div className={`bg-${policy.color}-100 p-3 rounded-lg`}>
                  <policy.icon className={`h-6 w-6 text-${policy.color}-600`} />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">{policy.name}</h3>
                  <p className="text-sm text-gray-600">{policy.tagline}</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{policy.description}</p>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <IndianRupee className="h-4 w-4 mr-1" />
                <span>Starts from {policy.details.minPremium}</span>
              </div>
              
              <button 
                className="w-full mt-4 py-2 px-4 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                onClick={() => setSelectedPolicy(policy)}
              >
                {t('button.viewDetails')}
              </button>
            </div>
          ))}
        </div>

        {/* Policy Details Modal */}
        {selectedPolicy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`bg-${selectedPolicy.color}-100 p-2 rounded-lg`}>
                    <selectedPolicy.icon className={`h-6 w-6 text-${selectedPolicy.color}-600`} />
                  </div>
                  <div className="ml-3">
                    <h2 className="text-xl font-semibold text-gray-900">{selectedPolicy.name}</h2>
                    <p className="text-sm text-gray-600">{selectedPolicy.tagline}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPolicy(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">{t('policy.policyTerm')}</p>
                        <p className="text-gray-900">{selectedPolicy.details.policyTerm}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <IndianRupee className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">{t('policy.premium')}</p>
                        <p className="text-gray-900">{selectedPolicy.details.minPremium}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">{t('policy.idealFor')}</p>
                        <p className="text-gray-900">{selectedPolicy.details.forWhom}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('policy.whatYouGet')}</h3>
                    <p className="text-gray-700">{selectedPolicy.details.sumAssured}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('policy.benefits')}</h3>
                  <ul className="space-y-2">
                    {selectedPolicy.details.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('policy.importantPoints')}</h3>
                  <ul className="space-y-2">
                    {selectedPolicy.details.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button 
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setSelectedPolicy(null)}
                  >
                    {t('button.close')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};