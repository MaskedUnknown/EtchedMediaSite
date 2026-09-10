import React, { useState } from 'react';
import { WindowContainer } from './components/WindowContainer';
import { DynamicButton } from './components/DynamicButton';
import { executeCheckout } from './services/stripe';
import { PortfolioGrid } from './components/PortfolioGrid';
import './App.css';
import imagelink from './assets/240.png'

function App() {
    // ── 🎯 FIXED: Change 'light' to 'dark' so React matches your boot variables ──
    const [currentTheme, setCurrentTheme] = useState('dark');

    // Keep all other visibility hooks and functions exactly the same
    const [isShopOpen, setIsShopOpen] = useState(true);
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(true);
    const [activeWindow, setActiveWindow] = useState('portfolio');
    const [rootLightboxMedia, setRootLightboxMedia] = useState(null);

    const toggleTheme = () => {
        // Automatically checks if dark, then flips to light instantly on first click!
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
    };

    return (
        <div className="desktop-environment">

            {/* DESKTOP INTERFACE WALLPAPER CORE */}
            <div className="desktop-header-controls">
                <img src={imagelink} width={50} height={50} alt="Logo" />
                <h1 className="desktop-brand-title">Etched Media</h1>

                <button className="desktop-theme-toggle" onClick={toggleTheme}>
                    Switch to {currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
            </div>

            {/* Module 1: The About & Communications Terminal */}
            {isShopOpen && (
                <WindowContainer
                    title="👤 About & Systems Profile"
                    isActive={activeWindow === 'shop'}
                    defaultPosition={{ x: 540, y: 120 }}
                    onClose={() => setIsShopOpen(false)}
                >
                    <div onMouseDown={() => setActiveWindow('shop')} className="about-terminal-layout">
                        <div className="about-profile-hero">
                            <h3>Etched Media Production</h3>
                            <span className="profile-subtitle-tag">Creative Studio & Media Systems</span>
                        </div>

                        <p className="about-bio-text">
                            Welcome to the digital workspace. Etched Media specializes in interactive engineering, uncompressed soundscape architecture, layout illustrations, and cinematic visual production. Every asset cataloged here is built natively with industry-grade software pipelines.
                        </p>

                        {/* Direct Communications Matrix Row */}
                        <div className="about-contact-matrix">
                            <h4>🎛️ Terminal Registry / Contact</h4>
                            <div className="contact-row">
                                <strong>Direct Email:</strong>
                                <a href="mailto:contact@etchedmedia.com">contact@etchedmedia.com</a>
                            </div>
                            <div className="contact-row">
                                <strong>Business Line:</strong>
                                <span>+1 (555) 019-2834</span>
                            </div>
                            <div className="contact-row">
                                <strong>Operational Status:</strong>
                                <span className="status-indicator-active">Online // Accepting Commissions</span>
                            </div>
                        </div>

                        {/* System Specifications Info Field */}
                        <div className="about-site-specs">
                            <h5>Workstation Manifest Info</h5>
                            <p>This single-page operating environment is compiled using <strong>Vite + React SPA architecture</strong>, utilizing dynamic asynchronous directory maps, custom skeuomorphic physics loops, and fully decoupled payment link modules.</p>
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
                    onClose={() => setIsPortfolioOpen(false)}
                >
                    <div onMouseDown={() => setActiveWindow('portfolio')} style={{ height: '100%' }}>
                        {/* 🎯 PROP ADDITION 2: Linking your clicked assets out to the root state window layer */}
                        <PortfolioGrid onTriggerLightbox={setRootLightboxMedia} />
                    </div>
                </WindowContainer>
            )}

            {/* ==========================================
   🎛️ RECOVERY BAR (If windows are closed)
   ========================================== */}
            <div className="desktop-taskbar">
                {!isShopOpen && <button onClick={() => setIsShopOpen(true)}>Open Profile</button>}
                {!isPortfolioOpen && <button onClick={() => setIsPortfolioOpen(true)}>Open Portfolio</button>}
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
