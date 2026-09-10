import React, { useState } from 'react';
import { DynamicButton } from './DynamicButton';
import './PortfolioGrid.css';
import { GameShowcase } from './GameShowcase';
import { AudioAlbumView } from './AudioAlbumView';

// ── 🚀 AUTOMATED VITE INVENTORY CRAWLER ──
const assetModules = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,gif,mp3,wav,mp4,mov,pdf}', { eager: true });

const RAW_FILES = Object.keys(assetModules).map(filePath => {
    const pathParts = filePath.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const parentFolder = pathParts[pathParts.length - 2];
    const assetsIndex = pathParts.indexOf('assets');
    const rootCategory = assetsIndex !== -1 ? pathParts[assetsIndex + 1] : '';

    return { fileName, parentFolder, rootCategory, url: assetModules[filePath].default || assetModules[filePath] };
});

const STANDALONE_ASSETS = [];
const ALBUMS_MAP = {};

RAW_FILES.forEach(file => {
    const { rootCategory, parentFolder, fileName, url } = file;
    const ext = fileName.split('.').pop().toLowerCase();
    const isImage = ['png', 'jpg', 'jpeg', 'gif'].includes(ext);
    const isAudio = ['mp3', 'wav'].includes(ext);

    // Group files into nested music/sfx album directories
    if ((rootCategory === 'music' || rootCategory === 'sfx') && parentFolder !== rootCategory) {
        const albumKey = `${rootCategory}-${parentFolder}`;

        if (!ALBUMS_MAP[albumKey]) {
            ALBUMS_MAP[albumKey] = {
                id: albumKey,
                category: rootCategory,
                albumFolderName: parentFolder,
                title: parentFolder.replace(/[_-]/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
                cover: null,
                tracks: []
            };
        }

        // ── 🎯 FIXED: AUTOMATED ALBUM ART ASSIGNMENT ──
        // 1. Give absolute priority to explicit files named 'cover'
        if (fileName.toLowerCase().startsWith('cover.') && isImage) {
            ALBUMS_MAP[albumKey].cover = url;
        }
        // 2. Fallback: If no explicit cover is logged yet, capture the very first picture file found in this folder partition!
        else if (!ALBUMS_MAP[albumKey].cover && isImage) {
            ALBUMS_MAP[albumKey].cover = url;
        }
        // Handle standard audio tracks appending rules
        else if (isAudio) {
            const trackTitle = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
            ALBUMS_MAP[albumKey].tracks.push({ title: trackTitle, fileName, url });
        }
    } else {
        // Standard asset parsing block (Games, Art, Animation, Writing)
        const title = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        STANDALONE_ASSETS.push({ id: fileName, title, category: rootCategory, fileName, url });
    }
});

const COMPLETE_ALBUMS_LIST = Object.values(ALBUMS_MAP);

export function PortfolioGrid({ onTriggerLightbox }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedGame, setSelectedGame] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    if (selectedGame) return <GameShowcase game={selectedGame} onBack={() => setSelectedGame(null)} />;
    if (selectedAlbum) return <AudioAlbumView album={selectedAlbum} onBack={() => setSelectedAlbum(null)} />;

    const categories = ['all', 'games', 'art', 'animation', 'sfx', 'music', 'writing'];
    const displayAlbums = activeCategory === 'all' ? COMPLETE_ALBUMS_LIST : COMPLETE_ALBUMS_LIST.filter(a => a.category === activeCategory);
    const displayStandalone = activeCategory === 'all' ? STANDALONE_ASSETS : STANDALONE_ASSETS.filter(s => s.category === activeCategory);

    const renderInlineMedia = (item) => {
        const ext = item.fileName.split('.').pop().toLowerCase();
        if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) return <img src={item.url} alt={item.title} className="inline-media-img" loading="lazy" />;
        if (['mp4', 'mov'].includes(ext)) return <video muted loop playsInline autoPlay className="inline-media-video" src={item.url} />;
        return <span className="inline-file-icon">📄 Document</span>;
    };

    return (
        <div className="portfolio-grid-wrapper">
            <div className="portfolio-filter-tray">
                {categories.map((cat) => (
                    <DynamicButton
                        key={cat}
                        variant={activeCategory === cat ? 'primary' : 'secondary'}
                        showBlobs={false}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat.toUpperCase()}
                    </DynamicButton>
                ))}
            </div>

            <div className="portfolio-cards-container custom-scrollbar">
                {displayAlbums.map((album) => (
                    <div key={album.id} className="vinyl-album-capsule" onClick={() => setSelectedAlbum(album)}>
                        <div className="vinyl-sleeve-viewport">
                            {/* 🎯 FIXED: Consumes our automated custom cover image url seamlessly */}
                            <img src={album.cover || '/favicon.ico'} className="album-sleeve-art" alt="" />
                            <div className="vinyl-record-disc"><div className="vinyl-center-label"></div></div>
                        </div>
                        <div className="album-capsule-meta">
                            <div className="card-header-tag">{album.category} // Album</div>
                            <h4 className="card-item-title">{album.title}</h4>
                            <p className="track-counter-label">{album.tracks.length} Audios Tracked</p>
                        </div>
                    </div>
                ))}

                {displayStandalone.map((item) => (
                    <div
                        key={item.id}
                        className="portfolio-media-card"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            if (item.category === 'games') {
                                setSelectedGame(item);
                            } else {
                                onTriggerLightbox(item);
                            }
                        }}
                    >
                        <div className="card-inner-content">
                            <div className="card-header-tag">{item.category}</div>
                            <h4 className="card-item-title">{item.title}</h4>
                            <div className="media-preview-viewport">{renderInlineMedia(item)}</div>
                        </div>
                        <div className="card-asset-path"><code>{item.fileName}</code></div>
                    </div>
                ))}

                {displayAlbums.length === 0 && displayStandalone.length === 0 && (
                    <p className="empty-notice">No asset files discovered in this category partition.</p>
                )}
            </div>
        </div>
    );
}
