import React from 'react';
import { useDrag } from '../hooks/useDrag';
import './WindowContainer.css'; // We'll add this specific visual layout next

/**
 * Modular desktop window frame
 * @param {String} title - Heading displayed on the action bar
 * @param {Boolean} isActive - Controls active theme focus depth
 * @param {Function} onClose - Optional function to terminate / close window
 * @param {ReactNode} children - Inner content module injected into the box
 */
export function WindowContainer({
    title,
    isActive = false,
    defaultPosition,
    width = '450px',   // <-- Add default width fallback
    height = '350px',  // <-- Add default height fallback
    onClose,
    children
}) {
    const { position, handleMouseDown } = useDrag(defaultPosition || { x: 100, y: 100 });

    return (
        <div
            className={`window-frame ${isActive ? 'window-active' : ''}`}
            style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                width: width,   // <-- Bind the prop dynamically
                height: height, // <-- Bind the prop dynamically
                zIndex: isActive ? 'var(--layer-window-active)' : 'var(--layer-window-idle)'
            }}
        >
            {/* Interactive Drag Handle Header */}
            <div className="window-titlebar" onMouseDown={handleMouseDown}>
                <span className="window-title-text">{title}</span>

                <div className="window-controls">
                    {onClose && (
                        <button className="window-btn btn-close" onClick={onClose} title="Close">
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Main Inner Content Field */}
            <div className="window-content custom-scrollbar">
                {children}
            </div>
        </div>
    );
}
