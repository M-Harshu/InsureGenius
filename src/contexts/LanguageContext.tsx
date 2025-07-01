import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'kn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.policies': 'Policies',
    'nav.chat': 'Chat with Agent',
    'nav.logout': 'Logout',

    // Messages
    'message.logoutSuccess': 'Successfully logged out',
    'message.logoutError': 'Failed to log out',

    // Common
    'language.english': 'English',
    'language.kannada': 'ಕನ್ನಡ',
    'button.viewDetails': 'View Details',
    'button.close': 'Close',
    'button.applyNow': 'Apply Now',
    'search.placeholder': 'Search plans...',
    'filter.allCategories': 'All Categories',
    
    // Categories
    'category.lifeInsurance': 'Life Insurance',
    'category.savings': 'Savings',
    'category.income': 'Income',
    'category.health': 'Health',
    'category.endowment': 'Endowment',
    
    // Policy Details
    'policy.policyTerm': 'Policy Term',
    'policy.premium': 'Premium Starts From',
    'policy.idealFor': 'Ideal For',
    'policy.whatYouGet': 'What You Get',
    'policy.benefits': 'Benefits',
    'policy.importantPoints': 'Important Points',
    
    // Dashboard
    'dashboard.activePolicies': 'Active Policies',
    'dashboard.totalInvestment': 'Total Investment',
    'dashboard.returns': 'Returns',
    'dashboard.nextMeeting': 'Next Meeting',
    'dashboard.recentPolicies': 'Recent Policies',
    'dashboard.upcomingAppointments': 'Upcoming Appointments',
    'dashboard.viewDetails': 'View Details',
    
    // Page Titles
    'title.insurancePlans': 'LIC Insurance Plans',
    'subtitle.insurancePlans': 'Secure your future with our trusted insurance plans',
  },
  kn: {
    // Navigation
    'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'nav.profile': 'ಪ್ರೊಫೈಲ್',
    'nav.policies': 'ಪಾಲಿಸಿಗಳು',
    'nav.chat': 'ಏಜೆಂಟ್‌ನೊಂದಿಗೆ ಚಾಟ್',
    'nav.logout': 'ಲಾಗ್ ಔಟ್',

    // Messages
    'message.logoutSuccess': 'ಯಶಸ್ವಿಯಾಗಿ ಲಾಗ್ ಔಟ್ ಆಗಿದೆ',
    'message.logoutError': 'ಲಾಗ್ ಔಟ್ ವಿಫಲವಾಗಿದೆ',

    // Common
    'language.english': 'English',
    'language.kannada': 'ಕನ್ನಡ',
    'button.viewDetails': 'ವಿವರಗಳನ್ನು ನೋಡಿ',
    'button.close': 'ಮುಚ್ಚಿರಿ',
    'button.applyNow': 'ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    'search.placeholder': 'ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ...',
    'filter.allCategories': 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
    
    // Categories
    'category.lifeInsurance': 'ಜೀವ ವಿಮೆ',
    'category.savings': 'ಉಳಿತಾಯ',
    'category.income': 'ಆದಾಯ',
    'category.health': 'ಆರೋಗ್ಯ',
    'category.endowment': 'ಎಂಡೋಮೆಂಟ್',
    
    // Policy Details
    'policy.policyTerm': 'ಪಾಲಿಸಿ ಅವಧಿ',
    'policy.premium': 'ಪ್ರೀಮಿಯಂ ಪ್ರಾರಂಭ',
    'policy.idealFor': 'ಇವರಿಗೆ ಸೂಕ್ತ',
    'policy.whatYouGet': 'ನೀವು ಪಡೆಯುವುದು',
    'policy.benefits': 'ಪ್ರಯೋಜನಗಳು',
    'policy.importantPoints': 'ಮುಖ್ಯ ಅಂಶಗಳು',
    
    // Dashboard
    'dashboard.activePolicies': 'ಸಕ್ರಿಯ ಪಾಲಿಸಿಗಳು',
    'dashboard.totalInvestment': 'ಒಟ್ಟು ಹೂಡಿಕೆ',
    'dashboard.returns': 'ಲಾಭಗಳು',
    'dashboard.nextMeeting': 'ಮುಂದಿನ ಸಭೆ',
    'dashboard.recentPolicies': 'ಇತ್ತೀಚಿನ ಪಾಲಿಸಿಗಳು',
    'dashboard.upcomingAppointments': 'ಮುಂಬರುವ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು',
    'dashboard.viewDetails': 'ವಿವರಗಳನ್ನು ನೋಡಿ',
    
    // Page Titles
    'title.insurancePlans': 'ಎಲ್‌ಐಸಿ ವಿಮಾ ಯೋಜನೆಗಳು',
    'subtitle.insurancePlans': 'ನಿಮ್ಮ ಭವಿಷ್ಯವನ್ನು ನಮ್ಮ ವಿಶ್ವಾಸಾರ್ಹ ವಿಮಾ ಯೋಜನೆಗಳೊಂದಿಗೆ ಸುರಕ್ಷಿತಗೊಳಿಸಿ',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};