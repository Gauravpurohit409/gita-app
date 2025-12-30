import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { App as CapApp } from '@capacitor/app';
import ChapterList from './components/ChapterList';
import ChapterDetail from './components/ChapterDetail';
import SearchPage from './components/SearchPage';
import BookmarksPage from './components/BookmarksPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import LanguageSelector from './components/LanguageSelector';
import './App.css';

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || null;
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem('fontSize')) || 16;
  });
  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(localStorage.getItem('bookmarks')) || [];
  });

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Handle Android back button
  useEffect(() => {
    const handleBackButton = CapApp.addListener('backButton', () => {
      // Check if on home page
      if (window.location.pathname === '/' || window.location.pathname === '') {
        CapApp.exitApp();
      } else {
        window.history.back();
      }
    });

    return () => {
      handleBackButton.remove();
    };
  }, []);

  const toggleBookmark = (chapterId, verseId) => {
    const key = `${chapterId}-${verseId}`;
    setBookmarks(prev => {
      if (prev.includes(key)) {
        return prev.filter(b => b !== key);
      }
      return [...prev, key];
    });
  };

  const isBookmarked = (chapterId, verseId) => {
    return bookmarks.includes(`${chapterId}-${verseId}`);
  };

  // Show language selector on first launch
  if (!language) {
    return <LanguageSelector onSelect={handleLanguageSelect} />;
  }

  const appProps = { darkMode, setDarkMode, fontSize, setFontSize, toggleBookmark, isBookmarked, bookmarks, language, setLanguage };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChapterList {...appProps} />} />
        <Route path="/chapter/:id" element={<ChapterDetail {...appProps} />} />
        <Route path="/search" element={<SearchPage {...appProps} />} />
        <Route path="/bookmarks" element={<BookmarksPage {...appProps} />} />
        <Route path="/privacy" element={<PrivacyPolicy {...appProps} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
