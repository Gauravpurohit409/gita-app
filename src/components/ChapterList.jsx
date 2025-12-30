import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getChapters } from '../services/gitaApi';
import './ChapterList.css';

function ChapterList({ darkMode, setDarkMode, fontSize, setFontSize, language, setLanguage }) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChapters() {
      setLoading(true);
      const data = await getChapters();
      setChapters(data);
      setLoading(false);
    }
    fetchChapters();
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'hi' ? 'en' : 'hi';
    setLanguage(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  if (loading) {
    return (
      <div className={`chapter-list ${darkMode ? 'dark' : ''}`}>
        <div className="loading">🙏 {language === 'en' ? 'Loading...' : 'लोड हो रहा है...'}</div>
      </div>
    );
  }

  return (
    <div className={`chapter-list ${darkMode ? 'dark' : ''}`}>
      <header className="app-header">
        <div className="header-controls">
          <button className="icon-btn" onClick={() => setDarkMode(!darkMode)} title="Toggle Dark Mode">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className="icon-btn lang-btn" onClick={toggleLanguage} title="Change Language">
            {language === 'hi' ? 'EN' : 'हि'}
          </button>
          <Link to="/search" className="icon-btn" title="Search">🔍</Link>
          <Link to="/bookmarks" className="icon-btn" title="Bookmarks">🔖</Link>
        </div>
        <h1>श्रीमद्भगवद्गीता</h1>
        <p>Shrimad Bhagavad Gita</p>
      </header>
      
      <div className="chapters-grid">
        {chapters.map((chapter) => (
          <Link to={`/chapter/${chapter.chapter_number}`} key={chapter.chapter_number} className="chapter-card">
            <div className="chapter-number">{language === 'en' ? `Chapter ${chapter.chapter_number}` : `अध्याय ${chapter.chapter_number}`}</div>
            <h2 className="chapter-name">{chapter.name}</h2>
            <p className="chapter-name-en">{chapter.name_transliterated}</p>
            <p className="verse-count">{chapter.verses_count} {language === 'en' ? 'verses' : 'श्लोक'}</p>
          </Link>
        ))}
      </div>

      <footer className="app-footer">
        <Link to="/privacy" className="footer-link">Privacy Policy</Link>
      </footer>
    </div>
  );
}

export default ChapterList;
