import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-5 w-5 text-gray-500" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'kn')}
        className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-md"
      >
        <option value="en">{t('language.english')}</option>
        <option value="kn">{t('language.kannada')}</option>
      </select>
    </div>
  );
};