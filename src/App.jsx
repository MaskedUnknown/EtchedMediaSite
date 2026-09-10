import React, { useState } from 'react';
import { WindowContainer } from './components/WindowContainer';
import { DynamicButton } from './components/DynamicButton';
import { executeCheckout } from './services/stripe';
import { PortfolioGrid } from './components/PortfolioGrid';
import { setSoundSystemState, playSound } from './services/audio'; // <-- 🎯 ADD THIS IMPORT
import './App.css';
import imagelink from './assets/240.png'

function App() {
    const [currentTheme, setCurrentTheme] = useState('dark');
    const [isShopOpen, setIsShopOpen] = useState(true);
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(true);
    const [activeWindow, setActiveWindow] = useState('portfolio');
    const [rootLightboxMedia, setRootLightboxMedia] = useState(null);

    // Track the HUD audio setting state toggle
    const [audioMuted, setAudioMuted] = useState(false);

    const toggleTheme = () => {
        playSound.click(); // Trigger click audio
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
    };

    const toggleAudioEngine = () => {
        const nextMuteState = !audioMuted;
        setAudioMuted(nextMuteState);
        setSoundSystemState(!nextMuteState); // Updates our safe audio engine controller variable

        // If they just unmuted, click to give acoustic confirmation feedback
        if (!nextMuteState) {
            setTimeout(() => playSound.click(), 50);
        }
    };

    return (
        <div className="desktop-environment">
            {/* ... keeping background image wallpaper setup identical ... */}

            {/* DESKTOP HEADER ROW INTERACTIVE CONTROLS */}
            <div className="desktop-header-controls">
                <img src={imagelink} width={50} height={50} alt="Logo" />
                <h1 className="desktop-brand-title">Etched Media</h1>

                <div style={{ display: 'flex', gap: '12px' }}>
                    {/* ── 🔊 HUD AUDIO SWITCH TOGGLE BUTTON ── */}
                    <button className="desktop-theme-toggle" onClick={toggleAudioEngine}>
                        {audioMuted ? '🔈 Audio Off' : '🔊 Audio On'}
                    </button>

                    <button className="desktop-theme-toggle" onClick={toggleTheme}>
                        Switch to {currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </button>
                </div>
            </div>

            {/* Module 1: Storefront / Profile */}
            {isShopOpen && (
                <WindowContainer
                    title="👤 About & Systems Profile"
                    isActive={activeWindow === 'shop'}
                    defaultPosition={{ x: 540, y: 120 }}
                    onClose={() => {
                        playSound.close(); // Trigger Close FX
                        setIsShopOpen(false);
                    }}
                >
                    {/* ... About details code ... */}
                </WindowContainer>
            )}

            {/* Module 2: Creative Portfolio */}
            {isPortfolioOpen && (
                <WindowContainer
                    title="📂 Creative Production Portfolio"
                    isActive={activeWindow === 'portfolio'}
                    defaultPosition={{ x: 60, y: 120 }}
                    width="980px"
                    height="480px"
                    onClose={() => {
                        playSound.close(); // Trigger Close FX
                        setIsPortfolioOpen(false);
                    }}
                >
                    <div onMouseDown={() => setActiveWindow('portfolio')} style={{ height: '100%' }}>
                        <PortfolioGrid onTriggerLightbox={setRootLightboxMedia} />
                    </div>
                </WindowContainer>
            )}

            {/* RECOVERY TASKBAR */}
            <div className="desktop-taskbar">
                {!isShopOpen && (
                    <button onClick={() => {
                        playSound.open(); // Trigger Open FX
                        setIsShopOpen(true);
                    }}>Open Profile</button>
                )}
                {!isPortfolioOpen && (
                    <button onClick={() => {
                        playSound.open(); // Trigger Open FX
                        setIsPortfolioOpen(true);
                    }}>Open Portfolio</button>
                )}
            </div>

            {/* ==========================================================================
               🖥️ INTERACTIVE ADDITION 3: TRUE EXTERNAL FULLSCREEN LIGHTBOX PORTAL 
               ========================================================================== */}
            {rootLightboxMedia && (
                <div
                    className="global-lightbox-overlay"
                    onClick={() => setRootLightboxMedia(null)} // Close when clicking backdrop
                >
                    <div className="lightbox-content-capsule" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close-trigger" onClick={() => setRootLightboxMedia(null)}>✕</button>

                        {/* Intelligent Extension Router */}
                        {['mp4', 'mov'].includes(rootLightboxMedia.fileName.split('.').pop().toLowerCase()) ? (
                            <video controls autoPlay loop className="lightbox-expanded-media" src={rootLightboxMedia.url} />
                        ) : (
                            <img src={rootLightboxMedia.url} className="lightbox-expanded-media" alt="" />
                        )}

                        <div className="lightbox-meta-title">{rootLightboxMedia.title}</div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default App;
