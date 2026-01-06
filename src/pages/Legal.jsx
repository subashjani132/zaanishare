import { useState } from 'react';

const Legal = () => {
  const [tab, setTab] = useState('privacy');
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Legal Center</h1>
      <div className="flex gap-4 border-b mb-8">
        {['privacy', 'terms'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`pb-4 px-4 capitalize ${tab === t ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}>{t}</button>
        ))}
      </div>
      <div className="prose text-gray-600">
        {tab === 'privacy' && (
          <>
            <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
            <p>We collect email addresses for authentication and track video views to distribute payments/analytics.</p>
          </>
        )}
        {tab === 'terms' && (
          <>
            <h2 className="text-xl font-bold mb-4">Terms of Service</h2>
            <p>You may not upload copyrighted, illegal, or violent content. We reserve the right to ban users.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Legal;