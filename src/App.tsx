import React, { useState, useEffect, useRef } from 'react';

type ThemeMode = 'black' | 'white';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('black');
  const [inputValue, setInputValue] = useState('');
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically on mount and whenever clicking anywhere on the page
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleGlobalClick = () => {
    inputRef.current?.focus();
  };

  // Toggle theme between full black and full white with smooth transition
  const toggleTheme = (target?: ThemeMode) => {
    setTheme(prev => target ?? (prev === 'black' ? 'white' : 'black'));
  };

  // Keyboard shortcut: Ctrl+T or Cmd+T to toggle theme
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 't' || e.key === 'T' || e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Command submission handler - Ready for future command editing
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim();
    if (!command) return;

    // ========================================================
    // 指令編輯區 (未來可在此直接加入或修改您的自訂指令邏輯)
    // ========================================================
    const lower = command.toLowerCase();
    const args = lower.split(/\s+/);
    const cmd = args[0];

    if (cmd === 'toggle' || cmd === 'invert' || cmd === 'theme') {
      toggleTheme();
    } else if (cmd === 'black' || cmd === 'dark') {
      toggleTheme('black');
    } else if (cmd === 'white' || cmd === 'light') {
      toggleTheme('white');
    }

    // 直接清空輸入欄，不保留任何歷史記錄或輸出記錄
    setInputValue('');
  };

  const isDark = theme === 'black';

  return (
    <div
      onClick={handleGlobalClick}
      className={`min-h-screen w-full flex flex-col items-center justify-start pt-[25vh] px-4 font-mono select-none theme-transition cursor-text ${
        isDark ? 'theme-dark bg-black text-white' : 'theme-light bg-white text-black'
      }`}
    >
      {/* Top-Right Theme Switch Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleTheme();
        }}
        className={`fixed top-6 right-6 px-3 py-1 text-xs sm:text-sm border-2 cursor-pointer font-bold tracking-wider uppercase transition-transform active:translate-y-0.5 ${
          isDark
            ? 'border-white hover:bg-white hover:text-black bg-black text-white'
            : 'border-black hover:bg-black hover:text-white bg-white text-black'
        }`}
        title="切換黑白模式 (快捷鍵: Ctrl+T)"
      >
        {isDark ? '[ SWITCH TO WHITE ]' : '[ SWITCH TO BLACK ]'}
      </button>

      {/* Main Container - Centered and positioned slightly above middle */}
      <div className="w-full max-w-xl flex flex-col items-center">
        {/* Command Input Form */}
        <form onSubmit={handleSubmit} className="w-full relative" onClick={(e) => e.stopPropagation()}>
          <div className="relative flex items-center w-full">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
              spellCheck={false}
              className={`w-full text-lg sm:text-2xl py-3 px-4 bg-transparent border-2 outline-none font-mono tracking-wide theme-transition ${
                isDark
                  ? 'border-white text-white placeholder-white/30 focus:border-white'
                  : 'border-black text-black placeholder-black/30 focus:border-black'
              }`}
              placeholder="輸入指令..."
            />
            {/* Retro blinking pixel block cursor */}
            <div
              className={`absolute right-4 w-3 h-5 pixel-cursor pointer-events-none ${
                isDark ? 'bg-white' : 'bg-black'
              }`}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
