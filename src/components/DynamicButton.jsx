import React from 'react';
import './DynamicButton.css';

/**
 * Modular Dynamic Button Service
 * @param {String} variant - 'primary', 'secondary', or 'danger' styling profiles
 * @param {Boolean} showBlobs - Toggles the organic canvas background animation
 * @param {ReactNode} children - Button text or inner elements
 */
export function DynamicButton({
    variant = 'primary',
    showBlobs = true,
    onClick,
    type = 'button',
    children,
    ...props
}) {
    return (
        <button
            type={type}
            className={`dynamic-btn btn-${variant}`}
            onClick={onClick}
            {...props}
        >
            {/* Dynamic Text Layer */}
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
