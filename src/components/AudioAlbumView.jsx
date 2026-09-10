import React from 'react';
import './AudioAlbumView.css';

export function AudioAlbumView({ album, onBack }) {
    const getMockAlbumDescription = () => {
        if (album.category === 'music') {
            return `Official music release catalog compiling full orchestration. Mastered directly at Etched Media workflows. Listen or view purchase details on external services via the link dashboard below.`;
        }
        return `Production audio assets repository including uncompressed spatial mixing matrices. Optimized for immediate game engine implementation.`;
    };

    return (
        <div className="audio-album-hub-view">

            <div className="album-hub-nav">
                <button className="hub-back-btn" onClick={onBack}>← Back to Audio Rack</button>
                <span className="hub-category-tag">{album.category.toUpperCase()} // REGISTRY DIRECTORY</span>
            </div>

            <div className="album-split-body">

                <div className="album-artwork-column">
                    <div className="artwork-sleeve-frame">
                        <img src={album.cover || '/favicon.ico'} className="artwork-main-img" alt="" />
                    </div>

                    <div className="album-external-link-card">
                        <h5>Production Distribution Marketplace</h5>
                        <p>Support this production release package directly on external hosting systems:</p>
                        {/* 🎯 FIXED: Consuming your individual custom URL location properties smoothly */}
                        <a
                            href={album.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="album-bandlab-link-btn"
                        >
                            🌐 Visit External Release Page →
                        </a>
                    </div>
                </div>

                <div className="album-tracks-column">
                    <div className="album-meta-header">
                        <h2 className="album-main-title">{album.title}</h2>
                        <span className="album-folder-badge">Folder Identifier: assets/{album.category}/{album.albumFolderName}/</span>
                    </div>

                    <p className="album-paragraph-desc">{getMockAlbumDescription()}</p>

                    <div className="audio-tracklist-rack custom-scrollbar">
                        <h3>Archived Track Manifest ({album.tracks.length})</h3>

                        {album.tracks.map((track, i) => (
                            <div key={track.fileName} className="tracklist-row-item">
                                <div className="track-row-left">
                                    <span className="track-index-num">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="track-row-title" title={track.fileName}>{track.title}</span>
                                </div>

                                <audio controls className="track-row-player-widget" preload="none">
                                    <source src={track.url} type="audio/mpeg" />
                                </audio>
                            </div>
                        ))}

                        {album.tracks.length === 0 && (
                            <p className="empty-track-notice">No uncompressed assets discovered within this subdirectory container partition yet.</p>
                        )}
                    </div>
                </div>

            </div>

        </div>
    );
}
