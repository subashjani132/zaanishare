import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ReactPlayer from 'react-player';
import AdPlayer from '../components/AdPlayer';
import { Share2, Eye, Calendar } from 'lucide-react';

const Watch = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [showAd, setShowAd] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideo();
    // Safely increment view count
    supabase.rpc('increment_views', { row_id: id }).then();
  }, [id]);

  const fetchVideo = async () => {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .single();
    
    if (data) setVideo(data);
    setLoading(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: video.title,
      text: `Watch ${video.title} on ZaaniShare`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) return <div className="text-center mt-20">Loading Player...</div>;
  if (!video) return <div className="text-center mt-20">Video not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-black rounded-xl overflow-hidden shadow-2xl relative aspect-video">
        {showAd ? (
          <AdPlayer onSkip={() => setShowAd(false)} />
        ) : (
          <ReactPlayer 
            url={video.video_url}
            width="100%"
            height="100%"
            controls={true}
            playing={true}
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
          />
        )}
      </div>

      <div className="mt-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 pb-4 border-b border-gray-100 gap-4">
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <Eye size={18} /> {video.views} views
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={18} /> {new Date(video.created_at).toLocaleDateString()}
            </div>
          </div>
          
          <button onClick={handleShare} className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 font-medium transition-colors">
             <Share2 size={18} /> Share
          </button>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
            {video.description || "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Watch;