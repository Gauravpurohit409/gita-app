import { useParams, Link } from 'react-router-dom';
import gitaData from '../data/gita.json';
import './ChapterDetail.css';

function ChapterDetail() {
  const { id } = useParams();
  const chapter = gitaData.chapters.find(c => c.id === parseInt(id));

  if (!chapter) {
    return <div className="not-found">अध्याय नहीं मिला</div>;
  }

  return (
    <div className="chapter-detail">
      <header className="detail-header">
        <Link to="/" className="back-btn">← वापस</Link>
        <h1>अध्याय {chapter.id}</h1>
        <h2>{chapter.name}</h2>
        <p>{chapter.name_transliterated}</p>
      </header>

      <div className="verses-container">
        {chapter.verses.map((verse) => (
          <div key={verse.verse} className="verse-card">
            <div className="verse-number">श्लोक {verse.verse}</div>
            <div className="sanskrit-text">{verse.sanskrit}</div>
            <div className="hindi-text">{verse.hindi}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterDetail;
