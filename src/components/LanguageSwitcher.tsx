import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-luxury-cream/60 text-sm">{t('footer.language')}</span>
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-luxury-cream/10 hover:bg-accent transition-colors text-sm font-medium"
        aria-label="Toggle language"
      >
        <Globe className="w-4 h-4" />
        {i18n.language === 'fr' ? 'EN' : 'FR'}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
