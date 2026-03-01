import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const games = [
  {
    name: 'Sakura Stand',
    placeId: 8534845015,
    universeId: 2753915549,
    features: ['自动刷怪', '自动副本', '传送', '透视'],
    status: '已更新',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    name: 'Pet Simulator X',
    placeId: 8737899170,
    universeId: 3323262835,
    features: ['自动孵化', '宠物复制', '自动刷怪', '传送'],
    status: '已更新',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Brookhaven',
    placeId: 4924922222,
    universeId: 1805539058,
    features: ['管理员命令', '飞行', '加速', '穿墙'],
    status: '已更新',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Murder Mystery 2',
    placeId: 142823291,
    universeId: 66654135,
    features: ['透视', '角色揭示', '自瞄', '加速'],
    status: '已更新',
    gradient: 'from-red-500 to-rose-600',
  },
  {
    name: 'Arsenal',
    placeId: 286090429,
    universeId: 111958650,
    features: ['自瞄', '透视', '静默瞄准', '无后坐力'],
    status: '已更新',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'King Legacy',
    placeId: 4520749081,
    universeId: 1703355888,
    features: ['自动刷怪', '自动任务', '传送', '透视'],
    status: '已更新',
    gradient: 'from-yellow-500 to-amber-500',
  },
  {
    name: 'Tower of Hell',
    placeId: 1962086868,
    universeId: 703124385,
    features: ['秒过关', '飞行', '穿墙', '加速'],
    status: '已更新',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    name: 'Da Hood',
    placeId: 2788229376,
    universeId: 1006979830,
    features: ['自瞄', '静默瞄准', '透视', '飞行'],
    status: '已更新',
    gradient: 'from-slate-500 to-zinc-600',
  },
  {
    name: 'Anime Fighters',
    placeId: 7137099902,
    universeId: 2867452656,
    features: ['自动刷怪', '自动出售', '传送', '复制'],
    status: '已更新',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    name: 'Adopt Me',
    placeId: 920587237,
    universeId: 346700186,
    features: ['自动刷怪', '传送', '加速', '飞行'],
    status: '已更新',
    gradient: 'from-pink-400 to-fuchsia-500',
  },
  {
    name: 'Jailbreak',
    placeId: 606849621,
    universeId: 232192407,
    features: ['自动抢劫', '透视', '穿墙', '飞行'],
    status: '已更新',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Shindo Life',
    placeId: 4616652839,
    universeId: 1737660154,
    features: ['自动转盘', '自动刷怪', '传送', '透视'],
    status: '已更新',
    gradient: 'from-red-600 to-orange-500',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Games() {
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchThumbnails = async () => {
      const placeIds = games.map((g) => g.placeId).join(',');
      const apiUrl = `https://thumbnails.roblox.com/v1/places/gameicons?placeIds=${placeIds}&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false`;

      const proxyUrls = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`,
        `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(apiUrl)}`,
      ];

      for (const proxyUrl of proxyUrls) {
        try {
          const res = await fetch(proxyUrl);
          if (res.ok) {
            const data = await res.json();
            const map: Record<number, string> = {};
            const items = data.data || data;
            if (Array.isArray(items)) {
              items.forEach((entry: { targetId: number; state: string; imageUrl: string }) => {
                if (entry.state === 'Completed' && entry.imageUrl) {
                  map[entry.targetId] = entry.imageUrl;
                }
              });
            }
            if (Object.keys(map).length > 0) {
              setThumbnails(map);
              return;
            }
          }
        } catch {
          continue;
        }
      }

      try {
        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          const map: Record<number, string> = {};
          data.data?.forEach((entry: { targetId: number; state: string; imageUrl: string }) => {
            if (entry.state === 'Completed' && entry.imageUrl) {
              map[entry.targetId] = entry.imageUrl;
            }
          });
          if (Object.keys(map).length > 0) {
            setThumbnails(map);
          }
        }
      } catch {
      }
    };

    fetchThumbnails();
  }, []);

  const handleImageError = (placeId: number) => {
    setFailedImages((prev) => new Set(prev).add(placeId));
  };

  return (
    <section id="games" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-3 block">
            兼容性
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            支持的 <span className="text-gradient">游戏</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            我们支持所有主流 Roblox 游戏，并且每周都在添加新游戏。
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {games.map((g) => {
            const imageUrl = thumbnails[g.placeId];
            const imageFailed = failedImages.has(g.placeId);
            const showImage = imageUrl && !imageFailed;

            return (
              <motion.div
                key={g.name}
                variants={item}
                className="group relative rounded-2xl glow-card transition-all duration-500 hover:scale-[1.03] overflow-hidden flex flex-col"
              >
                <div className="relative w-full h-40 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${g.gradient} flex items-center justify-center`}
                  >
                    <span className="text-white/80 font-extrabold text-3xl tracking-wider drop-shadow-lg">
                      {g.name
                        .split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </span>
                  </div>

                  {showImage && (
                    <img
                      src={imageUrl}
                      alt={g.name}
                      onError={() => handleImageError(g.placeId)}
                      className="absolute inset-0 w-full h-full object-cover z-[1] transition-transform duration-700 group-hover:scale-110"
                    />
                  )}

                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b0f1a] to-transparent z-[2]" />
                  <div className="absolute top-3 right-3 z-[3]">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-sm">
                      {g.status}
                    </span>
                  </div>
                </div>

                <div className="p-5 pt-2 flex-1 flex flex-col">
                  <h3 className="font-bold text-white text-base mb-3 group-hover:text-indigo-400 transition-colors">
                    {g.name}
                  </h3>
                  <ul className="space-y-1.5 flex-1">
                    {g.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-slate-400">
                        <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r ${g.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
