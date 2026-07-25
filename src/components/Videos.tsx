import React, { useState } from 'react';

const VIDEO_DATA = [
  {
    id: 'dQw4w9WgXcQ',
    type: 'youtube',
    src: 'dQw4w9WgXcQ',
    title: '示例视频 YouTube',
    desc: 'YouTube 视频示例。',
    tags: ['YouTube', '教程'],
  },
  {
    id: 'vimeo1',
    type: 'vimeo',
    src: '76979871',
    title: '示例视频 Vimeo',
    desc: 'Vimeo 视频示例。',
    // optional thumbnail can be provided; if absent a neutral placeholder is used
    thumbnail: 'https://i.vimeocdn.com/video/595198868_640.jpg',
    tags: ['Vimeo'],
  },
  {
    id: 'local1',
    type: 'file',
    src: '/videos/sample.mp4',
    title: '本地视频示例',
    desc: '示例本地视频，使用 <video> 播放器播放。',
    thumbnail: '/videos/sample-thumb.jpg',
    tags: ['本地'],
  },
  {
    id: 'embed1',
    type: 'embed',
    src: 'https://player.twitch.tv/?channel=monstercat&parent=example.com',
    title: '通用嵌入示例',
    desc: '示例通用嵌入（Twitch/其他）',
    tags: ['嵌入'],
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

  return (
    <section id="videos" className="w-full bg-transparent py-12">
      <div className="max-w-3xl mx-auto text-center px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-1">视频展示</h2>
        <p className="text-slate-400 text-sm md:text-base">观看我们的一些演示与教程视频。</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {VIDEO_DATA.map((v) => {
          const thumb = v.thumbnail
            ? v.thumbnail
            : v.type === 'youtube'
            ? `https://img.youtube.com/vi/${v.src}/hqdefault.jpg`
            : '/assets/video-placeholder.png';

          return (
            <div key={v.id} className="bg-[#0b0b13] rounded-lg overflow-hidden shadow-md">
              <button
                onClick={() => setPlaying(v.id)}
                className="relative group w-full block"
                aria-label={`播放 ${v.title}`}
              >
                <img src={thumb} alt={v.title} className="w-full h-44 sm:h-52 md:h-56 object-cover" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="rounded-full bg-indigo-500/85 p-2 transform group-hover:scale-105 transition-transform">
                    <PlayIcon />
                  </div>
                </div>
              </button>
              <div className="p-3">
                <h3 className="text-base font-semibold">{v.title}</h3>
                <p className="text-slate-400 text-xs mt-1">{v.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {v.tags.map((t) => (
                    <span key={t} className="text-xs bg-white/6 px-2 py-1 rounded-md text-slate-200">{t}</span>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-3xl mx-4 md:mx-0">
              <div className="relative bg-black rounded-md overflow-hidden">
                <button
                  onClick={() => setPlaying(null)}
                  className="absolute top-3 right-3 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
                  aria-label="关闭视频"
                >
                  ✕
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
