import { useState, useEffect } from 'react';

const AdPlayer = ({ onSkip }) => {
  const [timeLeft, setTimeLeft] = useState(5); // 5 seconds mandatory wait
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanSkip(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center text-white">
      {/* --- ADSENSE CONTAINER --- */}
      {/* Paste your specific Google AdSense Display Unit Code here when approved */}
      <div className="w-[300px] h-[250px] bg-gray-800 flex flex-col items-center justify-center mb-6 border border-gray-600 text-center p-4">
        <p className="font-bold text-lg mb-2">Advertisement</p>
        <p className="text-xs text-gray-400">Loading AdSense...</p>
      </div>
      {/* ------------------------- */}

      <div className="flex flex-col items-center gap-3">
        {canSkip ? (
          <button 
            onClick={onSkip}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold transition-all shadow-lg flex items-center gap-2"
          >
            Skip Ad & Play Video
          </button>
        ) : (
          <button 
            disabled 
            className="px-8 py-3 bg-gray-700 text-gray-400 rounded-full font-bold cursor-not-allowed border border-gray-600"
          >
            Skip in {timeLeft}s
          </button>
        )}
      </div>
    </div>
  );
};

export default AdPlayer;