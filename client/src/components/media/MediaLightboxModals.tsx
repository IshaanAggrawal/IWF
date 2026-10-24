import { X } from "lucide-react";

interface LightboxModalProps {
  image: { title: string; category: string; image?: string; thumbnail?: string } | null;
  onClose: () => void;
}

export function LightboxModal({ image, onClose }: LightboxModalProps) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition cursor-pointer"
          aria-label="Close photo"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="max-h-[75vh] w-full flex items-center justify-center bg-black/50">
          <img
            src={image.image || image.thumbnail}
            alt={image.title}
            className="max-h-[75vh] w-auto object-contain mx-auto"
          />
        </div>
        <div className="p-4 bg-slate-900 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {image.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">{image.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export const ImageLightboxModal = LightboxModal;

interface VideoModalProps {
  video: { title: string; videoUrl: string; desc?: string } | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition cursor-pointer"
          aria-label="Close video"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={video.videoUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
        <div className="p-4 bg-slate-900 border-t border-white/10">
          <h3 className="text-lg font-bold text-white">{video.title}</h3>
          <p className="text-xs text-slate-300 mt-1">{video.desc}</p>
        </div>
      </div>
    </div>
  );
}
