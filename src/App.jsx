import React, { useState } from 'react';
import { WindowContainer } from './components/WindowContainer';
import { DynamicButton } from './components/DynamicButton';
import { PortfolioGrid } from './components/PortfolioGrid';
import { setSoundSystemState, playSound } from './services/audio'; // Integrated sound engine declarations
import './App.css';
import imagelink from './assets/240.png'

function App() {
    // ── 🎯 STATE ENGINE MATRIX ──
    const [currentTheme, setCurrentTheme] = useState('dark');
    const [isShopOpen, setIsShopOpen] = useState(true);
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(true);
    const [activeWindow, setActiveWindow] = useState('portfolio');
    const [rootLightboxMedia, setRootLightboxMedia] = useState(null);

    // Track the master HUD audio configuration state setting
    const [audioMuted, setAudioMuted] = useState(false);

    const toggleTheme = () => {
        playSound.click(); // Trigger acoustic feedback click
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

            {/* ==========================================================================
               🖥️ STEP 4: MASSIVE BACKGROUND WALLPAPER BANNER (Nested safely behind windows)
               ========================================================================== */}
            <div className="desktop-wallpaper-canvas" aria-hidden="true">
                <img src="/Background.png" className="wallpaper-brand-image" alt="" />
            </div>

            {/* ==========================================
               🖥️ DESKTOP INTERFACE WALLPAPER CORE
               ========================================== */}
            <div className="desktop-header-controls">
                {/* 🎯 IDENTIFIER: Added class name so we can apply invert rules to this small icon */}
                <img src={imagelink} className="desktop-header-logo" width={50} height={50} alt="Logo" />
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

            {/* Module 1: The About & Communications Terminal */}
            {isShopOpen && (
                <WindowContainer
                    title="👤 About & Systems Profile"
                    isActive={activeWindow === 'shop'}
                    defaultPosition={{ x: 540, y: 120 }}
                    width="540px"
                    height="680px"
                    onClose={() => {
                        playSound.close(); // Trigger Close audio sequence
                        setIsShopOpen(false); // Retain original baseline window visibility flag
                    }}
                >
                    <div onMouseDown={() => setActiveWindow('shop')} className="about-terminal-layout">
                        <div className="about-profile-hero">
                            <h3>Etched Media</h3>
                            <span className="profile-subtitle-tag">We make Entertainment & Digital Media.</span>
                        </div>

                        <p className="about-bio-text">
                            Welcome to the official Etched Media site! Etched Media does writing, develops video games, 2d digital illustrations & 3d modeling, 2d-3d animation, sound design & music production; With video games representing our densest product (encompassing multi media types). This site serves as a Portfolio, Calling card, and hub for all of our store page links.
                        </p>

                        {/* Direct Communications Matrix Row */}
                        <div className="about-contact-matrix">
                            <h4>🎛️ Terminal Registry / Contact</h4>
                            <div className="contact-row">
                                <strong>Site & business owner:</strong>
                                <span>Christian J. Dan</span>
                            </div>
                            <div className="contact-row">
                                <strong>Direct Email:</strong>
                                <a href="mailto:contact@etchedmedia.com">sketcedstudios@gmail.com</a>
                            </div>
                            <div className="contact-row">
                                <strong>Business Line:</strong>
                                <span>#+1 904-930-2151</span>
                            </div>
                            <div className="contact-row">
                                <strong>Operational Status:</strong>
                                <span className="status-indicator-active">Online // Accepting Commissions</span>
                            </div>
                        </div>

                        {/* System Specifications Info Field */}
                        <div className="about-site-specs">
                            <h5>Workstation Manifest Info</h5>
                            <p>This single-page operating environment is compiled using <strong>Vite + React</strong>, and developed by Etched Media.</p>
                        </div>
                    </div>
                </WindowContainer>
            )}


            {/* Module 2: Creative Portfolio Hub */}
            {isPortfolioOpen && (
                <WindowContainer
                    title="📂 Creative Production Portfolio"
                    isActive={activeWindow === 'portfolio'}
                    defaultPosition={{ x: 60, y: 120 }}
                    width="980px"
                    height="480px"
                    onClose={() => {
                        playSound.close(); // Trigger Close audio sequence
                        setIsPortfolioOpen(false); // Retain original baseline window visibility flag
                    }}
                >
                    <div onMouseDown={() => setActiveWindow('portfolio')} style={{ height: '100%' }}>
                        {/* 🎯 PROP_LINK: Linking your clicked assets out to the root state window layer */}
                        <PortfolioGrid onTriggerLightbox={setRootLightboxMedia} />
                    </div>
                </WindowContainer>
            )}

            {/* ==========================================
               🎛️ RECOVERY BAR (If windows are closed)
               ========================================== */}
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
               🖥️ TRUE EXTERNAL FULLSCREEN LIGHTBOX PORTAL (Escaped from all window panes!)
               ========================================================================== */}
            {rootLightboxMedia && (
                <div
                    className="global-lightbox-overlay"
                    onClick={() => setRootLightboxMedia(null)} // Click background to dismiss instantly
                >
                    <div className="lightbox-content-capsule" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close-trigger" onClick={() => setRootLightboxMedia(null)}>✕</button>

                        {/* Intelligent Extension Player Router Node */}
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
