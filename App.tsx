import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import { Page } from './types';
import { Info, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.HOME);
  const [searchQuery, setSearchQuery] = useState('');

  // Fallback for missing API Key
  const hasApiKey = !!process.env.API_KEY;

  if (!hasApiKey) {
      return (
          <div className="min-h-screen bg-primary flex items-center justify-center text-white text-center p-4" dir="rtl">
              <div className="max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                  <AlertTriangle size={64} className="mx-auto text-secondary mb-4" />
                  <h1 className="text-2xl font-bold mb-4 font-sans">مفتاح API مفقود</h1>
                  <p className="mb-6 opacity-90 font-serif">
                      لم يتم العثور على مفتاح Google Gemini API. يرجى التأكد من إضافته في ملف البيئة لتشغيل التطبيق بشكل صحيح.
                  </p>
                  <p className="text-xs text-gray-400">process.env.API_KEY is undefined</p>
              </div>
          </div>
      );
  }

  const renderContent = () => {
    switch (activePage) {
      case Page.HOME:
        return <Home setPage={setActivePage} setSearchQuery={setSearchQuery} />;
      case Page.SEARCH:
        return <Search query={searchQuery} setPage={setActivePage} />;
      case Page.BOOK:
        return (
            <div className="min-h-screen flex items-center justify-center flex-col text-gray-500">
                <Info size={48} className="mb-4 text-secondary" />
                <h2 className="text-2xl font-bold text-primary mb-2">صفحة الكتب</h2>
                <p>قريباً: تصفح الكتب الستة كاملة.</p>
                <button onClick={() => setActivePage(Page.HOME)} className="mt-6 text-primary underline">العودة للرئيسية</button>
            </div>
        );
      case Page.ABOUT:
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                 <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center border-t-8 border-secondary">
                    <h1 className="text-3xl font-bold text-primary mb-6">عن جامع الأحاديث</h1>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        "جامع الأحاديث" هو منصة إلكترونية متخصصة تجمع الأحاديث النبوية من جميع مصادرها الموثوقة، 
                        مع عرض درجة صحتها، وتخريجها، وشروح العلماء عليها، ضمن محرك بحث ذكي وسهل الاستخدام. 
                        يهدف الموقع إلى توفير مرجع شامل للباحثين وطلاب العلم وكل من يرغب في فهم السنة النبوية بدقة وموثوقية.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-right">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-bold text-secondary mb-2">الدقة والموثوقية</h3>
                            <p className="text-sm text-gray-600">نعتمد على مصادر السنة المعتمدة وأحكام المحدثين الكبار.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-bold text-secondary mb-2">الذكاء الاصطناعي</h3>
                            <p className="text-sm text-gray-600">استخدام تقنيات AI لتحليل المعاني وتسهيل البحث الموضوعي.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-bold text-secondary mb-2">سهولة الوصول</h3>
                            <p className="text-sm text-gray-600">تصميم عصري متجاوب يعمل على جميع الأجهزة.</p>
                        </div>
                    </div>
                 </div>
            </div>
        );
      default:
        return <Home setPage={setActivePage} setSearchQuery={setSearchQuery} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-off-white" dir="rtl">
      <Navbar setPage={setActivePage} activePage={activePage} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <footer className="bg-primary text-white py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-serif text-lg opacity-90 mb-2">«تَرَكْتُ فِيكُمْ مَا إِنْ تَمَسَّكْتُمْ بِهِ لَنْ تَضِلُّوا بَعْدِي أَبَدًا: كِتَابَ اللَّهِ وَسُنَّتِي»</p>
            <p className="text-sm text-gray-400 mt-6">© 2025 جامع الأحاديث - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
};

export default App;