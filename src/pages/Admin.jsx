import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Check, X } from 'lucide-react';

const Admin = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    const { data } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });
    setVideos(data || []);
  };

  const updateStatus = async (id, status) => {
    if(!confirm(`Mark as ${status}?`)) return;
    await supabase.from('videos').update({ status }).eq('id', id);
    fetchPending();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Moderation Dashboard</h1>
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Video</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map(video => (
              <tr key={video.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4">
                  <a href={`/watch/${video.id}`} target="_blank" className="font-medium text-indigo-600 hover:underline">
                    {video.title}
                  </a>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                    video.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    video.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {video.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => updateStatus(video.id, 'approved')} className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200"><Check size={18}/></button>
                  <button onClick={() => updateStatus(video.id, 'rejected')} className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"><X size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;