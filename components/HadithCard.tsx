import React, { useState } from 'react';
import { Share2, Copy, Book, Info, CheckCircle, AlertCircle, Bookmark } from 'lucide-react';
import { Hadith } from '../types';

interface HadithCardProps {
  hadith: Hadith;
}

const HadithCard: React.FC<HadithCardProps> = ({ hadith }) => {
  const [copied, setCopied] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${hadith.text}\n\nالراوي: ${hadith.narrator}\nالمصدر: ${hadith.book}\nالدرجة: ${hadith.grade}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('صحيح')) return 'bg-green-100 text-green-800 border-green-200';
    if (grade.includes('حسن')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (grade.includes('ضعيف') || grade.includes('موضوع')) return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getGradeIcon = (grade: string) => {
    if (grade.includes('صحيح') || grade.includes('حسن')) return <CheckCircle size={16} />;
    return <AlertCircle size={16} />;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-6">
      {/* Header Info */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Book size={18} className="text-secondary" />
          <span className="text-sm font-semibold text-gray-600">{hadith.book}</span>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-gray-500">عن: {hadith.narrator}</span>
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${getGradeColor(hadith.grade)}`}>
          {getGradeIcon(hadith.grade)}
          {hadith.grade}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-xl md:text-2xl font-serif leading-loose text-gray-800 text-justify mb-6 relative z-10">
          <span className="text-secondary text-3xl opacity-50 absolute -top-4 -right-2">❝</span>
          {hadith.text}
          <span className="text-secondary text-3xl opacity-50 relative top-2 mr-2">❞</span>
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hadith.tags.map((tag, idx) => (
            <span key={idx} className="bg-primary/5 text-primary text-xs px-2 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>

        {/* Explanation Accordion */}
        <div className="mt-4">
          <button 
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2 text-sm text-secondary hover:text-secondary-hover transition-colors font-semibold"
          >
            <Info size={16} />
            {showExplanation ? 'إخفاء الشرح' : 'عرض الشرح'}
          </button>
          
          {showExplanation && (
            <div className="mt-3 p-4 bg-amber-50 rounded-lg border border-amber-100 text-gray-700 text-sm leading-relaxed animate-fadeIn">
              <h4 className="font-bold mb-1 text-amber-800">الشرح المختصر:</h4>
              {hadith.explanation}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-4">
            <button className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1 text-sm">
                <Bookmark size={18} />
                <span className="hidden sm:inline">حفظ</span>
            </button>
            <button className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1 text-sm">
                <Share2 size={18} />
                <span className="hidden sm:inline">مشاركة</span>
            </button>
        </div>
        
        <button 
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                copied ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90'
            }`}
        >
            <Copy size={16} />
            {copied ? 'تم النسخ' : 'نسخ الحديث'}
        </button>
      </div>
    </div>
  );
};

export default HadithCard;