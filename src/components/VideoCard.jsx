import { Link } from 'react-router-dom';
import { Play, Eye } from 'lucide-react';

const VideoCard = ({ video }) => {
  return (
    <Link to={`/watch/${video.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 h-full flex flex-col">
        {/* Thumbnail Area - Uses video tag for preview, or you can add an image column to DB later */}
        <div className="aspect-video bg-black relative flex items-center justify-center overflow-hidden">
           <video src={video.video_url} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300" muted />
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
               <Play fill="white" className="text-white" size={24} />
             </div>
           </div>
        </div>
        
        <div className="p-4 flex-grow">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 leading-tight">
            {video.title}
          </h3>
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
            <Eye size={16} />
            <span>{video.views} views</span>
            <span className="mx-1">•</span>
            <span>{new Date(video.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;