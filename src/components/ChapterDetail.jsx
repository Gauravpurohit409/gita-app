import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share } from '@capacitor/share';
import { getChapter, getVerse } from '../services/gitaApi';
import './ChapterDetail.css';

// Helper function to get translation based on language
function getTranslation(verse, language) {
  if (language === 'en') {
    // English translations - try multiple sources
    return verse.prabhu?.et || verse.siva?.et || verse.purohit?.et || verse.gambir?.et || 'Translation not available';
  } else {
    // Hindi translations (default)
    return verse.tej?.ht || verse.rams?.ht || verse.hindi || 'हिंदी अनुवाद उपलब्ध नहीं';
  }
}

function ChapterDetail({ darkMode, fontSize, toggleBookmark, isBookmarked, language }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    async function fetchChapterData() {
      setLoading(true);
      setVerses([]);
      setLoadingProgress(0);
      
      // Get chapter info
      const chapterData = await getChapter(parseInt(id));
      if (chapterData) {
        setChapter(chapterData);
        
        // Fetch verses one by one for progress feedback
        const versesCount = chapterData.verses_count;
        const fetchedVerses = [];
        
        for (let i = 1; i <= versesCount; i++) {
          const verse = await getVerse(parseInt(id), i);
          if (verse) {
            fetchedVerses.push(verse);
            setVerses([...fetchedVerses]);
            setLoadingProgress(Math.round((i / versesCount) * 100));
          }
        }
      }
      setLoading(false);
    }
    fetchChapterData();
  }, [id]);

  if (loading && !chapter) {
    return (
      <div className={`chapter-detail ${darkMode ? 'dark' : ''}`}>
        <div className="loading">
          <div>🙏 अध्याय लोड हो रहा है...</div>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return <div className={`not-found ${darkMode ? 'dark' : ''}`}>अध्याय नहीं मिला</div>;
  }

  const handleShare = async (verse) => {
    const sanskrit = verse.slok || verse.sanskrit || '';
    const translation = getTranslation(verse, language);
    
    try {
      await Share.share({
        title: `Bhagavad Gita - Chapter ${id}, Verse ${verse.verse}`,
        text: `${sanskrit}\n\n${translation}\n\n- Shrimad Bhagavad Gita`,
        dialogTitle: 'Share Verse'
      });
    } catch (err) {
      if (navigator.share) {
        navigator.share({
          title: `Bhagavad Gita - Chapter ${id}, Verse ${verse.verse}`,
          text: `${sanskrit}\n\n${translation}\n\n- Shrimad Bhagavad Gita`
        });
      }
    }
  };

  return (
    <div className={`chapter-detail ${darkMode ? 'dark' : ''}`}>
      <header className="detail-header">
        <button onClick={() => navigate('/')} className="back-btn">←</button>
        <h1>अध्याय {chapter.chapter_number}</h1>
        <h2>{chapter.name}</h2>
        <p>{chapter.name_transliterated}</p>
      </header>

      {loading && (
        <div className="loading-bar">
          <div className="progress" style={{ width: `${loadingProgress}%` }}></div>
          <span>{loadingProgress}% - {verses.length}/{chapter.verses_count} श्लोक</span>
        </div>
      )}

      <div className="verses-container">
        {verses.map((verse) => (
          <div key={verse.verse} className="verse-card" id={`verse-${verse.verse}`}>
            <div className="verse-header">
              <div className="verse-number">श्लोक {verse.verse}</div>
              <div className="verse-actions">
                <button 
                  className={`action-btn ${isBookmarked(parseInt(id), verse.verse) ? 'bookmarked' : ''}`}
                  onClick={() => toggleBookmark(parseInt(id), verse.verse)}
                  title="Bookmark"
                >
                  {isBookmarked(parseInt(id), verse.verse) ? '🔖' : '📑'}
                </button>
                <button 
                  className="action-btn"
                  onClick={() => handleShare(verse)}
                  title="Share"
                >
                  📤
                </button>
              </div>
            </div>
            <div className="sanskrit-text" style={{ fontSize: `${fontSize}px` }}>
              {verse.slok || verse.sanskrit}
            </div>
            <div className="translation-label">
              {language === 'en' ? 'English Translation:' : 'हिंदी अर्थ:'}
            </div>
            <div className="translation-text" style={{ fontSize: `${fontSize - 2}px` }}>
              {getTranslation(verse, language)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterDetail;
