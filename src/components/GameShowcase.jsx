import React, { useState } from 'react';
import { DynamicButton } from './DynamicButton';
import './GameShowcase.css';

export function GameShowcase({ game, onBack }) {
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setCoords({ x: x * 20, y: y * 20 });
    };

    const handleMouseLeave = () => {
        setCoords({ x: 0, y: 0 });
    };

    return (
        <div className="game-cinematic-hub">
            {/* Top Header Navigation bar */}
            <div className="hub-navigation">
                <button className="hub-back-btn" onClick={onBack}>← Return to Library</button>
                <span className="hub-category-tag">Terminal System Capsule // {game.title}</span>
            </div>

            <div className="hub-split-layout">

                {/* LEFT COLUMN: UNIFIED HERO VIEWPORT */}
                <div className="hub-media-column">
                    <div
                        className="parallax-mask-viewport"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* The live background video trailer playing behind your edge mask */}
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="parallax-background-video"
                            src={game.url}
                            style={{
                                transform: `translate3d(${coords.x}px, ${coords.y}px, 0) scale(1.1)`
                            }}
                        />
                        {/* Fixed foreground overlay alpha mask vector */}
                        <div className="parallax-foreground-mask" />
                    </div>
                    <div className="preview-subtext-label">Product Gameplay Preview</div>
                </div>

                {/* RIGHT COLUMN: RECONFIGURED SPECS & STEAM GATEWAY */}
                <div className="hub-details-column">
                    <div>
                        <h2 className="hub-game-title">{game.title}</h2>
                        <div className="hub-status-badge">Available on External Platform</div>
                    </div>

                    {/* New target layout specifications checklist */}
                    <div className="hub-specs-matrix">
                        <div className="spec-row"><strong>System Compatibility:</strong> <span>Windows 10 / 11 (64-bit)</span></div>
                        <div className="spec-row"><strong>Age Rating:</strong> <span>Pending / Creative Freedom</span></div>
                        <div className="spec-row"><strong>Other Requirements:</strong> <span>DirectX 12 Interface Support</span></div>
                    </div>

                    <p className="hub-game-desc">
                        Experience the complete digital release package. Includes unrestricted access to full asset structures, deployment archives, and production manifest trees.
                    </p>

                    {/* Steam routing checkout panel box */}
                    <div className="hub-purchase-widget">
                        <div className="widget-pricing-row">
                            <span className="pricing-label">Digital License Marketplace</span>
                        </div>
                        {/* Redirect button text updated with an empty click execution payload */}
                        <DynamicButton
                            variant="primary"
                            showBlobs={true}
                            onClick={() => console.log('Steam store routing initialized... (Empty Link Context)')}
                        >
                            Redirect to Steam Purchase Page
                        </DynamicButton>
                    </div>
                </div>

            </div>
        </div>
    );
}
