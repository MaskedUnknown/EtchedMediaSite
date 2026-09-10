import React from 'react';
import { DynamicButton } from './DynamicButton';
import './AudioAlbumView.css';

export function AudioAlbumView({ album, onBack }) {
    // Safe dynamic description context mock helper. 
    // In production, you can drop a local descriptive .txt or JSON inside the folder to map descriptions dynamically!
    const getMockAlbumDescription = () => {
        if (album.category === 'music') {
            return `Official music release catalog compiling full orchestration. Mastered directly at Etched Media workflows. Listen or view purchase details on external services via the link dashboard below.`;
        }
        return `Production audio assets repository including uncompressed spatial mixing matrices. Optimized for immediate game engine implementation.`;
    };

    // Mock safety checkout routing path target
    const targetBandlabUrl = "https://bandlab.com";

    return (
        <div className="audio-album-hub-view">

            {/* Top Controls Row */}
            <div className="album-hub-nav">
                <button className="hub-back-btn" onClick={onBack}>← Back to Audio Rack</button>
                <span className="hub-category-tag">{album.category.toUpperCase()} // REGISTRY DIRECTORY</span>
            </div>

            <div className="album-split-body">

                {/* LEFT COLUMN: FIXED SLEEVE FRAME */}
                <div className="album-artwork-column">
                    <div className="artwork-sleeve-frame">
                        <img src={album.cover || '/favicon.ico'} className="artwork-main-img" alt="" />
                    </div>

                    {/* EXTERNAL BRAND PLATFORM LINK REGISTRY */}
                    <div className="album-external-link-card">
                        <h5>Production Distribution Marketplace</h5>
                        <p>Support this production release package directly on external hosting systems:</p>
                        <a
                            href={targetBandlabUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="album-bandlab-link-btn"
                        >
                            🌐 Visit External Release Page →
                        </a>
                    </div>
                </div>

                {/* RIGHT COLUMN: REVENUE DESCRIPTION & AUDIO RACK TRACKLIST */}
                <div className="album-tracks-column">
                    <div className="album-meta-header">
                        <h2 className="album-main-title">{album.title}</h2>
                        <span className="album-folder-badge">Folder Identifier: assets/{album.category}/{album.albumFolderName}/</span>
                    </div>

                    <p className="album-paragraph-desc">{getMockAlbumDescription()}</p>

                    {/* DYNAMIC SOUND MIXER RACK LIST */}
                    <div className="audio-tracklist-rack custom-scrollbar">
                        <h3>Archived Track Manifest ({album.tracks.length})</h3>

                        {album.tracks.map((track, i) => (
                            <div key={track.fileName} className="tracklist-row-item">
                                <div className="track-row-left">
                                    <span className="track-index-num">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="track-row-title" title={track.fileName}>{track.title}</span>
                                </div>

                                {/* Embedded HTML5 Console Player Frame */}
                                <audio controls className="track-row-player-widget" preload="none">
                                    <source src={track.url} type="audio/mpeg" />
                                </audio>
                            </div>
                        ))}

                        {album.tracks.length === 0 && (
                            <p className="empty-track-notice">No uncompressed .MP3 or .WAV assets discovered within this subdirectory container partition yet.</p>
                        )}
                    </div>
                </div>

            </div>

        </div>
    );
}
