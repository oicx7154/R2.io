import React from 'react';

export default function Videos() {
  return (
    <section id="videos" className="w-full bg-transparent py-24">
      <div className="max-w-4xl mx-auto text-center px-6 mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">视频展示</h2>
        <p className="text-slate-400 text-lg md:text-xl">观看我们的一些演示与教程视频。</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="col-span-1 bg-[#0b0b13] rounded-xl overflow-hidden shadow-xl">
          <div className="w-full h-64 md:h-80 lg:h-96 bg-black">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="示例视频1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg md:text-xl font-semibold">示例视频 1</h3>
            <p className="text-slate-400 text-sm md:text-base mt-1">一个用于展示的视频占位示例。可替换为实际教程或演示视频。</p>
          </div>
        </div>

        <div className="col-span-1 bg-[#0b0b13] rounded-xl overflow-hidden shadow-xl">
          <div className="w-full h-64 md:h-80 lg:h-96 bg-black">
            <iframe
              src="https://www.youtube.com/embed/9bZkp7q19f0"
              title="示例视频2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg md:text-xl font-semibold">示例视频 2</h3>
            <p className="text-slate-400 text-sm md:text-base mt-1">另一个视频占位，替换为实际视频链接或自托管播放器。</p>
          </div>
        </div>

        <div className="col-span-1 bg-[#0b0b13] rounded-xl overflow-hidden shadow-xl">
          <div className="w-full h-64 md:h-80 lg:h-96 bg-black flex items-center justify-center text-slate-500">
            <div className="text-center px-6">
              <p className="mb-4">你可以在这里添加更多视频或使用动态数据源展示视频列表。</p>
              <a href="#" className="inline-block px-4 py-2 bg-indigo-500 text-white rounded-lg">添加视频</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
