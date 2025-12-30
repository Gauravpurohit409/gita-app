import { Link } from 'react-router-dom';
import gitaData from '../data/gita.json';
import './ChapterList.css';

function ChapterList() {
  return (
    <div className="chapter-list">
      <header className="app-header">
        <h1>श्रीमद्भगवद्गीता</h1>
        <p>Shrimad Bhagavad Gita</p>
      </header>
      
      <div className="chapters-grid">
        {gitaData.chapters.map((chapter) => (
          <Link to={`/chapter/${chapter.id}`} key={chapter.id} className="chapter-card">
            <div className="chapter-number">अध्याय {chapter.id}</div>
            <h2 className="chapter-name">{chapter.name}</h2>
            <p className="chapter-name-en">{chapter.name_transliterated}</p>
            <p className="verse-count">{chapter.verses_count} श्लोक</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
