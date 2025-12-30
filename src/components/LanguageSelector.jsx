import { useState } from 'react';
import './LanguageSelector.css';

const languages = [
  { code: 'hi', name: 'हिंदी', nameEn: 'Hindi', flag: '🇮🇳' },
  { code: 'en', name: 'English', nameEn: 'English', flag: '🇬🇧' },
];

function LanguageSelector({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (langCode) => {
    setSelected(langCode);
  };

  const handleContinue = () => {
    if (selected) {
      localStorage.setItem('preferredLanguage', selected);
      onSelect(selected);
    }
  };

  return (
    <div className="language-selector">
      <div className="selector-container">
        <div className="om-symbol">ॐ</div>
        <h1>श्रीमद्भगवद्गीता</h1>
        <p className="subtitle">Shrimad Bhagavad Gita</p>
        
        <div className="language-prompt">
          <h2>भाषा चुनें / Select Language</h2>
          <p>कृपया अनुवाद के लिए भाषा चुनें</p>
        </div>

        <div className="language-options">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${selected === lang.code ? 'selected' : ''}`}
              onClick={() => handleSelect(lang.code)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-name">{lang.name}</span>
              <span className="lang-name-en">{lang.nameEn}</span>
            </button>
          ))}
        </div>

        <button 
          className={`continue-btn ${selected ? 'active' : ''}`}
          onClick={handleContinue}
          disabled={!selected}
        >
          आगे बढ़ें / Continue →
        </button>

        <p className="note">
          * संस्कृत श्लोक के नीचे चयनित भाषा में अर्थ दिखाया जाएगा
        </p>
      </div>
    </div>
  );
}

export default LanguageSelector;
