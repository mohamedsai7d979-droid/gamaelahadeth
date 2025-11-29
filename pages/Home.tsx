import React, { useState, useEffect } from 'react';
import { Search, Sparkles, BookOpen, Quote, ChevronLeft } from 'lucide-react';
import { Page, Hadith } from '../types';
import HadithCard from '../components/HadithCard';
import { getHadithOfTheDay } from '../services/geminiService';

interface HomeProps {
  setPage: (page: Page) => void;
  setSearchQuery: (q: string) => void;
}

const Home: React.FC<HomeProps> = ({ setPage, setSearchQuery }) => {
  const [localQuery, setLocalQuery] = useState('');
  const [dailyHadith, setDailyHadith] = useState<Hadith | null>(null);

  useEffect(() => {
    const fetchDaily = async () => {
        const hadith = await getHadithOfTheDay();
        setDailyHadith(hadith);
    };
    fetchDaily();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchQuery(localQuery);
      setPage(Page.SEARCH);
    }
  };

  const categories = [
    { name: 'الصلاة', icon: '🕌' },
    { name: 'الأخلاق', icon: '🤝' },
    { name: 'العقيدة', icon: '☝️' },
    { name: 'المعاملات', icon: '💰' },
    { name: 'القرآن', icon: '📖' },
    { name: 'الذكر', icon: '📿' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary overflow-hidden">
        {/* Decorative Pattern Background */}
        <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="2" fill="#D4AF37" />
                        <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
            </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <h2 className="text-secondary text-lg font-medium mb-4 animate-fadeIn">قال رسول الله ﷺ: «بَلِّغُوا عَنِّي وَلَوْ آيَةً»</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans">
             جامع <span className="text-secondary">الأحاديث</span>
          </h1>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto font-light">
            محرك بحث ذكي يجمع لك صحيح السنة النبوية، مع التخريج والشرح بضغطة زر.
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="ابحث عن حديث، راوٍ، أو موضوع (مثال: فضل الصدقة)..."
              className="w-full px-6 py-4 pr-12 rounded-full text-lg shadow-2xl border-2 border-transparent focus:border-secondary focus:outline-none text-gray-800 transition-all"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search />
            </div>
            <button 
                type="submit"
                className="absolute left-2 top-2 bottom-2 bg-primary text-white px-6 rounded-full hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
            >
                بحث
            </button>
          </form>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
          {/* Daily Hadith Section (Left Column - takes 2/3 on desktop) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-secondary" />
                <h3 className="text-2xl font-bold text-primary">حديث اليوم</h3>
            </div>
            {dailyHadith ? (
                <HadithCard hadith={dailyHadith} />
            ) : (
                <div className="bg-white p-12 rounded-xl shadow-sm text-center">
                    <div className="animate-spin h-8 w-8 border-4 border-secondary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-500">جاري تحميل حديث مختار...</p>
                </div>
            )}
            
            <div className="mt-8">
                <div className="flex items-center gap-2 mb-6">
                    <BookOpen className="text-secondary" />
                    <h3 className="text-2xl font-bold text-primary">كتب الحديث المعتمدة</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['صحيح البخاري', 'صحيح مسلم', 'سنن النسائي', 'سنن أبي داود', 'جامع الترمذي', 'سنن ابن ماجه'].map((book, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between hover:border-secondary transition-colors cursor-pointer group">
                            <span className="font-semibold text-gray-700">{book}</span>
                            <ChevronLeft size={18} className="text-gray-300 group-hover:text-secondary transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Sidebar (Categories & Stats) */}
          <div className="lg:col-span-1 space-y-8">
             {/* Categories */}
             <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-primary mb-4 border-b border-gray-100 pb-2">تصفح بالموضوع</h3>
                <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                        <button 
                            key={cat.name}
                            onClick={() => {
                                setSearchQuery(cat.name);
                                setPage(Page.SEARCH);
                            }}
                            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-secondary/10 hover:text-primary transition-all group"
                        >
                            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{cat.icon}</span>
                            <span className="text-sm font-medium">{cat.name}</span>
                        </button>
                    ))}
                </div>
             </div>

             {/* Quote/Benefits */}
             <div className="bg-primary text-white rounded-xl shadow-md p-6 relative overflow-hidden">
                <Quote className="absolute top-4 left-4 text-white/10" size={60} />
                <h3 className="text-lg font-bold text-secondary mb-3">فائدة علمية</h3>
                <p className="leading-relaxed text-sm opacity-90 relative z-10">
                    قال الإمام الزهري رحمه الله:
                    <br/>
                    "إن هذا العلم دين، فانظروا عمن تأخذون دينكم".
                    <br/>
                    <br/>
                    التثبت في نقل الحديث من أعظم القربات إلى الله، وهو صيانة للشريعة.
                </p>
             </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;