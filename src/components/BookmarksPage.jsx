import { useNavigate } from 'react-router-dom';
import gitaData from '../data/gita.json';
import './BookmarksPage.css';

function BookmarksPage({ darkMode, bookmarks, toggleBookmark, fontSize }) {
  const navigate = useNavigate();

  const getBookmarkedVerses = () => {
    return bookmarks.map(key => {
      const [chapId, verseId] = key.split('-').map(Number);
      const chapter = gitaData.chapters.find(c => c.id === chapId);
      if (!chapter) return null;
      const verse = chapter.verses.find(v => v.verse === verseId);
      if (!verse) return null;
      return { 
        key,
        chapterId: chapId, 
        chapterName: chapter.name, 
        ...verse 
      };
    }).filter(Boolean);
  };

  const bookmarkedVerses = getBookmarkedVerses();

  return (
    <div className={`bookmarks-page ${darkMode ? 'dark' : ''}`}>
      <header className="bookmarks-header">
        <button onClick={() => navigate('/')} className="back-btn">← वापस</button>
        <h1>🔖 सहेजे गए श्लोक</h1>
      </header>

      <div className="bookmarks-container">
        {bookmarkedVerses.length === 0 ? (
          <div className="no-bookmarks">
            <div className="empty-icon">📑</div>
            <p>अभी तक कोई श्लोक सहेजा नहीं गया</p>
            <small>किसी भी श्लोक पर 📑 बटन दबाकर सहेजें</small>
          </div>
        ) : (
          bookmarkedVerses.map((verse) => (
            <div key={verse.key} className="bookmark-card">
              <div className="bookmark-header">
                <span 
                  className="bookmark-location"
                  onClick={() => navigate(`/chapter/${verse.chapterId}#verse-${verse.verse}`)}
                >
                  अध्याय {verse.chapterId} ({verse.chapterName}) - श्लोक {verse.verse}
                </span>
                <button 
                  className="remove-btn"
                  onClick={() => toggleBookmark(verse.chapterId, verse.verse)}
                  title="Remove bookmark"
                >
                  ✕
                </button>
              </div>
              <div className="bookmark-sanskrit" style={{ fontSize: `${fontSize}px` }}>{verse.sanskrit}</div>
              <div className="bookmark-hindi" style={{ fontSize: `${fontSize - 2}px` }}>{verse.hindi}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookmarksPage;
