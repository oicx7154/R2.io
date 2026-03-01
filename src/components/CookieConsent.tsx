import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    setPreferences({ necessary: true, analytics: true, functional: true });
    localStorage.setItem('cookie-consent', JSON.stringify({ necessary: true, analytics: true, functional: true, timestamp: Date.now() }));
    setVisible(false);
  };

  const rejectAll = () => {
    setPreferences({ necessary: true, analytics: false, functional: false });
    localStorage.setItem('cookie-consent', JSON.stringify({ necessary: true, analytics: false, functional: false, timestamp: Date.now() }));
    setVisible(false);
  };

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ ...preferences, timestamp: Date.now() }));
    setVisible(false);
  };

  const togglePreference = (key: 'analytics' | 'functional') => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
            <div className="p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xl">🍪</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg mb-1.5">Cookie 使用提示</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    我们使用 Cookie 来提升您的浏览体验、分析网站流量并展示个性化内容。点击「全部接受」即表示您同意我们使用所有 Cookie。您也可以自定义偏好设置。
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 space-y-3">
                      <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/5">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium text-sm">必要 Cookie</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                              必需
                            </span>
                          </div>
                          <p className="text-slate-500 text-xs mt-1">网站正常运行所必需的 Cookie，无法关闭。</p>
                        </div>
                        <div className="w-11 h-6 rounded-full bg-green-500/30 border border-green-500/40 flex items-center px-0.5 cursor-not-allowed">
                          <div className="w-5 h-5 rounded-full bg-green-400 translate-x-5" />
                        </div>
                      </div>

                      <div
                        onClick={() => togglePreference('analytics')}
                        className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 cursor-pointer transition-colors"
                      >
                        <div>
                          <span className="text-white font-medium text-sm">分析 Cookie</span>
                          <p className="text-slate-500 text-xs mt-1">帮助我们了解网站的使用情况，以改善用户体验。</p>
                        </div>
                        <div className={`w-11 h-6 rounded-full border flex items-center px-0.5 transition-all duration-300 ${
                          preferences.analytics
                            ? 'bg-indigo-500/30 border-indigo-500/40'
                            : 'bg-slate-700/50 border-slate-600/50'
                        }`}>
                          <div className={`w-5 h-5 rounded-full transition-all duration-300 ${
                            preferences.analytics
                              ? 'bg-indigo-400 translate-x-5'
                              : 'bg-slate-400 translate-x-0'
                          }`} />
                        </div>
                      </div>

                      <div
                        onClick={() => togglePreference('functional')}
                        className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 cursor-pointer transition-colors"
                      >
                        <div>
                          <span className="text-white font-medium text-sm">功能 Cookie</span>
                          <p className="text-slate-500 text-xs mt-1">提供增强功能和个性化设置，如记住您的偏好。</p>
                        </div>
                        <div className={`w-11 h-6 rounded-full border flex items-center px-0.5 transition-all duration-300 ${
                          preferences.functional
                            ? 'bg-indigo-500/30 border-indigo-500/40'
                            : 'bg-slate-700/50 border-slate-600/50'
                        }`}>
                          <div className={`w-5 h-5 rounded-full transition-all duration-300 ${
                            preferences.functional
                              ? 'bg-indigo-400 translate-x-5'
                              : 'bg-slate-400 translate-x-0'
                          }`} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-5">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all"
                >
                  {showSettings ? '隐藏设置' : '⚙️ Cookie 设置'}
                </button>

                <div className="flex-1" />

                {showSettings ? (
                  <button
                    onClick={savePreferences}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all"
                  >
                    保存偏好
                  </button>
                ) : (
                  <button
                    onClick={rejectAll}
                    className="px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                  >
                    仅必要
                  </button>
                )}

                <button
                  onClick={acceptAll}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl transition-all shadow-lg shadow-indigo-500/25"
                >
                  全部接受
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
