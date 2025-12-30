// Bhagavad Gita API Service
// Using: https://vedicscriptures.github.io/

const BASE_URL = 'https://vedicscriptures.github.io';

// Cache to avoid repeated API calls
const cache = {
  chapters: null,
  verses: {}
};

// Get all chapters
export async function getChapters() {
  if (cache.chapters) {
    return cache.chapters;
  }
  
  try {
    const response = await fetch(`${BASE_URL}/chapters`);
    const data = await response.json();
    cache.chapters = data;
    return data;
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return getFallbackChapters();
  }
}

// Get a specific chapter
export async function getChapter(chapterId) {
  try {
    const response = await fetch(`${BASE_URL}/chapter/${chapterId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chapter:', error);
    return null;
  }
}

// Get a specific verse
export async function getVerse(chapterId, verseId) {
  const cacheKey = `${chapterId}-${verseId}`;
  if (cache.verses[cacheKey]) {
    return cache.verses[cacheKey];
  }
  
  try {
    const response = await fetch(`${BASE_URL}/slok/${chapterId}/${verseId}`);
    const data = await response.json();
    cache.verses[cacheKey] = data;
    return data;
  } catch (error) {
    console.error('Error fetching verse:', error);
    return null;
  }
}

// Get all verses for a chapter
export async function getChapterVerses(chapterId, versesCount) {
  const verses = [];
  
  // Fetch verses in batches for better performance
  const batchSize = 10;
  for (let i = 1; i <= versesCount; i += batchSize) {
    const batch = [];
    for (let j = i; j < i + batchSize && j <= versesCount; j++) {
      batch.push(getVerse(chapterId, j));
    }
    const results = await Promise.all(batch);
    verses.push(...results.filter(v => v !== null));
  }
  
  return verses;
}

// Fallback chapter data if API fails
function getFallbackChapters() {
  return [
    { chapter_number: 1, name: "अर्जुनविषादयोग", name_transliterated: "Arjuna Visada Yoga", verses_count: 47 },
    { chapter_number: 2, name: "सांख्ययोग", name_transliterated: "Sankhya Yoga", verses_count: 72 },
    { chapter_number: 3, name: "कर्मयोग", name_transliterated: "Karma Yoga", verses_count: 43 },
    { chapter_number: 4, name: "ज्ञानकर्मसंन्यासयोग", name_transliterated: "Jnana Karma Sannyasa Yoga", verses_count: 42 },
    { chapter_number: 5, name: "कर्मसंन्यासयोग", name_transliterated: "Karma Sannyasa Yoga", verses_count: 29 },
    { chapter_number: 6, name: "आत्मसंयमयोग", name_transliterated: "Atma Samyama Yoga", verses_count: 47 },
    { chapter_number: 7, name: "ज्ञानविज्ञानयोग", name_transliterated: "Jnana Vijnana Yoga", verses_count: 30 },
    { chapter_number: 8, name: "अक्षरब्रह्मयोग", name_transliterated: "Akshara Brahma Yoga", verses_count: 28 },
    { chapter_number: 9, name: "राजविद्याराजगुह्ययोग", name_transliterated: "Raja Vidya Raja Guhya Yoga", verses_count: 34 },
    { chapter_number: 10, name: "विभूतियोग", name_transliterated: "Vibhuti Yoga", verses_count: 42 },
    { chapter_number: 11, name: "विश्वरूपदर्शनयोग", name_transliterated: "Visvarupa Darsana Yoga", verses_count: 55 },
    { chapter_number: 12, name: "भक्तियोग", name_transliterated: "Bhakti Yoga", verses_count: 20 },
    { chapter_number: 13, name: "क्षेत्रक्षेत्रज्ञविभागयोग", name_transliterated: "Ksetra Ksetrajna Vibhaga Yoga", verses_count: 35 },
    { chapter_number: 14, name: "गुणत्रयविभागयोग", name_transliterated: "Gunatraya Vibhaga Yoga", verses_count: 27 },
    { chapter_number: 15, name: "पुरुषोत्तमयोग", name_transliterated: "Purusottama Yoga", verses_count: 20 },
    { chapter_number: 16, name: "दैवासुरसम्पद्विभागयोग", name_transliterated: "Daivasura Sampad Vibhaga Yoga", verses_count: 24 },
    { chapter_number: 17, name: "श्रद्धात्रयविभागयोग", name_transliterated: "Sraddhatraya Vibhaga Yoga", verses_count: 28 },
    { chapter_number: 18, name: "मोक्षसंन्यासयोग", name_transliterated: "Moksha Sannyasa Yoga", verses_count: 78 }
  ];
}

export default {
  getChapters,
  getChapter,
  getVerse,
  getChapterVerses
};
