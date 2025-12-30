import { useParams, useNavigate } from 'react-router-dom';
import { Share } from '@capacitor/share';
import gitaData from '../data/gita.json';
import './ChapterDetail.css';

function ChapterDetail({ darkMode, fontSize, toggleBookmark, isBookmarked }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const chapter = gitaData.chapters.find(c => c.id === parseInt(id));

  if (!chapter) {
    return <div className="not-found">अध्याय नहीं मिला</div>;
  }

  const handleShare = async (verse) => {
    try {
      await Share.share({
        title: `भगवद्गीता - अध्याय ${chapter.id}, श्लोक ${verse.verse}`,
        text: `${verse.sanskrit}\n\n${verse.hindi}\n\n- श्रीमद्भगवद्गीता`,
        dialogTitle: 'श्लोक साझा करें'
      });
    } catch (err) {
      // Fallback for web
      if (navigator.share) {
        navigator.share({
          title: `भगवद्गीता - अध्याय ${chapter.id}, श्लोक ${verse.verse}`,
          text: `${verse.sanskrit}\n\n${verse.hindi}\n\n- श्रीमद्भगवद्गीता`
        });
      }
    }
  };

  return (
    <div className={`chapter-detail ${darkMode ? 'dark' : ''}`}>
      <header className="detail-header">
        <button onClick={() => navigate('/')} className="back-btn">← वापस</button>
        <h1>अध्याय {chapter.id}</h1>
        <h2>{chapter.name}</h2>
        <p>{chapter.name_transliterated}</p>
      </header>

      <div className="verses-container">
        {chapter.verses.map((verse) => (
          <div key={verse.verse} className="verse-card" id={`verse-${verse.verse}`}>
            <div className="verse-header">
              <div className="verse-number">श्लोक {verse.verse}</div>
              <div className="verse-actions">
                <button 
                  className={`action-btn ${isBookmarked(chapter.id, verse.verse) ? 'bookmarked' : ''}`}
                  onClick={() => toggleBookmark(chapter.id, verse.verse)}
                  title="Bookmark"
                >
                  {isBookmarked(chapter.id, verse.verse) ? '🔖' : '📑'}
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
            <div className="sanskrit-text" style={{ fontSize: `${fontSize}px` }}>{verse.sanskrit}</div>
            <div className="hindi-text" style={{ fontSize: `${fontSize - 2}px` }}>{verse.hindi}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterDetail;
