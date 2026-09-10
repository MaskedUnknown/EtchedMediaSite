import React from 'react';
import { playSound } from '../services/audio'; // <-- Import the sound dictionary
import './DynamicButton.css';

export function DynamicButton({
    variant = 'primary',
    showBlobs = true,
    onClick,
    type = 'button',
    children,
    ...props
}) {

    const handleExtendedClick = (e) => {
        playSound.click(); // Automatically fire sound click clip cleanly behind the scenes
        if (onClick) onClick(e); // Continue routing native click events safely
    };

    return (
        <button
            type={type}
            className={`dynamic-btn btn-${variant}`}
            onClick={handleExtendedClick} /* Swapped to our integrated sound click click utility */
            {...props}
        >
            <span className="btn-label">{children}</span>

            {/* Dynamic Blob Effect Layer */}
            {showBlobs && (
                <div className="blob-container" aria-hidden="true">
                    <div className="ui-blob blob-1"></div>
                    <div className="ui-blob blob-2"></div>
                    <div className="ui-blob blob-3"></div>
                </div>
            )}
        </button>
    );
}
