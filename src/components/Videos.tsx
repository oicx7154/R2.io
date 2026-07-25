import React from 'react';

export default function Videos() {
  return (
    <section id="videos" className="max-w-7xl mx-auto px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold mb-4">视频展示</h2>
        <p className="text-slate-400 mb-8">观看我们的一些演示与教程视频。</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        <div className="bg-[#0b0b13] rounded-lg overflow-hidden shadow-md">
          <div className="aspect-w-16 aspect-h-9 bg-black">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="示例视频1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold">示例视频 1</h3>
            <p className="text-slate-400 text-sm">一个用于展示的视频占位示例。</p>
          </div>
        </div>

        <div className="bg-[#0b0b13] rounded-lg overflow-hidden shadow-md">
          <div className="aspect-w-16 aspect-h-9 bg-black">
            <iframe
              src="https://www.youtube.com/embed/9bZkp7q19f0"
              title="示例视频2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold">示例视频 2</h3>
            <p className="text-slate-400 text-sm">另一个视频占位，替换为实际视频链接。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
