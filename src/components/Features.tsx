import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  RefreshCw,
  Eye,
  Layers,
  Settings,
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: '未检测 & 安全',
    desc: '我们的脚本使用先进的混淆和反检测技术,让你在游戏中安全无忧地畅玩.',
    color: 'from-green-500 to-emerald-600',
    glow: 'group-hover:shadow-green-500/20',
  },
  {
    icon: Zap,
    title: '即时执行',
    desc: '轻量优化设计。脚本在毫秒内加载,零延迟,不影响游戏性能.',
    color: 'from-yellow-500 to-orange-500',
    glow: 'group-hover:shadow-yellow-500/20',
  },
  {
    icon: RefreshCw,
    title: '自动更新',
    desc: '脚本会自动更新,无需手动操作.',
    color: 'from-blue-500 to-cyan-500',
    glow: 'group-hover:shadow-blue-500/20',
  },
  {
    icon: Eye,
    title: '透视 & 视觉增强',
    desc: '穿墙透视、高亮敌人、获取完整地图感知,使用我们的 ESP 模块.',
    color: 'from-purple-500 to-pink-500',
    glow: 'group-hover:shadow-purple-500/20',
  },
  {
    icon: Layers,
    title: '多游戏支持',
    desc: '一个中心,50+ 款游戏。从 Blox Fruits 到 Brookhaven —— 覆盖所有热门游戏.',
    color: 'from-indigo-500 to-violet-500',
    glow: 'group-hover:shadow-indigo-500/20',
  },
  {
    icon: Settings,
    title: '可自定义界面',
    desc: '完全可配置的游戏内 GUI。切换功能、调整设置,个性化你的体验.',
    color: 'from-rose-500 to-red-500',
    glow: 'group-hover:shadow-rose-500/20',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Features() {
  return (
    <section id="features" className="relative py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-3 block">
            为什么选择我们
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            强大的 <span className="text-gradient">功能</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            你在 Roblox 中所需的一切。由脚本开发者为脚本用户打造。
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className={`group relative p-7 rounded-2xl glow-card transition-all duration-500 hover:scale-[1.02] ${f.glow} hover:shadow-2xl cursor-default`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg`}
              >
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
