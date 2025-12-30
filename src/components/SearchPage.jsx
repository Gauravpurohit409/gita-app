import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gitaData from '../data/gita.json';
import './SearchPage.css';

function SearchPage({ darkMode, fontSize }) {
  const [chapterNum, setChapterNum] = useState('');
  const [verseNum, setVerseNum] = useState('');
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [searchMode, setSearchMode] = useState('number'); // 'number' or 'text'
  const navigate = useNavigate();

  const searchByNumber = () => {
    const chapId = parseInt(chapterNum);
    const versId = parseInt(verseNum);
    
    const chapter = gitaData.chapters.find(c => c.id === chapId);
    if (!chapter) {
      setResults([{ error: 'अध्याय नहीं मिला' }]);
      return;
    }
    
    if (verseNum) {
      const verse = chapter.verses.find(v => v.verse === versId);
      if (verse) {
        setResults([{ chapter: chapId, chapterName: chapter.name, ...verse }]);
      } else {
        setResults([{ error: 'श्लोक नहीं मिला' }]);
      }
    } else {
      // Show all verses of chapter
      setResults(chapter.verses.map(v => ({ chapter: chapId, chapterName: chapter.name, ...v })));
    }
  };

  const searchByText = () => {
    if (!searchText.trim()) return;
    
    const found = [];
    gitaData.chapters.forEach(chapter => {
      chapter.verses.forEach(verse => {
        if (verse.sanskrit.includes(searchText) || verse.hindi.includes(searchText)) {
          found.push({ chapter: chapter.id, chapterName: chapter.name, ...verse });
        }
      });
    });
    
    setResults(found.length ? found : [{ error: 'कोई परिणाम नहीं मिला' }]);
  };

  const goToVerse = (chapId, verseId) => {
    navigate(`/chapter/${chapId}#verse-${verseId}`);
  };

  return (
    <div className={`search-page ${darkMode ? 'dark' : ''}`}>
      <header className="search-header">
        <button onClick={() => navigate('/')} className="back-btn">← वापस</button>
        <h1>🔍 खोजें</h1>
      </header>

      <div className="search-tabs">
        <button 
          className={`tab-btn ${searchMode === 'number' ? 'active' : ''}`}
          onClick={() => setSearchMode('number')}
        >
          श्लोक संख्या से
        </button>
        <button 
          className={`tab-btn ${searchMode === 'text' ? 'active' : ''}`}
          onClick={() => setSearchMode('text')}
        >
          शब्द से खोजें
        </button>
      </div>

      <div className="search-form">
        {searchMode === 'number' ? (
          <div className="number-search">
            <div className="input-group">
              <label>अध्याय</label>
              <input 
                type="number" 
                min="1" 
                max="18"
                placeholder="1-18"
                value={chapterNum}
                onChange={(e) => setChapterNum(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>श्लोक (वैकल्पिक)</label>
              <input 
                type="number" 
                min="1"
                placeholder="श्लोक संख्या"
                value={verseNum}
                onChange={(e) => setVerseNum(e.target.value)}
              />
            </div>
            <button className="search-btn" onClick={searchByNumber}>खोजें</button>
          </div>
        ) : (
          <div className="text-search">
            <input 
              type="text"
              placeholder="संस्कृत या हिंदी में खोजें..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchByText()}
            />
            <button className="search-btn" onClick={searchByText}>खोजें</button>
          </div>
        )}
      </div>

      <div className="search-results">
        {results.map((result, idx) => (
          result.error ? (
            <div key={idx} className="no-result">{result.error}</div>
          ) : (
            <div 
              key={idx} 
              className="result-card"
              onClick={() => goToVerse(result.chapter, result.verse)}
            >
              <div className="result-header">
                अध्याय {result.chapter} ({result.chapterName}) - श्लोक {result.verse}
              </div>
              <div className="result-sanskrit" style={{ fontSize: `${fontSize}px` }}>{result.sanskrit}</div>
              <div className="result-hindi" style={{ fontSize: `${fontSize - 2}px` }}>{result.hindi}</div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
