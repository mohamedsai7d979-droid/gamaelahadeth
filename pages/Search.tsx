import React, { useEffect, useState } from 'react';
import { Search as SearchIcon, ArrowLeft, Filter } from 'lucide-react';
import { Page, Hadith } from '../types';
import HadithCard from '../components/HadithCard';
import { searchHadiths } from '../services/geminiService';

interface SearchProps {
  query: string;
  setPage: (page: Page) => void;
}

const Search: React.FC<SearchProps> = ({ query, setPage }) => {
  const [results, setResults] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      setError(null);
      try {
        const data = await searchHadiths(query);
        setResults(data);
      } catch (err) {
        setError('تعذر جلب النتائج. تأكد من اتصالك بالإنترنت أو حاول بكلمات أخرى.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center gap-4">
            <button onClick={() => setPage(Page.HOME)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                <ArrowLeft />
            </button>
            <div className="flex-1">
                <h2 className="text-xl font-bold text-primary">نتائج البحث عن: <span className="text-secondary">"{query}"</span></h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <Filter size={16} />
                <span className="hidden sm:inline">تصفية النتائج</span>
            </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-xl h-64 animate-pulse shadow-sm border border-gray-100 p-6">
                        <div className="flex justify-between mb-6">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        <div className="h-10 bg-gray-100 rounded mt-auto"></div>
                    </div>
                ))}
            </div>
        ) : error ? (
            <div className="text-center py-20">
                <div className="text-red-400 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">عذراً</h3>
                <p className="text-gray-600">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                    إعادة المحاولة
                </button>
            </div>
        ) : results.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                <SearchIcon size={64} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">لم يتم العثور على نتائج</h3>
                <p className="text-gray-500">حاول البحث بكلمات مختلفة أو أكثر شمولاً.</p>
            </div>
        ) : (
            <div className="animate-fadeIn">
                <p className="text-gray-500 mb-6 text-sm">تم العثور على {results.length} حديث مرتبط ببحثك</p>
                {results.map((hadith) => (
                    <HadithCard key={hadith.id} hadith={hadith} />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Search;