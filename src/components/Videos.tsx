import React, { useState, useRef, useEffect } from 'react';

const VIDEO_DATA = [
    {
    id: 'stream1',
    type: 'streamable',
    src: 'byvawj',
    title: '新鞋到货后的ks',
    desc: '实则展示狱卒',
    duration: "2:05",
    tags: ['KS'],
    },
];

function PlayIcon() {
  return (
    <svg className="w-10 h-10 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function Videos() {
  const [playing, setPlaying] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPlaying(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="videos" className="w-full bg-transparent py-12">
      <div className="max-w-3xl mx-auto text-center px-4 mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
             <span className="text-gradient">视频展示</span>
            </h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEO_DATA.map((v) => {
            const thumb = v.thumbnail
            ? v.thumbnail
            : v.type === 'youtube'
            ? `https://img.youtube.com/vi/${v.src}/hqdefault.jpg`
            : v.type === 'streamable'
            ? `https://cdn.streamable.com/image/${v.src}.jpg`
            : '/assets/video-placeholder.png';
          return (
            <div
              key={v.id}
              className="relative rounded-2xl glow-card overflow-hidden bg-[#0a0a1a] border border-white/5 shadow-lg hover:scale-[1.02] transition-transform duration-200"
            >
              <button
                onClick={() => setPlaying(v.id)}
                className="relative group w-full block"
                aria-label={`播放 ${v.title}`}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={thumb}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-48 sm:h-52 md:h-56 object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 right-3 bg-black/30 text-xs text-white px-2 py-1 rounded-full backdrop-blur-sm">{v.duration ?? '—'}</div>

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-3 transform group-hover:scale-105 transition-transform shadow-lg">
                      <PlayIcon />
                    </div>
                  </div>
                </div>
              </button>
              <div className="p-4 md:p-5">
                <h3 className="text-sm md:text-base font-semibold text-white">{v.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{v.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {v.tags.map((t) => (
                    <span key={t} className="text-[11px] inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/6 text-slate-200">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {playing && (() => {
        const v = VIDEO_DATA.find((x) => x.id === playing);
        if (!v) return null;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65">
            <div className="w-full max-w-4xl mx-4 md:mx-0">
              <div className="relative rounded-2xl overflow-hidden bg-[#071023] border border-white/6 shadow-2xl">
                <button
                  onClick={() => setPlaying(null)}
                  className="absolute top-4 right-4 z-50 bg-gradient-to-br from-indigo-600 to-purple-600 hover:opacity-95 text-white rounded-full p-2 shadow-2xl transform hover:scale-105 transition-all"
                  aria-label="关闭视频"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div className="w-full h-[56vw] md:h-[55vh] lg:h-[60vh] bg-black">
                  {v.type === 'youtube' && (
                    <iframe
                      src={`https://www.youtube.com/embed/${v.src}?autoplay=1&rel=0`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  )}
                    {v.type === 'streamable' && (
                    <iframe
                        src={`https://streamable.com/e/${v.src}`}
                        title={v.title}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                    )}
                  {v.type === 'vimeo' && (
                    <iframe
                      src={`https://player.vimeo.com/video/${v.src}?autoplay=1`}
                      title={v.title}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  )}

                  {v.type === 'file' && (
                    <video className="w-full h-full" controls autoPlay>
                      <source src={v.src} />
                      你的浏览器不支持 video 标签。
                    </video>
                  )}

                  {v.type === 'embed' && (
                    <iframe
                      src={v.src}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
